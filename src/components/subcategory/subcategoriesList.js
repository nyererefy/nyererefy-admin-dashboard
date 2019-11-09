import React from 'react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import { List } from 'semantic-ui-react'
import ErrorMessage from '../../layout/errorMessage'
import { SubcategoryItem } from './subcategoryItem'
import { GenerateSubcategories } from './generateSubcategories'
import { SUBCATEGORIES_QUERY } from '../../utils/quaries'

export function SubcategoriesList({ electionId }) {
  return (
    <Query query={SUBCATEGORIES_QUERY} variables={{ electionId: parseInt(electionId) }}>
      {({ loading, data, error }) => {
        if (loading) return <ProgressBar />
        if (error) return <ErrorMessage message={error.message} />

        return (
          <div>
            {/*todo add category form here*/}
            <h2>Subcategories</h2>
            <GenerateSubcategories electionId={electionId} />
            <List size='huge' celled>
              {data.subcategories.map((c) => (
                <SubcategoryItem subcategory={c} />
              ))}
            </List>
          </div>
        )
      }}
    </Query>
  )
}
