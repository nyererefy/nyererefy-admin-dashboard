import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Modal } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import ErrorMessage from '../../layout/errorMessage'
import { SCHOOLS_QUERY } from '../../utils/quaries'
import { DELETE_SCHOOL_PROGRAM } from '../../utils/mutations'

export function DeleteProgram({ schoolProgramId }) {
  const [showModel, setShowModel] = useState(false)

  return (
    <Modal
      trigger={
        <Button size='mini' negative onClick={() => setShowModel(true)} icon='delete'/>
      }
      open={showModel}
      onClose={() => setShowModel(false)}
      closeIcon
      size='mini'
    >
      <Modal.Header>Are you sure you want to delete?</Modal.Header>
      <Modal.Content>
        <Mutation mutation={DELETE_SCHOOL_PROGRAM} refetchQueries={[{ query: SCHOOLS_QUERY }]}>
          {(mutate, { loading, data, error }) => {
            if (error) return <ErrorMessage message={error.message}/>
            if (data) {
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
                        id: parseInt(schoolProgramId),
                      },
                    })
                  }}
                >
                  <Form.Button content='Yes, Delete'/>
                </Form>
              </div>
            )
          }}
        </Mutation>
      </Modal.Content>
    </Modal>
  )
}
