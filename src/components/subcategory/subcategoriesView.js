import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'
import { SUBCATEGORY_QUERY } from '../../utils/quaries'
import { Divider, Grid, List } from 'semantic-ui-react'
import { CandidateItem } from '../candidate/candidateItem'
import { AddCandidate } from '../candidate/addCandidate'


export function SubcategoriesView({ match }) {
  const subcategoryId = parseInt(match.params.id)

  return <Query query={SUBCATEGORY_QUERY} variables={{ subcategoryId }}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { subcategory } = data

      return (
        <div>
          <h2>Subcategory: {subcategory.title}</h2>

          <Divider/>

          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <h3>Candidates</h3>
                <List size="massive" celled>
                  {
                    subcategory.candidates.map(c => <CandidateItem candidate={c}/>)
                  }
                </List>
              </Grid.Column>

              <Grid.Column>
                <h3>Add Candidate</h3>
                <AddCandidate subcategoryId={subcategoryId}/>
              </Grid.Column>

            </Grid.Row>
          </Grid>

        </div>
      )
    }}
  </Query>
}
