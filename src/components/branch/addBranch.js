import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Form } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_ELECTION } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { ELECTIONS_QUERY } from '../../utils/quaries'


export function AddBranch() {
  const [title, setTitle] = useState('')

  return <Mutation mutation={ADD_ELECTION}
                   refetchQueries={[{ query: ELECTIONS_QUERY }]}>
    {(mutate, { loading, data, error }) => {
      if (error) return <ErrorMessage message={error.message}/>
      if (data) setTitle('')

      return (
        <div>
          <Form
            loading={loading}
            onSubmit={(e) => {
              e.preventDefault()

              mutate({
                variables: {
                  input: {
                    title,
                  },
                },
              })
            }}>
            <Form.Group>
              <Form.Input
                name="title"
                value={title}
                placeholder='Enter Branch title'
                onChange={e => setTitle(e.target.value)}
              />

              <Form.Button content='Add'/>
            </Form.Group>
          </Form>
        </div>
      )
    }}
  </Mutation>
}

