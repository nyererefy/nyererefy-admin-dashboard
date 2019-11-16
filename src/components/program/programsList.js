import React from 'react'
import { ProgramItem } from './programItem'
import { List, Message } from 'semantic-ui-react'

export const ProgramsList = ({ school }) => {
  const { schoolPrograms } = school
  if (!schoolPrograms) return <Message size='tiny' error>None registered, You need to register at least one
    program!</Message>
  return (
    <div>
      <List divided verticalAlign='middle'>
        {schoolPrograms.map((p) => (
          <ProgramItem program={p.program} schoolProgramId={p.id}/>
        ))}
      </List>
    </div>
  )
}
