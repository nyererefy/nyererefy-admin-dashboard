import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  state = { activeItem: 'university' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to='/'
            name='university'
            active={activeItem === 'university'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/dashboard'
            name='dashboard'
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/elections'
            name='elections'
            active={activeItem === 'elections'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/logout'
            position='right'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}
