import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { EditProgram } from './editProgram'
import { DeleteProgram } from './deleteProgram'

export function ProgramItem({ program, schoolProgramId, identifier }) {
  const { id, title } = program

  return (
    <List.Item key={id}>
      <List.Content floated='right'>
        <Button.Group compact>
          <EditProgram school="4"/>
          <DeleteProgram schoolProgramId={schoolProgramId}/>
        </Button.Group>
      </List.Content>
      <List.Icon name='caret right'/>
      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>Identifier: <b>{identifier}</b></List.Description>
      </List.Content>
    </List.Item>
  )
}
