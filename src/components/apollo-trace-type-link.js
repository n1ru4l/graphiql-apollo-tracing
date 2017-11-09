import React from 'react'
import styled from 'styled-components'

import { parseType } from '../lib'

const TypeName = styled.a`
  color: #ca9800;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export class ApolloTraceTypeLink extends React.Component {
  render() {
    const { typeName, onClick } = this.props
    const { pre, type, after } = parseType(typeName)

    return (
      <span>
        {pre}
        <TypeName onClick={() => onClick(type)}>{type}</TypeName>
        {after}
      </span>
    )
  }
}
