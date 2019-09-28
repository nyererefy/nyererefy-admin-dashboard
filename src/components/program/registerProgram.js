import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_ELECTION } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { ELECTIONS_QUERY } from '../../utils/quaries'


export function RegisterProgram() {
  const [title, setTitle] = useState('')

  return <Mutation mutation={ADD_ELECTION}
                   refetchQueries={[{ query: ELECTIONS_QUERY }]}>
    {(mutate, { loading, data, error }) => {
      if (error) return <ErrorMessage message={error.message}/>
      if (data) setTitle('')

      return (
        <Button fluid
                loading={loading}
                onClick={() => {
                  mutate({ variables: { electionId: 1 } })
                }}>
          Register
        </Button>
      )
    }}
  </Mutation>
}

