import React from 'react'
import { ElectionItem } from './electionItem'
import { List } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'

const ELECTIONS_QUERY = gql`
  {
    elections {
      id
      title
    }
  }
`

export const ElectionsList = () => (
  <Query query={ELECTIONS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      return <List divided verticalAlign='middle' size="huge">
        {
          data.elections.map(e => <ElectionItem election={e}/>)
        }
      </List>
    }}
  </Query>
)
