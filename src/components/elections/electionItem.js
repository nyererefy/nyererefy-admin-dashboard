import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function ElectionItem() {
  return (
    <List.Item>
      <List.Content>
        <List.Header as={Link} to="/election/111111111">Daniel Louise</List.Header>
      </List.Content>
    </List.Item>
  )
}
