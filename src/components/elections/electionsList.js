import React from 'react'
import { ElectionItem } from './electionItem'
import { List } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const ELECTIONS_QUERY = gql`
  {
    elections {
      id
      title
      isOpen
      isStrict
    }
  }
`

export const ElectionsList = () => (
  <Query query={ELECTIONS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <div>loading....</div>
      if (error) return <div>{error.message}</div>

      return <List divided verticalAlign='middle' size="huge">
        {
          data.elections.map(e => <ElectionItem election={e}/>)
        }
      </List>
    }}
  </Query>
)
