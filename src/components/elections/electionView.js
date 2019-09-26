import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ProgressBar } from '../../layout/progressBar'
import { Header } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'

const ELECTION_QUERY = gql`
query($id: Int!) {
  election(id: $id) {
    title
    isOpen
    isStrict
    startAt
    endAt
  }
}
`

export function ElectionView({ match }) {
  return <Query query={ELECTION_QUERY} variables={{ id: parseInt(match.params.id) }}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { title, isOpen, isStrict, startAt, endAt } = data.election

      return (
        <Header as='h1'>
          {title}
          <Header.Subheader>StartAt: {startAt}</Header.Subheader>
          <Header.Subheader>EndAt: {endAt}</Header.Subheader>
          <Header.Subheader>isOpen: {isOpen.toString()}</Header.Subheader>
          <Header.Subheader>isStrict: {isStrict.toString()}</Header.Subheader>
        </Header>
      )
    }}
  </Query>
}
