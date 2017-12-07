import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'
import './List.css'

export default class ListDOM extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
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

    this.dragOver = this.dragOver.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
    this.dragStart = this.dragStart.bind(this)
  }

  componentWillMount() {
    // create an element to identify where the user
    // will be dropping an item in the list.
    const placeholder = document.createElement('li')
    placeholder.className = 'list-placeholder'
    this.setState({ placeholder: placeholder })
  }

  dragStart(e) {
    this.dragged = e.currentTarget
    e.dataTransfer.effectAllowed = 'move'
  }

  dragOver(e) {
    e.preventDefault()
    if (e.target.className === 'list') return //ignore dragging of the list container
    if (e.target.className === 'list-placeholder') return // ignore drags over the placeholder
    this.dragged.style.display = 'none'
    this.over = e.target

    // Handle dragging over the last item in the container
    const relY = e.clientY - this.over.offsetTop
    const height = this.over.offsetHeight / 2
    const parent = e.target.parentNode

    let beforeElement = {}

    if (relY > height) {
      this.nodePlacement = 'after'
      const beforeElement = e.target.nextElementSibling
    } else if (relY < height) {
      this.nodePlacement = 'before'
      const beforeElement = e.target
    }

    parent.insertBefore(this.state.placeholder, e.target.nextElementSibling)
  }

  dragEnd() {
    // get rid of the placeholder
    this.dragged.style.display = 'block'
    this.dragged.parentNode.removeChild(this.state.placeholder)

    // Update our data with the new order.
    const data = this.props.data
    var from = Number(this.dragged.dataset.id)
    var to = Number(this.over.dataset.id)
    if (from < to) to--
    if (this.nodePlacement === 'after') to++
    data.splice(to, 0, data.splice(from, 1)[0])

    // Update the sortIndex props to match the new order
    data.forEach((item, i) => (item.sortIndex = i))

    // call the parent to update the state.
    this.props.dataChanged(data)
  }

  render() {
    const { data } = this.props
    const listItems = data.map((house, i) => (
      <ListItem key={house.id} dataId={i} text={house.name} dragStart={this.dragStart} dragEnd={this.dragEnd} />
    ))
    return (
      <ul className="list" onDragOver={this.dragOver}>
        {listItems}
      </ul>
    )
  }
}
