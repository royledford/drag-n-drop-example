import React, { Component } from 'react'
import HtmlDnD from './components/HtmlDnD'
import ReactDnD from './components/ReactDnD'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'HTML5 DnD',
      houses: [
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

  handlePageChange = e => {
    this.setState({ page: e.target.innerHTML })
  }

  handleDataChanged(data) {
    this.setState({ houses: data })
  }

  render() {
    const { page } = this.state
    const styles = {
      current: {
        backgroundColor: '#929292',
        color: 'white',
        border: '1px solid #929292',
      },
      default: {
        color: '#afafaf',
        border: '1px solid #afafaf',
      },
    }

    let display = <HtmlDnD houses={this.state.houses} handleDataChanged={this.handleDataChanged} />
    if (page !== 'HTML5 DnD')
      display = <ReactDnD houses={this.state.houses} handleDataChanged={this.handleDataChanged} />

    return (
      <div className="app-wrapper">
        <div className="app-header">
          <button onClick={this.handlePageChange} style={page === 'HTML5 DnD' ? styles.current : styles.default}>
            HTML5 DnD
          </button>
          <button onClick={this.handlePageChange} style={page === 'React DnD' ? styles.current : styles.default}>
            React DnD
          </button>
          <a href="https://github.com/royledford/drag-n-drop-example">GitHub</a>
        </div>
        <div>{display}</div>
      </div>
    )
  }
}

export default App
