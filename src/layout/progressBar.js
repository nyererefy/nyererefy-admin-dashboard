import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import React from 'react'

export function ProgressBar() {
  return <Segment padded='very'>
    <Dimmer active>
      <Loader size='massive'>Loading</Loader>
    </Dimmer>
  </Segment>
}
