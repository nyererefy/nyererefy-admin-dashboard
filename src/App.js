import React from 'react'
import './App.css'
import Header from './layout/header'
import { ElectionsList } from './components/elections/electionsList'
import { Container } from 'semantic-ui-react'
import { BrowserRouter, Route } from 'react-router-dom'
import { DashboardView } from './components/dashboard/dashboardView'
import { ElectionView } from './components/elections/electionView'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { SubcategoriesView } from './components/subcategory/subcategoriesView'
import Logout from './components/auth/logout'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import { UniversityView } from './components/university/universityView'

let BASE_URL = ''
let WS_BASE_URL = ''

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://nyererefy.com/graphql'
  WS_BASE_URL = 'wss://nyererefy.com/graphql'
} else {
  BASE_URL = 'http://localhost:2000/graphql'
  WS_BASE_URL = 'ws://localhost:2000/graphql'
}

// Create an http link:
const httpLink = new HttpLink({
  uri: BASE_URL,
  credentials: 'include',
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: WS_BASE_URL,
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Container>
          <Route path='/manage/' exact component={UniversityView}/>
          <Route path='/manage/dashboard' component={DashboardView}/>
          <Route path='/manage/elections' component={ElectionsList}/>
          <Route path='/manage/election/:id' component={ElectionView}/>
          <Route path='/manage/subcategory/:id' component={SubcategoriesView}/>
          <Route path='/manage/login' component={Login}/>
          <Route path='/manage/signup' component={SignUp}/>
          <Route path='/manage/logout' component={Logout}/>
        </Container>
      </BrowserRouter>
    </div>
  </ApolloProvider>
)

export default App
