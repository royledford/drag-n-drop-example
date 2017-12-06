import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'
import './List.css'

export default class List extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dataChanged: PropTypes.func.isRequired,
  }
  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)

    this.dragOver = this.dragOver.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
    this.dragStart = this.dragStart.bind(this)
  }

  componentWillMount() {
    const placeholder = document.createElement('li')
    placeholder.className = 'list-placeholder'
    this.setState({ placeholder: placeholder })
  }

  dragStart(e) {
    this.dragged = e.currentTarget
    e.dataTransfer.effectAllowed = 'move'

    // for firefox
    e.dataTransfer.setData('text/html', e.currentTarget)
    console.log('li dragStart')
  }

  dragOver(e) {
    e.preventDefault()
    if (e.target.className === 'list') return
    this.dragged.style.display = 'none'
    if (e.target.className === 'list-placeholder') return
    this.over = e.target

    const relY = e.clientY - this.over.offsetTop
    const height = this.over.offsetHeight / 2
    const parent = e.target.parentNode

    if (relY > height) {
      this.nodePlacement = 'after'
      parent.insertBefore(this.state.placeholder, e.target.nextElementSibling)
    } else if (relY < height) {
      this.nodePlacement = 'before'
      parent.insertBefore(this.state.placeholder, e.target)
    }
  }

  dragEnd() {
    this.dragged.style.display = 'block'
    this.dragged.parentNode.removeChild(this.state.placeholder)

    // Update our data in state with the new order.
    const data = this.props.data
    var from = Number(this.dragged.dataset.id)
    var to = Number(this.over.dataset.id)
    if (from < to) to--
    if (this.nodePlacement === 'after') to++
    data.splice(to, 0, data.splice(from, 1)[0])
    this.props.dataChanged(data)
    // this.setState({ data: data })
  }

  render() {
    const { data } = this.props
    const listItems = data.map((listItem, i) => (
      <ListItem key={listItem} dataId={i} text={listItem} dragStart={this.dragStart} dragEnd={this.dragEnd} />
    ))
    return (
      <ul className="list" onDragOver={this.dragOver}>
        {listItems}
      </ul>
    )
  }
}
