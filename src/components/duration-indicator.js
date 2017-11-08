import React from 'react'

export class DurationIndicator extends React.Component {
  render() {
    const { duration: durationNano } = this.props
    const durationMicro = durationNano / 1000
    if (durationMicro < 1) {
      return (
        <span style={{ color: `green` }}>{durationNano.toFixed(2)} ns</span>
      )
    }
    const durationMilli = durationMicro / 1000
    if (durationMilli < 1) {
      return (
        <span style={{ color: `green` }}>{durationMicro.toFixed(2)} µs</span>
      )
    }
    const durationSecond = durationMilli / 1000
    if (durationSecond < 1) {
      return (
        <span style={{ color: durationMilli < 250 ? `green` : `orange` }}>
          {durationMilli.toFixed(2)} ms
        </span>
      )
    }
    return <span style={{ color: `red` }}>{durationSecond.toFixed(2)} s</span>
  }
}
