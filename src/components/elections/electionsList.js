import React from 'react'
import { ElectionItem } from './electionItem'
import { List } from 'semantic-ui-react'

export const ElectionsList = () => (
  <div>
    <List divided verticalAlign='middle' size="huge">
      <ElectionItem/>
      <ElectionItem/>
      <ElectionItem/>
      <ElectionItem/>
      <ElectionItem/>
      <ElectionItem/>
    </List>
  </div>
)
