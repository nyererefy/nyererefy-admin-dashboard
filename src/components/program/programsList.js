import React from 'react'
import { ProgramItem } from './programItem'
import { List } from 'semantic-ui-react'


export const ProgramsList = ({ programs }) => (
  <div>
    <List divided verticalAlign='middle'>
      {programs.map(p => <ProgramItem program={p.program}/>)}
    </List>
  </div>
)


