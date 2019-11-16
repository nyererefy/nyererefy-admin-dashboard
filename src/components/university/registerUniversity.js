import React, { useState } from 'react'
import 'input-moment/dist/input-moment.css'
import { Form, Header, Select } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { CREATE_UNIVERSITY } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { BRANCHES_QUERY, CURRENT_MANAGER_QUERY } from '../../utils/quaries'
import { Redirect } from 'react-router-dom'

const months = [
  { key: 1, text: 'January', value: 1 },
  { key: 2, text: 'February', value: 2 },
  { key: 3, text: 'March', value: 3 },
  { key: 4, text: 'April', value: 4 },
  { key: 5, text: 'May', value: 5 },
  { key: 6, text: 'June', value: 6 },
  { key: 7, text: 'July', value: 7 },
  { key: 8, text: 'August', value: 8 },
  { key: 9, text: 'September', value: 9 },
  { key: 10, text: 'October', value: 10 },
  { key: 11, text: 'November', value: 11 },
  { key: 12, text: 'December', value: 12 },
]

export function RegisterUniversity() {
  const [title, setTitle] = useState(null)
  const [abbreviation, setAbbreviation] = useState(null)
  const [webUrl, setWebUrl] = useState(null)
  const [bridgeUrl, setBridgeUrl] = useState(null)
  const [semesterStartsIn, setStartsIn] = useState(null)
  const [semesterEndsIn, setEndsIn] = useState(null)

  return (
    <Mutation mutation={CREATE_UNIVERSITY}
              refetchQueries={[{ query: CURRENT_MANAGER_QUERY }, { query: BRANCHES_QUERY }]}>
      {(mutate, { loading, data, error }) => {
        if (error) return <ErrorMessage message={error.message}/>
        if (data) return <Redirect to="/"/>

        return (
          <div>
            <Header as='h2'>Register University</Header>

            <Form
              loading={loading}
              onSubmit={(e) => {
                e.preventDefault()

                mutate({
                  variables: {
                    input: {
                      title,
                      abbreviation,
                      webUrl,
                      bridgeUrl,
                      semesterStartsIn,
                      semesterEndsIn,
                    },
                  },
                })
              }}
            >
              <Form.Input
                label='Title'
                value={title}
                placeholder='ex. Catholic University Of Health And Allied Sciences'
                onChange={(e) => setTitle(e.target.value)}
              />

              <Form.Input
                label='Abbreviation'
                value={abbreviation}
                placeholder='ex. CUHAS'
                onChange={(e) => setAbbreviation(e.target.value)}
              />

              <Form.Input
                label='Website'
                value={webUrl}
                placeholder='ex. http://www.bugando.ac.tz'
                onChange={(e) => setWebUrl(e.target.value)}
              />

              <Form.Input
                label='Bridge URL'
                value={bridgeUrl}
                placeholder='ex. http://www.bugando.ac.tz/nyererefy'
                onChange={(e) => setBridgeUrl(e.target.value)}
              />

              <Form.Field
                label='semesterStartsIn'
                value={semesterStartsIn}
                control={Select}
                options={months}
                placeholder='Select Month'
                onChange={(e, data) => {
                  setStartsIn(data.value)
                }}
              />

              <Form.Field
                label='semesterEndsIn'
                value={semesterEndsIn}
                control={Select}
                options={months}
                placeholder='Select Month'
                onChange={(e, data) => {
                  setEndsIn(data.value)
                }}
              />

              <Form.Button content='Submit'/>
            </Form>
          </div>
        )
      }}
    </Mutation>
  )
}
