import React from 'react'
import { ElectionItem } from './electionItem'
import { Grid, Header, List } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'
import { ELECTIONS_QUERY } from '../../utils/quaries'
import { AddElection } from './addElection'

export const ElectionsList = () => (
  <Query query={ELECTIONS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar />
      if (error) return <ErrorMessage message={error.message} />

      const { elections } = data

      return (
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2'>Elections</Header>
              {elections ? (
                <List divided verticalAlign='middle' size='huge'>
                  {elections.map((e) => (
                    <ElectionItem election={e} />
                  ))}
                </List>
              ) : (
                <div>
                  <h2>No elections found</h2>
                </div>
              )}
            </Grid.Column>

            <Grid.Column>
              <AddElection />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }}
  </Query>
)
