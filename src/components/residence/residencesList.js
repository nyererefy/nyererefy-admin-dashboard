import React from 'react'
import { ResidenceItem } from './residenceItem'
import { Header, List } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'
import { RESIDENCES_QUERY } from '../../utils/quaries'
import { AddResidence } from './addResidence'

export const ResidencesList = () => (
  <Query query={RESIDENCES_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { residences } = data
      return (
        <div>
          <Header as='h2'>Residences</Header>

          <AddResidence/>

          {residences && (
            <List divided verticalAlign='middle'>
              {residences.map((b) => (
                <ResidenceItem election={b}/>
              ))}
            </List>
          )}
        </div>
      )
    }}
  </Query>
)
