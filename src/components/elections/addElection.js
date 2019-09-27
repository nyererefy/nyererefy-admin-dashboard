import React, { useState } from 'react'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import { Form, Header } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { ADD_ELECTION } from '../../utils/mutations'
import ErrorMessage from '../../layout/errorMessage'
import { ELECTIONS_QUERY } from '../../utils/quaries'
import moment from 'moment'
import { formatTime } from '../../utils/time'


export function AddElection() {
  const [title, setTitle] = useState('')
  const [startAt, setStartAt] = useState(moment().add(24, 'hours'))
  const [endAt, setEndAt] = useState(moment().add(48, 'hours'))
  const [showStartAtInput, setShowStartAtInput] = useState(false)
  const [showEndAtInput, setShowEndAtInput] = useState(false)

  return <Mutation mutation={ADD_ELECTION}
                   refetchQueries={[{ query: ELECTIONS_QUERY }]}>
    {(mutate, { loading, data, error }) => {
      if (error) return <ErrorMessage message={error.message}/>
      if (data) setTitle('')

      return (
        <div>
          <Header as="h2">Create Election</Header>

          <Form
            loading={loading}
            onSubmit={(e) => {
              e.preventDefault()

              mutate({
                variables: {
                  input: {
                    title,
                    startAt,
                    endAt,
                  },
                },
              })
            }}>
            <Form.Input
              label="Election Title"
              name="title"
              value={title}
              placeholder='Enter Title of election here...'
              onChange={e => setTitle(e.target.value)}
            />

            <Form.Input
              label="Start Time"
              value={formatTime(startAt)}
              onFocus={() => setShowStartAtInput(true)}
              readOnly
            />

            {showStartAtInput ?
              <InputMoment
                moment={startAt}
                onChange={t => setStartAt(t)}
                minStep={1}
                onSave={() => setShowStartAtInput(false)}
              /> : null}

            <Form.Input
              label="End Time"
              value={formatTime(endAt)}
              onFocus={() => setShowEndAtInput(true)}
              readOnly
            />

            {showEndAtInput ?
              <InputMoment
                moment={endAt}
                onChange={t => setEndAt(t)}
                minStep={1}
                onSave={() => setShowEndAtInput(false)}
              /> : null}

            <Form.Button content='Submit'/>
          </Form>
        </div>
      )
    }}
  </Mutation>
}

