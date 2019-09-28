import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { ProgramsList } from '../program/programsList'

export function SchoolItem({ school }) {
  const { id, title, schoolPrograms } = school

  return (
    <List.Item key={id}>
      <List.Content floated='right'>
        <Button size="tiny" icon='plus square outline'/>
      </List.Content>

      <List.Content>
        <List.Header>
          {title}
        </List.Header>
        <List.Description>Registered Programs:</List.Description>
        <ProgramsList programs={schoolPrograms}/>
      </List.Content>
    </List.Item>
  )
}
