import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ItemTypes } from '../Types/ItemTypes'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import HamburgerIcon from './HamburgerIcon'
import './ListItem.css'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
}

class ListItemDnD extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired,
  }
  static defaultProps = {
    text: 'default value',
    className: '',
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    const dragClass = isDragging ? 'listitem-over' : ''

    // override the class definition for the hamburger icon
    const style = { justifyContent: 'space-between', padding: '0 8px', cursor: 'auto' }
    const hoverStyle = { cursor: 'move' }

    return connectDragSource(
      connectDropTarget(
        <li className={`listitem ${dragClass}`} style={style}>
          {text}
          <HamburgerIcon label="Drag me" size={12} color="#fad0a3" hoverStyle={hoverStyle} />
        </li>
      )
    )
  }
}

const dropTargetHOC = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
const dragSourceHOC = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

export default dropTargetHOC(dragSourceHOC(ListItemDnD))
