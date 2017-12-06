import React, { Component } from 'react'
import ListDOM from './ListDOM'
import ListState from './ListState'
import './Dnd.css'

export default class Dnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataDOM: ['Arryn', 'Frey', 'Greyjoy', 'Lannister', 'Stark', 'Targaryen'],
      dataState: [
        {
          name: 'Arryn',
          sortIndex: 0,
        },
        {
          name: 'Frey',
          sortIndex: 1,
        },
        {
          name: 'Greyjoy',
          sortIndex: 2,
        },
        {
          name: 'Lannister',
          sortIndex: 3,
        },
        {
          name: 'Stark',
          sortIndex: 4,
        },
        {
          name: 'Targaryen',
          sortIndex: 5,
        },
      ],
    }

    this.handleDataChangedDOM = this.handleDataChangedDOM.bind(this)
    this.handleDataChangedState = this.handleDataChangedState.bind(this)
  }

  handleDataChangedDOM(data) {
    this.setState({ dataDOM: data })
  }
  handleDataChangedState(data) {
    this.setState({ dataState: data })
  }

  render() {
    const { dataDOM, dataState } = this.state
    return (
      <div className="dnd">
        <div className="dnd-column">
          <h4>DOM Manipulation (bad)</h4>
          <ListDOM data={dataDOM} dataChanged={this.handleDataChangedDOM} />
          <br />
          <pre>{JSON.stringify(this.state.dataDOM, 0, 2)}</pre>
        </div>
        <div className="dnd-column">
          <h4>State Manipulation (good)</h4>
          <ListState data={dataState} dataChanged={this.handleDataChangedState} />
          <br />
          <pre>{JSON.stringify(this.state.dataState, 0, 2)}</pre>
        </div>
        <div>
          <h4>DOM Manipulation (bad)</h4>
          <ListDOM data={dataDOM} dataChanged={this.handleDataChangedDOM} />
        </div>
      </div>
    )
  }
}
