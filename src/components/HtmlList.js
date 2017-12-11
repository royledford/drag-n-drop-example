import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HtmlListItem from './HtmlListItem'
import './List.css'

export default class ListState extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        sortIndex: PropTypes.number.isRequired,
      })
    ).isRequired,

    dataChanged: PropTypes.func.isRequired,
  }
  static defaultProps = {
    data: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      draggedOverId: undefined,
      beingDragged: undefined,
    }

    this.updateState = this.updateState.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.dragOver = this.dragOver.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // only update when the item being hovered changes,
    if (nextState.draggedOverId === this.state.draggedOverId) return false
    return true
  }

  updateState(houses, draggedOverId) {
    this.setState({ draggedOverId: draggedOverId, beingDragged: draggedOverId })

    // update the sortIndex to show the new order
    houses.forEach((house, i) => {
      house.sortIndex = i
    })

    // Tell the parent there is a new order
    this.props.dataChanged(houses)
  }

  dragStart(e) {
    // Update our state with the item that is being dragged
    this.setState({ beingDragged: Number(e.target.dataset.id) })
    e.dataTransfer.effectAllowed = 'move'
  }

  dragOver(e) {
    e.preventDefault()

    // ignore when dragging over the list container
    if (e.target.className === 'list') return

    let from = this.state.beingDragged
    let to = Number(e.target.dataset.id)
    this.setState({ draggedOverId: to })

    // reorder the array with the current hover position
    let items = this.props.data
    items.splice(to, 0, items.splice(from, 1)[0])

    this.updateState(items, to)
  }

  dragEnd() {
    // Update state to force removal of the class used for highlighting
    this.updateState(this.props.data, undefined)
  }

  render() {
    const { data } = this.props
    const { draggedOverId } = this.state

    const HtmllistItems = data.map((house, i) => {
      // highlight the new position
      let dragClass = i === draggedOverId ? 'listitem-over' : ''

      return (
        <HtmlListItem
          key={house.id}
          dataId={i}
          className={dragClass}
          text={house.name}
          dragStart={this.dragStart}
          dragEnd={this.dragEnd}
        />
      )
    })

    return (
      <ul className="list" onDragOver={this.dragOver}>
        {HtmllistItems}
      </ul>
    )
  }
}
