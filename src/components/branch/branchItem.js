import React from 'react'
import { List } from 'semantic-ui-react'

export function BranchItem({ election }) {
  return (
    <List.Item key={election.id}>
      <List.Content>
        <List.Header>{election.title}</List.Header>
      </List.Content>
    </List.Item>
  )
}
