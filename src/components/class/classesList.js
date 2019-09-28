import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import { Header, List } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'
import { ClassItem } from './classItem'
import { GenerateClasses } from './generateClasses'
import { CLASSES_QUERY } from '../../utils/quaries'


export function ClassesList() {
  return <Query query={CLASSES_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { classes } = data

      return (
        <div>
          <Header as="h2">Classes</Header>

          <GenerateClasses electionId={1}/>
          {classes &&
          <List celled>
            {
              classes.map(c => <ClassItem klass={c}/>)
            }
          </List>
          }
        </div>
      )
    }}
  </Query>
}
