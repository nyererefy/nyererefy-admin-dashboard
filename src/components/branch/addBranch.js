import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Modal } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_BRANCH } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { BRANCHES_QUERY } from '../../utils/quaries'


export function AddBranch() {
  const [title, setTitle] = useState('')
  const [abbreviation, setAbbreviation] = useState('')
  const [showModel, setShowModel] = useState(false)

  return <Modal
    trigger={<Button content="Add" onClick={() => setShowModel(true)} fluid/>}
    open={showModel}
    onClose={() => setShowModel(false)}
    closeIcon>
    <Modal.Header>Add Branch</Modal.Header>
    <Modal.Content>
      <Mutation mutation={ADD_BRANCH} refetchQueries={[{ query: BRANCHES_QUERY }]}>
        {(mutate, { loading, data, error }) => {
          if (error) return <ErrorMessage message={error.message}/>
          if (data) {
            setTitle('')
            setAbbreviation('')
            setShowModel(false)
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
                        title,
                        abbreviation,
                      },
                    },
                  })
                }}>
                <Form.Input
                  label="Branch Title"
                  name="title"
                  value={title}
                  placeholder='Eg Mwanza Branch'
                  onChange={e => setTitle(e.target.value)}
                  required
                />
                <Form.Input
                  label="Branch Abbreviation"
                  name="abbreviation"
                  value={abbreviation}
                  placeholder='Eg MB'
                  onChange={e => setAbbreviation(e.target.value)}
                />

                <Form.Button content='Submit'/>
              </Form>
            </div>
          )
        }}
      </Mutation>
    </Modal.Content>
  </Modal>
}

