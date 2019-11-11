import React, { useState } from 'react'
import { Form, Grid, Header, Image, Message } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import GoogleLogin from 'react-google-login'
import { SIGN_UP } from '../../utils/mutations'
import { IS_LOGGED_IN, M_DATA, NAME } from '../../utils/consts'
import ErrorMessage from '../../layout/errorMessage'
import { Link, Redirect } from 'react-router-dom'

function SignUp() {
  const [err, setError] = useState(null)
  const [code, setCode] = useState('')

  return (
    <Mutation mutation={SIGN_UP}>
      {(mutate, { loading, error, data }) => {
        if (error) return <ErrorMessage message={error.message}/>

        if (data) {
          const studentData = {
            [IS_LOGGED_IN]: true,
            [NAME]: data.registerManager.name,
          }

          localStorage.setItem(M_DATA, JSON.stringify(studentData))
          return <Redirect to="/"/>
        }

        return (
          <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/logo192.png"/> Create Manager account
              </Header>
              {err && <Message>{error}</Message>}
              <Form loading={loading}>
                <Form.Input
                  label='Registration Code'
                  value={code}
                  placeholder='Paste codes sent to your email'
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <GoogleLogin
                  disabled={code.length !== 32}
                  clientId="888907700282-akq10n9hvdrft4e7pnsj3fqrs73ar9f1.apps.googleusercontent.com"
                  buttonText="Sign Up with Google"
                  onSuccess={obj => {
                    mutate({
                      variables: {
                        input: { token: obj.tokenId, code },
                      },
                    })
                  }}
                  onFailure={e => setError(e)}
                  cookiePolicy={'single_host_origin'}
                />
              </Form>
              <Message>
                Already registered? <Link to='/login'>Login now</Link>
              </Message>
            </Grid.Column>
          </Grid>
        )
      }}
    </Mutation>
  )
}

export default SignUp
