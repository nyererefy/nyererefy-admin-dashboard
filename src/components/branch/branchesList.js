import React from 'react'
import { BranchItem } from './branchItem'
import { Header, List } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { ProgressBar } from '../../layout/progressBar'
import ErrorMessage from '../../layout/errorMessage'
import { BRANCHES_QUERY } from '../../utils/quaries'
import { AddBranch } from './addBranch'


export const BranchesList = () => (
  <Query query={BRANCHES_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar/>
      if (error) return <ErrorMessage message={error.message}/>

      const { branches } = data
      return (
        <div>
          <Header as="h2">Branches</Header>

          <AddBranch/>

          {branches &&
          <List divided verticalAlign='middle'>
            {
              branches.map(b => <BranchItem election={b}/>)
            }
          </List>
          }
        </div>
      )
    }}
  </Query>
)
