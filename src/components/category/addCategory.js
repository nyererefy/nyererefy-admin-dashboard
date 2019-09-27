import React, { useState } from 'react'
import { Form, Select } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_CATEGORY } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { CATEGORIES_QUERY } from '../../utils/quaries'

const options = [
  { key: 'a', text: 'All', value: 'ALL' },
  { key: 'b', text: 'Branch', value: 'BRANCH' },
  { key: 's', text: 'School/Faculty', value: 'SCHOOL' },
  { key: 'p', text: 'Program', value: 'PROGRAM' },
  { key: 'c', text: 'Class', value: 'CLASS' },
  { key: 'r', text: 'Residence', value: 'RESIDENCE' },
]

export function AddCategory({ electionId }) {
  const [title, setTitle] = useState('')
  const [eligible, setEligible] = useState('')

  return <Mutation mutation={ADD_CATEGORY}
                   refetchQueries={[{ query: CATEGORIES_QUERY, variables: { electionId } }]}>
    {(mutate, { loading, data, error }) => {
      if (error) return <ErrorMessage message={error.message}/>
      if (data) setTitle('')

      return <Form
        loading={loading}
        onSubmit={(e) => {
          e.preventDefault()

          mutate({
            variables: {
              input: {
                title,
                eligible,
                electionId,
              },
            },
          })
        }}>
        <Form.Group>
          <Form.Input
            name="title"
            value={title}
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}
          />
          <Form.Field
            name="eligible"
            value={eligible}
            control={Select}
            options={options}
            placeholder='Select Eligibility'
            onChange={(e, data) => {
              setEligible(data.value)
            }}
          />
          <Form.Button content='Add'/>
        </Form.Group>
      </Form>
    }}
  </Mutation>
}

