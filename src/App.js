import React, { Component } from 'react'
import HtmlDnD from './components/HtmlDnD'
import ReactDnD from './components/ReactDnD'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'HTML5 DnD',
    }
  }

  handlePageChange = e => {
    this.setState({ page: e.target.innerHTML })
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

    let display = <HtmlDnD />
    if (page !== 'HTML5 DnD') display = <ReactDnD />

    return (
      <div className="app-wrapper">
        <div className="app-header">
          <button onClick={this.handlePageChange} style={page === 'HTML5 DnD' ? styles.current : styles.default}>
            HTML5 DnD
          </button>
          <button onClick={this.handlePageChange} style={page === 'React DnD' ? styles.current : styles.default}>
            React DnD
          </button>
        </div>
        <div>{display}</div>
      </div>
    )
  }
}

export default App
