import React from 'react'
import { ProgramItem } from './programItem'
import { List, Message } from 'semantic-ui-react'

export const ProgramsList = ({ programs }) => {
  if (!programs) return <Message size='tiny' error>None registered, You need to register at least one program!</Message>
  return (
    <div>
      <List divided verticalAlign='middle'>
        {programs.map((p) => (
          <ProgramItem program={p.program}/>
        ))}
      </List>
    </div>
  )
}
