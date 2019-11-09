import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { GENERATE_SUBCATEGORIES } from '../../utils/mutations'
import { SUBCATEGORIES_QUERY } from '../../utils/quaries'
import ErrorMessage from '../../layout/errorMessage'

export function GenerateSubcategories({ electionId }) {
  return (
    <Mutation
      mutation={GENERATE_SUBCATEGORIES}
      refetchQueries={[{ query: SUBCATEGORIES_QUERY, variables: { electionId } }]}
    >
      {(mutate, { loading, data, error }) => {
        if (error) return <ErrorMessage message={error.message} />
        return (
          <Button
            fluid
            loading={loading}
            onClick={() => {
              mutate({ variables: { electionId } })
            }}
          >
            Generate
          </Button>
        )
      }}
    </Mutation>
  )
}
