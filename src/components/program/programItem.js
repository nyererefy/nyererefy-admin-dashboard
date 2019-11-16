import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { EditProgram } from './editProgram'
import { DeleteProgram } from './deleteProgram'

export function ProgramItem({ program, schoolProgramId }) {
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
      </List.Content>
    </List.Item>
  )
}
