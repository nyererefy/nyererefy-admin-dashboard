import React from 'react'
import { Image, List } from 'semantic-ui-react'

export function CandidateItem({ candidate }) {
  return (
    <List.Item key={candidate.id}>
      <Image avatar
             src={candidate.avatar || 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'}/>
      <List.Content>
        <List.Header>{candidate.user.regNo}</List.Header>
        {candidate.user.name || candidate.user.regNo}
      </List.Content>
    </List.Item>
  )
}
