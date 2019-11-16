import React from 'react'
import { List } from 'semantic-ui-react'
import { ProgramsList } from '../program/programsList'
import { RegisterProgram } from '../program/registerProgram'

export function SchoolItem({ school }) {
  const { id, title } = school

  return (
    <List.Item key={id}>
      <List.Content floated='right'>
        <RegisterProgram school={school}/>
      </List.Content>

      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>Registered Programs:</List.Description>
        <ProgramsList school={school}/>
      </List.Content>
    </List.Item>
  )
}
