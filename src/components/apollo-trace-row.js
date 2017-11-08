import React from 'react'
import styled from 'styled-components'

import { ApolloTraceTypeLink } from './apollo-trace-type-link'
import { DurationIndicator } from './duration-indicator'
import { getChildResolvers, groupChildren } from '../lib'

const ExpandButton = styled.button`
  border: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
`

export class ApolloTraceRow extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isExpanded: true,
    }
  }
  render() {
    const {
      fieldName,
      returnType,
      duration,
      path,
      resolvers,
      onClickType,
    } = this.props

    const { isExpanded } = this.state
    const isArray = returnType.charAt(0) === `[`
    const childResolvers = getChildResolvers(resolvers, path)

    return (
      <div
        style={{
          paddingLeft: 10,
          fontFamily: `'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          fontSize: 12,
        }}
      >
        {childResolvers.length ? (
          <ExpandButton
            onClick={() =>
              this.setState(state => ({
                ...state,
                isExpanded: !state.isExpanded,
              }))
            }
          >
            {isExpanded ? `▾` : `▸`}
          </ExpandButton>
        ) : null}
        {fieldName} :{' '}
        <ApolloTraceTypeLink onClick={onClickType} typeName={returnType} />
        <span style={{ float: `right`, paddingRight: 20 }}>
          <DurationIndicator duration={duration} />
        </span>
        {isExpanded && (
          <div>
            {isArray
              ? groupChildren(childResolvers).map((childResolvers, i) => (
                  <div
                    key={childResolvers[0].path
                      .slice(0, childResolvers[0].path.length - 1)
                      .join(`_`)}
                    style={{
                      paddingLeft: 10,
                      display: `flex`,
                      marginBottom: 5,
                    }}
                  >
                    <div style={{ width: 10, color: `#2882F9` }}>{i}</div>
                    <div
                      style={{
                        display: `inline-block`,
                        width: `calc(100% - 10px)`,
                      }}
                    >
                      {childResolvers.map(resolver => (
                        <ApolloTraceRow
                          {...resolver}
                          resolvers={resolvers}
                          key={resolver.path.join(`_`)}
                          onClickType={onClickType}
                        />
                      ))}
                    </div>
                  </div>
                ))
              : childResolvers.map(resolver => (
                  <ApolloTraceRow
                    {...resolver}
                    resolvers={resolvers}
                    key={resolver.path.join(`_`)}
                    onClickType={onClickType}
                  />
                ))}
          </div>
        )}
      </div>
    )
  }
}
