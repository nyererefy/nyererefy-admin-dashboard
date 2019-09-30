import React from 'react'
import { List } from 'semantic-ui-react'

export function ClassItem({ klass }) {
  return (
    <List.Item key={klass.id}>
      <List.Content>
        <List.Header>
          {klass.title}
        </List.Header>
      </List.Content>
    </List.Item>
  )
}
