import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StateView from './StateView'
import HtmlList from './HtmlList'
import './DnD.css'

export default class Dnd extends Component {
  static propTypes = {
    houses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        sortIndex: PropTypes.number.isRequired,
      })
    ).isRequired,
  }
  static defaultProps = {
    data: {},
  }

  constructor(props) {
    super(props)
    this.state = {}

    this.handleDataChanged = this.handleDataChanged.bind(this)
  }

  handleDataChanged(data) {
    this.props.handleDataChanged(data)
  }

  render() {
    const { houses } = this.props
    return (
      <div>
        <h3 className="dnd-title">Drag and Drop using HTML5 Api and React Components</h3>
        <div className="dnd">
          <div className="dnd-column">
            <HtmlList data={houses} handleDataChanged={this.handleDataChanged} />
          </div>
          <StateView state={houses} />
        </div>
      </div>
    )
  }
}
