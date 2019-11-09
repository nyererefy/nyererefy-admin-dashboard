import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { GENERATE_CLASSES } from '../../utils/mutations'
import { CLASSES_QUERY } from '../../utils/quaries'
import ErrorMessage from '../../layout/errorMessage'

export function GenerateClasses() {
  return (
    <Mutation mutation={GENERATE_CLASSES} refetchQueries={[{ query: CLASSES_QUERY }]}>
      {(mutate, { loading, data, error }) => {
        if (error) return <ErrorMessage message={error.message} />
        return (
          <Button
            fluid
            loading={loading}
            onClick={() => {
              mutate()
            }}
          >
            Generate
          </Button>
        )
      }}
    </Mutation>
  )
}
