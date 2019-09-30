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

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:2000/graphql',
  credentials: 'same-origin',
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:2000/graphql`,
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
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
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
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Container>
          <Route path="/" exact component={DashboardView}/>
          <Route path="/elections" component={ElectionsList}/>
          <Route path="/election/:id" component={ElectionView}/>
          <Route path="/subcategory/:id" component={SubcategoriesView}/>
        </Container>
      </BrowserRouter>
    </div>
  </ApolloProvider>
)

export default App
