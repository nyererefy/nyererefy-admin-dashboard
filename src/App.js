import React from 'react'
import './App.css'
import Header from './layout/header'
import { ElectionsList } from './components/elections/electionsList'
import { Container } from 'semantic-ui-react'
import { BrowserRouter, Route } from 'react-router-dom'
import { DashboardView } from './components/dashboard/dashboardView'
import { ElectionView } from './components/elections/electionView'
import { SchoolsList } from './components/school/schoolsList'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Header/>
      <Container>
        <Route path="/" exact component={DashboardView}/>
        <Route path="/elections" component={ElectionsList}/>
        <Route path="/election/:id" component={ElectionView}/>
        <Route path="/schools" component={SchoolsList}/>
      </Container>
    </BrowserRouter>
  </div>
)

export default App
