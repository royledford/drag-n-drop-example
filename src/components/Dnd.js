import React, { Component } from 'react'
import List from './List'
import './Dnd.css'

export default class Dnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ['val 1', 'val 2', 'val 3', 'val 4', 'val 5'],
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="dnd">
        <List data={data} />
      </div>
    )
  }
}
