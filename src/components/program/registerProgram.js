import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Message, Modal, Select } from 'semantic-ui-react'
import { Mutation, Query } from 'react-apollo'
import ErrorMessage from '../../layout/errorMessage'
import { PROGRAMS_QUERY, SCHOOLS_QUERY } from '../../utils/quaries'
import { ProgressBar } from '../../layout/progressBar'
import { REGISTER_PROGRAM } from '../../utils/mutations'


export function RegisterProgram({ school }) {
  const [identifier, setIdentifier] = useState('')
  const [programId, setProgramId] = useState(null)
  const [showModel, setShowModel] = useState(false)

  return <Modal
    trigger={<Button size="tiny" onClick={() => setShowModel(true)} icon='plus square outline' fluid/>}
    open={showModel}
    onClose={() => setShowModel(false)}
    closeIcon>
    <Modal.Header>Add Program to {school.title}</Modal.Header>
    <Modal.Content>
      <Mutation mutation={REGISTER_PROGRAM} refetchQueries={[{ query: SCHOOLS_QUERY }]}>
        {(mutate, { loading, data, error }) => {
          if (error) return <ErrorMessage message={error.message}/>
          if (data) {
            setIdentifier('')
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
                        identifier,
                        programId: parseInt(programId),
                        schoolId: parseInt(school.id),
                      },
                    },
                  })
                }}
                warning>
                <Message
                  warning
                  header='Be very careful with School identifier!'
                  list={[
                    'This should match exactly with what comes from bridge. Learn how to use it here ....',
                  ]}
                />
                <Form.Input
                  label="School Identifier"
                  value={identifier}
                  placeholder='Eg MB'
                  onChange={e => setIdentifier(e.target.value)}
                  required/>

                <Query query={PROGRAMS_QUERY}>
                  {({ loading, data, error }) => {
                    if (loading) return <ProgressBar/>
                    if (error) return <ErrorMessage message={error.message}/>

                    const options = data.programs.map(b => {
                      return {
                        key: b.id,
                        text: b.title,
                        value: b.id,
                      }
                    })

                    return <Form.Input
                      control={Select}
                      label="Program"
                      options={options}
                      value={programId}
                      placeholder='Select program'
                      onChange={(e, i) => setProgramId(i.value)}
                      required
                    />
                  }}
                </Query>

                <Form.Button content='Submit'/>
              </Form>
            </div>
          )
        }}
      </Mutation>
    </Modal.Content>
  </Modal>
}
