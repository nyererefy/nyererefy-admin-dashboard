import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import { List } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'
import { CategoryItem } from './categoryItem'
import { AddCategory } from './addCategory'
import { CATEGORIES_QUERY } from '../../utils/quaries'


export function CategoriesList({ electionId }) {
  return <Query query={CATEGORIES_QUERY} variables={{ electionId: parseInt(electionId) }}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { categories } = data

      return (
        <div>
          <h2>Categories</h2>
          <AddCategory electionId={electionId}/>
          {categories &&
          <List divided verticalAlign='middle' size="huge">
            {
              categories.map(c => <CategoryItem category={c}/>)
            }
          </List>
          }
        </div>
      )
    }}
  </Query>
}
