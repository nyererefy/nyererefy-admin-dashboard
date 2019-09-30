import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Divider, Dropdown, Form } from 'semantic-ui-react'
import { Mutation, Query } from 'react-apollo'
import { CREATE_CANDIDATE } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { SEARCH_STUDENT_QUERY, SUBCATEGORY_QUERY } from '../../utils/quaries'
import { ProgressBar } from '../../layout/progressBar'

export function AddCandidate({ subcategoryId }) {
  const [userId, setUserId] = useState('')
  const [searchQuery, setSearchQuery] = useState(null)

  return <Mutation mutation={CREATE_CANDIDATE}
                   refetchQueries={[{ query: SUBCATEGORY_QUERY, variables: { subcategoryId } }]}>
    {(mutate, { loading, data, error }) => {
      if (error) return <ErrorMessage message={error.message}/>
      if (data) {
        setUserId('')
      }

      return (
        <div>
          <Form
            loading={loading}
            onSubmit={e => {
              e.preventDefault()

              mutate({
                variables: {
                  input: {
                    userId: parseInt(userId),
                    subcategoryId,
                  },
                },
              })
            }}>

            <Query query={SEARCH_STUDENT_QUERY} variables={{ query: searchQuery }}>
              {({ loading, data, error }) => {
                if (error) return <ErrorMessage message={error.message}/>
                if (loading) return <ProgressBar/>

                const options = data.users.map(u => {
                  return {
                    key: u.id,
                    text: `${u.name || ''} #${u.regNo}`,
                    value: u.id,
                  }
                })

                // todo this does not work well
                return <Dropdown
                  clearable
                  fluid
                  onChange={(e, { value }) => setUserId(value)}
                  onSearchChange={(e, { searchQuery }) => setSearchQuery(searchQuery)}
                  selection
                  search
                  value={userId}
                  options={options}
                  placeholder='Search Student'
                  loading={loading}
                />
              }}
            </Query>

            <Divider/>

            <Form.Button content='Submit'/>
          </Form>
        </div>
      )
    }}
  </Mutation>
}
