import React from 'react'
import { parseType } from '../lib'

export class ApolloTraceTypeLink extends React.Component {
  render() {
    const { typeName, onClick } = this.props
    const { pre, type, after } = parseType(typeName)

    return (
      <span>
        {pre}
        <a className="type-name" onClick={() => onClick(type)}>
          {type}
        </a>
        {after}
      </span>
    )
  }
}
