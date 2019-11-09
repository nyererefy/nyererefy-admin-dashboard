import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Modal, Select } from 'semantic-ui-react'
import { Mutation, Query } from 'react-apollo'
import { CREATE_SCHOOL } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { BRANCHES_QUERY, SCHOOLS_QUERY } from '../../utils/quaries'
import { ProgressBar } from '../../layout/progressBar'

export function AddSchool() {
  const [title, setTitle] = useState('')
  const [abbreviation, setAbbreviation] = useState('')
  const [branchId, setBranchId] = useState(null)
  const [showModel, setShowModel] = useState(false)

  return (
    <Modal
      trigger={<Button content='Add' onClick={() => setShowModel(true)} fluid />}
      open={showModel}
      onClose={() => setShowModel(false)}
      closeIcon
    >
      <Modal.Header>Add School</Modal.Header>
      <Modal.Content>
        <Mutation mutation={CREATE_SCHOOL} refetchQueries={[{ query: SCHOOLS_QUERY }]}>
          {(mutate, { loading, data, error }) => {
            if (error) return <ErrorMessage message={error.message} />
            if (data) {
              setTitle('')
              setAbbreviation('')
              setShowModel(false)
            }

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
                          abbreviation,
                          branchId: parseInt(branchId),
                        },
                      },
                    })
                  }}
                  warning
                >
                  <Form.Input
                    label='School Title'
                    value={title}
                    placeholder='Eg School of Pharmacy'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <Form.Input
                    label='School Abbreviation'
                    value={abbreviation}
                    placeholder='Eg SP'
                    onChange={(e) => setAbbreviation(e.target.value)}
                  />

                  <Query query={BRANCHES_QUERY}>
                    {({ loading, data, error }) => {
                      if (loading) return <ProgressBar />
                      if (error) return <ErrorMessage message={error.message} />

                      const options = data.branches.map((b) => {
                        return {
                          key: b.id,
                          text: b.title,
                          value: b.id,
                        }
                      })

                      return (
                        <Form.Input
                          control={Select}
                          label='Branch'
                          options={options}
                          value={branchId}
                          placeholder='Select branch'
                          onChange={(e, i) => setBranchId(i.value)}
                          required
                        />
                      )
                    }}
                  </Query>

                  <Form.Button content='Submit' />
                </Form>
              </div>
            )
          }}
        </Mutation>
      </Modal.Content>
    </Modal>
  )
}
