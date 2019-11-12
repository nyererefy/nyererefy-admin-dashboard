import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import { Grid, Header } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'
import { CURRENT_MANAGER_QUERY } from '../../utils/quaries'
import { RegisterUniversity } from './registerUniversity'


export function UniversityView() {
  return (
    <Query query={CURRENT_MANAGER_QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <ProgressBar/>
        if (error) return <ErrorMessage message={error.message}/>

        const { university } = data.currentManager

        if (!university) {
          return <RegisterUniversity/>
        }

        const { title, abbreviation } = university

        return (
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Header as='h1'>
                  {title}
                  <Header.Subheader>StartAt: {abbreviation}</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }}
    </Query>
  )
}
