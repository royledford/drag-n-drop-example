import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ListItem.css'

export default class ListItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    dataId: PropTypes.number.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
  }
  static defaultProps = {
    text: 'default value',
  }

  render() {
    const { text, dataId, dragStart, dragEnd } = this.props
    return (
      <li className="listitem" data-id={dataId} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>
        {text}
      </li>
    )
  }
}
