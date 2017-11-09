import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import flattenDeep from 'lodash.flattendeep'
import { formatNano, getChildResolvers } from '../lib'
import { ApolloTraceNode } from './apollo-trace-node'

export const createGetChildResolvers = resolvers => resolver => {
  const { path, returnType } = resolver
  const isList = returnType.charAt(0) === `[`
  return getChildResolvers(resolvers, path, isList)
}

export class ApolloTraceView extends Component {
  render() {
    const { width, resolvers, duration } = this.props

    const xScale = scaleLinear()
      .domain([0, duration])
      .range([0, width - 50])

    const rootResolver = resolvers[0]
    if (!rootResolver) return null

    const getChildResolvers = createGetChildResolvers(resolvers)

    const buildTree = resolver => {
      const resolvers = getChildResolvers(resolver)
      return [resolver, resolvers.map(buildTree)]
    }

    const tree = flattenDeep(buildTree(rootResolver))

    return (
      <div
        ref={node => (this.node = node)}
        style={{ minWidth: width, marginBottom: 30 }}
      >
        {tree.map(resolver => (
          <ApolloTraceNode
            key={resolver.path.join(`_`)}
            label={resolver.path.join(`.`)}
            offsetLeft={100 + xScale(resolver.startOffset)}
            width={xScale(resolver.duration)}
            duration={formatNano(resolver.duration)}
          />
        ))}
      </div>
    )
  }
}
