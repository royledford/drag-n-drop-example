import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ReactDnDListItem from './ReactDnDListItem'
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

  render() {
    const { data } = this.props

    const listItems = data.map((card, i) => {
      return <ReactDnDListItem key={card.id} index={i} text={card.name} moveCard={this.props.moveCard} />
    })

    return (
      <ul className="list" onDragOver={this.dragOver}>
        {listItems}
      </ul>
    )
  }
}

export default DragDropContext(HTML5Backend)(ListDnD)
