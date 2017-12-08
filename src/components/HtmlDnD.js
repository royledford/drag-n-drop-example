import React, { Component } from 'react'

import HtmlDomList from './HtmlDomList'
import HtmlStateList from './HtmlStateList'
import './DnD.css'

export default class Dnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataState: [
        {
          id: 0,
          name: 'Arryn',
          sortIndex: 0,
        },
        {
          id: 1,
          name: 'Frey',
          sortIndex: 1,
        },
        {
          id: 2,
          name: 'Greyjoy',
          sortIndex: 2,
        },
        {
          id: 3,
          name: 'Lannister',
          sortIndex: 3,
        },
        {
          id: 4,
          name: 'Stark',
          sortIndex: 4,
        },
        {
          id: 5,
          name: 'Targaryen',
          sortIndex: 5,
        },
      ],
    }

    this.handleDataChanged = this.handleDataChanged.bind(this)
  }

  handleDataChanged(data) {
    this.setState({ dataState: data })
  }

  render() {
    const { dataState } = this.state
    return (
      <div>
        <h3 className="dnd-title">Drag and Drop using HTML5 Api and React Components</h3>
        <div className="dnd">
          <div>
            <h4>DOM Manipulation (bad)</h4>
            <HtmlDomList data={dataState} dataChanged={this.handleDataChanged} />
          </div>
          <div className="dnd-column">
            <h4>State Manipulation (good)</h4>
            <HtmlStateList data={dataState} dataChanged={this.handleDataChanged} />
          </div>

          <div>
            <h4>State for all Lists</h4>
            <pre>{JSON.stringify(this.state.dataState, 0, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }
}