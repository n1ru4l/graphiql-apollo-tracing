import React from 'react'
import styled from 'styled-components'

const ListItemGroupView = styled.div`
  padding-left: 10px;
  display: flex;
  margin-bottom: 5px;
`

const IndexIndicator = styled.div`
  width: 10px;
  color: #2882f9;
`

const FieldWrapper = styled.div`
  width: calc(100% - 10px);
`

export class ApolloTraceListItemGroup extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isExpanded: true,
    }
  }
  render() {
    const { index, children } = this.props
    const { isExpanded } = this.state

    return (
      <ListItemGroupView>
        <IndexIndicator>{index}</IndexIndicator>
        <FieldWrapper>{children}</FieldWrapper>
      </ListItemGroupView>
    )
  }
}
