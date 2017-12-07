import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ListItemDnD from './ListItemDnD'
import './List.css'

class ListDnD extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
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
  }

  render() {
    const { data } = this.props

    const listItems = data.map((house, i) => {
      return (
        <ListItemDnD
          key={house.id}
          index={i}
          // className={dragClass}
          text={house.name}
          moveCard={this.props.moveCard}
          // dragEnd={this.dragEnd}
        />
      )
    })

    return (
      <ul className="list" onDragOver={this.dragOver}>
        {listItems}
      </ul>
    )
  }
}

export default DragDropContext(HTML5Backend)(ListDnD)
