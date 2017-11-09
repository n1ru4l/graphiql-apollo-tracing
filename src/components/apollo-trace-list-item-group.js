import React from 'react'
import styled from 'styled-components'
import { ExpandButton } from './expand-button'

const ListItemGroupView = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 5px;
`

const IndexIndicator = styled.div`
  width: 10px;
  color: #2882f9;
  padding-left: 5px;
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
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() =>
            this.setState(state => ({ isExpanded: !state.isExpanded }))
          }
        />
        <IndexIndicator>{index}</IndexIndicator>
        {isExpanded && <FieldWrapper>{children}</FieldWrapper>}
      </ListItemGroupView>
    )
  }
}
