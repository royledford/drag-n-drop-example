import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ListItem.css'

export default class ListItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    dataId: PropTypes.number.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    className: PropTypes.string,
  }
  static defaultProps = {
    text: 'default value',
    className: '',
  }

  render() {
    const { text, dataId, dragStart, dragEnd, className } = this.props
    const newClassName = className === '' ? 'listitem' : `listitem ${className}`
    return (
      <li className={newClassName} data-id={dataId} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>
        {text}
      </li>
    )
  }
}
