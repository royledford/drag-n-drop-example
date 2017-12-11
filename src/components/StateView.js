import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class name extends Component {
  static propTypes = {
    state: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <h4>Current state</h4>
        <pre>{JSON.stringify(this.props.state, 0, 2)}</pre>
      </div>
    )
  }
}
