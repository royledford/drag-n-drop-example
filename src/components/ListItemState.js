import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ListItem.css'

export default class ListItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    dataId: PropTypes.number.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    highlightClassname: PropTypes.string,
  }
  static defaultProps = {
    text: 'default value',
    highlightClassname: '',
  }

  render() {
    const { text, dataId, dragStart, dragEnd, highlightClassname } = this.props
    const className = highlightClassname === '' ? 'listitem' : `listitem ${highlightClassname}`
    return (
      <li className={className} data-id={dataId} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>
        {text}
      </li>
    )
  }
}
