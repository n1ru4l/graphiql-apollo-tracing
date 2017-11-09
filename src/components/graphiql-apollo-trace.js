import React from 'react'
import styled from 'styled-components'

import { DurationIndicator } from './duration-indicator'
import { ApolloTraceView } from './apollo-trace-view'

const Title = styled.div`
  background: #eeeeee;
  border-bottom: 1px solid #d6d6d6;
  border-top: 1px solid #e0e0e0;
  color: #777;
  font-variant: small-caps;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 14px;
  padding: 6px 0 8px 10px;
  text-transform: lowercase;
  cursor: pointer;
`

const TitleDuration = styled.span`
  float: right;
  padding-right: 20px;
  font-size: 12px;
`

const ApolloTraceContainer = styled.div`
  height: ${p => (p.isExpanded ? `calc((100vh * .5) - 48px)` : `0px`)};
  overflow: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`

export class GraphiQLApolloTrace extends React.Component {
  constructor(...args) {
    super(...args)
    const { tracingLink } = this.props
    this.state = {
      tracing: null,
      isExpanded: localStorage.getItem(`graphiql:showTrace`) === `true`,
    }
    tracingLink.subscribe(tracing => {
      this.setState(state => ({ ...state, tracing }))
    })
  }
  render() {
    const { tracing, isExpanded } = this.state

    if (!tracing) return null
    const { resolvers } = tracing.execution

    return (
      <div>
        <Title
          onClick={() => {
            localStorage.setItem(
              `graphiql:showTrace`,
              `${!this.state.isExpanded}`,
            )
            this.setState(state => ({
              ...state,
              isExpanded: !state.isExpanded,
            }))
          }}
        >
          Apollo Tracing
          <TitleDuration>
            Request Duration: <DurationIndicator duration={tracing.duration} />
          </TitleDuration>
        </Title>
        {isExpanded ? (
          <ApolloTraceContainer isExpanded={isExpanded}>
            <ApolloTraceView
              resolvers={resolvers}
              duration={tracing.duration}
              width={document.body.clientWidth / 3}
            />
          </ApolloTraceContainer>
        ) : null}
      </div>
    )
  }
}
