/* eslint-env node */
import webpackMiddleware from 'webpack-dev-middleware'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import gql from 'graphql-tag'
import { makeExecutableSchema } from 'graphql-tools'
import webpackConfig from '../webpack.config'
import webpack from 'webpack'
import morgan from 'morgan'
import path from 'path'
import times from 'lodash.times'
import faker from 'faker'

faker.seed(123)

const graphiQlIndexPath = path.join(__dirname, `index.html`)

const mockAuthors = times(50, () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}))

const mockPosts = times(100, () => ({
  id: faker.random.uuid(),
  title: faker.lorem.words(),
  votes: faker.random.number({ min: 0, max: 10 }),
  authorId:
    mockAuthors[faker.random.number({ min: 0, max: mockAuthors.length - 1 })]
      .id,
}))

const typeDefs = gql`
  type Author {
    id: ID! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts(first: Int): [Post] # the list of Posts by this author
  }

  type Post {
    id: ID!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts(first: Int): [Post]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: ID!): Post
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation
  }
`

const sleep = (t = 1) => new Promise(resolve => setTimeout(resolve, t))

const resolvers = {
  Query: {
    posts: async (_, { first = 100 }) => {
      await sleep(first)
      return mockPosts.slice(0, Math.min(first, mockPosts.length - 1))
    },
  },
  Post: {
    author: async post => {
      await sleep(1000)
      return mockAuthors.find(author => author.id === post.authorId)
    },
  },
  Author: {
    posts: async (author, { first = 2 }) => {
      await sleep(3000)
      return mockPosts
        .filter(post => post.authorId === author.id)
        .slice(0, first)
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const PORT = 3000

const app = express()

app.use(morgan(`tiny`))
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, tracing: true }),
)

app.use(
  webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/graphiql',
    stats: {
      colors: true,
    },
  }),
)

app.get(`/graphiql`, (request, response) => {
  response.sendFile(graphiQlIndexPath)
})

app.listen(PORT)
