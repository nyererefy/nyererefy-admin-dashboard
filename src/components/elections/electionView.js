import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import { Grid, Header } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'
import { CategoriesList } from '../category/categoriesList'
import { SubcategoriesList } from '../subcategory/subcategoriesList'
import { ELECTION_QUERY } from '../../utils/quaries'
import { formatTime } from '../../utils/time'

export function ElectionView({ match }) {
  const electionId = parseInt(match.params.id)

  return (
    <Query query={ELECTION_QUERY} variables={{ id: electionId }}>
      {({ loading, data, error }) => {
        if (loading) return <ProgressBar />
        if (error) return <ErrorMessage message={error.message} />

        const { title, isOpen, isStrict, startAt, endAt } = data.election

        return (
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Header as='h1'>
                  {title}
                  <Header.Subheader>StartAt: {formatTime(startAt)}</Header.Subheader>
                  <Header.Subheader>EndAt: {formatTime(endAt)}</Header.Subheader>
                  <Header.Subheader>isOpen: {isOpen.toString()}</Header.Subheader>
                  <Header.Subheader>isStrict: {isStrict.toString()}</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <CategoriesList electionId={electionId} />
              </Grid.Column>

              <Grid.Column>
                <SubcategoriesList electionId={electionId} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }}
    </Query>
  )
}
