import React from 'react'
import styled from 'styled-components'

const ExpandButtonView = styled.button`
  position: absolute;
  left: -15px;
  border: 0;
  height: 16px;
  line-height: 10px;
  width: 20px;
  background-color: transparent;
`

export class ExpandButton extends React.Component {
  render() {
    const { isExpanded, onClick } = this.props
    return (
      <ExpandButtonView onClick={onClick}>
        {isExpanded ? `▾` : `▸`}
      </ExpandButtonView>
    )
  }
}
