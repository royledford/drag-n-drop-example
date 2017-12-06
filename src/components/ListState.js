import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItemState from './ListItemState'
import './List.css'

export default class List extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
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

    this.sort = this.sort.bind(this)
    this.dragOver = this.dragOver.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
    this.dragStart = this.dragStart.bind(this)
  }

  sort(houses, draggedOverId) {
    // const data = Object.assign({}, this.props.data)
    // const data = Object.assign([], this.props.data)
    // data.houses = houses
    this.setState({ draggedOverId: draggedOverId, beingDragged: draggedOverId })

    // update the osrtIndex to show the new order
    houses.forEach((house, i) => {
      house.sortIndex = i
    })
    this.props.dataChanged(houses)
    // this.props.dataChanged(houses)
  }

  dragStart(e) {
    this.setState({ beingDragged: Number(e.target.dataset.id) })
    // this.dragged = Number(e.currentTarget.dataset.id)
    e.dataTransfer.effectAllowed = 'move'

    // for firefox
    e.dataTransfer.setData('text/html', e.currentTarget)
  }

  dragOver(e) {
    e.preventDefault()
    if (e.target.className === 'list') return

    // const over = e.currentTarget
    const over = e.target
    // let from = isFinite(dragging) ? dragging : this.state.beingDragged
    let from = this.state.beingDragged
    let to = Number(over.dataset.id)
    // debugger
    console.log(`from: ${from}, to: (${to}) ${over.innerHTML}`)
    this.setState({ draggedOverId: to })
    // if (e.clientY - over.offsetTop > over.offsetHeight / 2) to++
    // if (from < to) to--

    // Make a copy of the props data so we don't mutate
    let items = Object.assign([], this.props.data)
    // if (this.state.draggedOverId !== to) {
    items.splice(to, 0, items.splice(from, 1)[0])
    this.sort(items, to)
    // }
  }

  dragEnd() {
    // const data = this.props.data
    // const updateData = data.map((house, i) => (house.sortIndex = i))
    this.sort(this.props.data, undefined)
  }

  render() {
    const { data } = this.props
    const { draggedOverId } = this.state
    const listItems = data.map((house, i) => {
      let dragClass = i === draggedOverId ? 'liststate-dragging' : ''

      return (
        <ListItemState
          key={i}
          dataId={i}
          highlightClassname={dragClass}
          text={house.name}
          dragStart={this.dragStart}
          dragEnd={this.dragEnd}
        />
      )
    })
    // console.log(listItems)
    return (
      <ul className="list" onDragOver={this.dragOver}>
        {listItems}
      </ul>
    )
  }
}
