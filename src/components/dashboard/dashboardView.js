import React from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import { BranchesList } from '../branch/branchesList'
import { SchoolsList } from '../school/schoolsList'
import { ClassesList } from '../class/classesList'

export function DashboardView() {
  return <Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
        <Segment>
          stats
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Divider/>

    <Grid.Row>
      <Grid.Column>
        <BranchesList/>
      </Grid.Column>

      <Grid.Column>
        <SchoolsList/>
      </Grid.Column>

      <Grid.Column>
        <ClassesList/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
}
