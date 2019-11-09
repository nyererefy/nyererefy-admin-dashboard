import React from 'react'
import { SchoolItem } from './schoolItem'
import { Header, List } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'
import { SCHOOLS_QUERY } from '../../utils/quaries'
import { AddSchool } from './addSchool'

export const SchoolsList = () => (
  <Query query={SCHOOLS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar />
      if (error) return <ErrorMessage message={error.message} />

      const { schools } = data

      return (
        <div>
          <Header as='h2'>Schools/Faculties</Header>

          <AddSchool />

          {schools && (
            <List divided verticalAlign='middle'>
              {schools.map((e) => (
                <SchoolItem school={e} />
              ))}
            </List>
          )}
        </div>
      )
    }}
  </Query>
)
