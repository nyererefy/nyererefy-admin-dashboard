import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Modal } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_BRANCH, CREATE_RESIDENCE } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { BRANCHES_QUERY, RESIDENCES_QUERY } from '../../utils/quaries'

export function AddResidence() {
  const [title, setTitle] = useState(null)
  const [showModel, setShowModel] = useState(false)

  return (
    <Modal
      trigger={<Button content='Add' onClick={() => setShowModel(true)} fluid />}
      open={showModel}
      onClose={() => setShowModel(false)}
      closeIcon
    >
      <Modal.Header>Add Residence</Modal.Header>
      <Modal.Content>
        <Mutation mutation={CREATE_RESIDENCE} refetchQueries={[{ query: RESIDENCES_QUERY }]}>
          {(mutate, { loading, data, error }) => {
            if (error) return <ErrorMessage message={error.message} />
            if (data) {
              setTitle('')
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
                        },
                      },
                    })
                  }}
                >
                  <Form.Input
                    label='Residence Title'
                    name='title'
                    value={title}
                    placeholder='Eg Hostel'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
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
