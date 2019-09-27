import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function SubcategoryItem({ subcategory }) {
  //todo key is not working here.
  return (
    <List.Item key={subcategory.id}>
      <List.Content>
        <List.Header as={Link} to={`/subcategory/${subcategory.id}`}>
          {subcategory.title}
        </List.Header>
        <List.Description>
          Eligible: {subcategory.suffix} students
        </List.Description>
      </List.Content>
    </List.Item>
  )
}
