import React, { Component } from 'react'
import ListDOM from './ListDOM'
import './Dnd.css'

export default class Dnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ['House Arryn', 'House Frey', 'House Greyjoy', 'House Lannister', 'House Stark', 'House Targaryen'],
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="dnd">
        <div>
          <h4>DOM Manipulation (bad)</h4>
          <ListDOM data={data} />
        </div>
        <div>
          <h4>DOM Manipulation (bad)</h4>
          <ListDOM data={data} />
        </div>
        <div>
          <h4>DOM Manipulation (bad)</h4>
          <ListDOM data={data} />
        </div>
      </div>
    )
  }
}
