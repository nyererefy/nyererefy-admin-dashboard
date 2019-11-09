import React from 'react'
import { List } from 'semantic-ui-react'

export function ProgramItem({ program }) {
  const { id, title } = program

  return (
    <List.Item key={id}>
      <List.Icon name='caret right' />
      <List.Content>
        <List.Header>{title}</List.Header>
      </List.Content>
    </List.Item>
  )
}
