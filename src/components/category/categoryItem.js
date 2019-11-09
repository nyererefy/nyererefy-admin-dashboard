import React from 'react'
import { List } from 'semantic-ui-react'

export function CategoryItem({ category }) {
  //todo key is not working here.
  return (
    <List.Item key={category.id}>
      <List.Content>
        <List.Header>{category.title}</List.Header>
      </List.Content>
    </List.Item>
  )
}
