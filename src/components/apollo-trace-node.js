import React from 'react'
import styled from 'styled-components'

const Container = styled.div.attrs({
  style: props => ({
    marginLeft: props.offsetLeft + 5,
  }),
})`
  position: relative;
  margin-top: 5px;
  height: 24px;
`

const Label = styled.div`
  position: absolute;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 3px;
  padding-bottom: 3px;
  color: grey;
  background-color: lightgrey;
  border-radius: 5px;
  transform: translateX(calc(-100% - 4px));
`

const DurationTrace = styled.div.attrs({
  style: props => ({
    width: props.traceWidth,
  }),
})`
  display: inline-block;
  top: 36%;
  min-width: 2px;
  height: 2px;
  background-color: red;
  opacity: 0.3;
`

const DurationLabel = styled.div`
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  transform: translateY(2px);
`

export class ApolloTraceNode extends React.Component {
  render() {
    const { label, offsetLeft, width, duration } = this.props

    return (
      <Container offsetLeft={offsetLeft}>
        <Label>{label}</Label>
        <DurationTrace traceWidth={width} />
        <DurationLabel>{duration}</DurationLabel>
      </Container>
    )
  }
}
