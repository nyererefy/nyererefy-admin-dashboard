import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function ElectionItem({ election }) {
  //todo key is not working here.
  return (
    <List.Item key={election.id}>
      <List.Content>
        <List.Header as={Link} to={`/election/${election.id}`}>
          {election.title}
        </List.Header>
      </List.Content>
    </List.Item>
  )
}
