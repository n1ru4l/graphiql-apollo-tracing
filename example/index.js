/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'

import { execute, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

import GraphiQL from 'graphiql'
import { GraphiQLApolloTrace, createTracingLink } from '../src'
import gql from 'graphql-tag'

const tracingLink = createTracingLink()

const link = from([
  tracingLink,
  new HttpLink({
    uri: '/graphql',
  }),
])

class ApolloTracingGraphiQL extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      fetcher: this.props.fetcher,
    }
  }

  navigateToType(type) {
    if (!this.graphiql || !this.graphiql.docExplorerComponent) return

    this.graphiql.docExplorerComponent.showDoc(
      this.graphiql.state.schema._typeMap[type],
    )
  }

  render() {
    return (
      <GraphiQL
        ref={c => {
          this.graphiql = c
        }}
        {...this.state}
      >
        <GraphiQL.Logo />
        <GraphiQL.Toolbar />
        <GraphiQL.Footer>
          <GraphiQLApolloTrace
            tracingLink={tracingLink}
            onClickType={type => this.navigateToType(type)}
          />
        </GraphiQL.Footer>
      </GraphiQL>
    )
  }
}

ReactDOM.render(
  <ApolloTracingGraphiQL
    fetcher={operation =>
      execute(link, { ...operation, query: gql`${operation.query}` })
    }
  />,
  document.querySelector(`main`),
)
