import React from 'react'
import styled from 'styled-components'

import { ApolloTraceTypeLink } from './apollo-trace-type-link'
import { ApolloTraceListItemGroup } from './apollo-trace-list-item-group'
import { DurationIndicator } from './duration-indicator'
import { getChildResolvers, groupChildren } from '../lib'
import { ExpandButton } from './expand-button'

const Row = styled.div`
  position: relative;
  padding-left: 10px;
  font-family: 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace;
  font-size: 12px;
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
      <Row>
        {childResolvers.length ? (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={() =>
              this.setState(state => ({
                isExpanded: !state.isExpanded,
              }))
            }
          />
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
                  <ApolloTraceListItemGroup
                    key={childResolvers[0].path
                      .slice(0, childResolvers[0].path.length - 1)
                      .join(`_`)}
                    resolvers={resolvers}
                    childResolvers={childResolvers}
                    index={i}
                    onClickType={onClickType}
                  >
                    {childResolvers.map(resolver => (
                      <ApolloTraceRow
                        {...resolver}
                        resolvers={resolvers}
                        key={resolver.path.join(`_`)}
                        onClickType={onClickType}
                      />
                    ))}
                  </ApolloTraceListItemGroup>
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
      </Row>
    )
  }
}
