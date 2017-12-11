import React, { Component } from 'react'
import StateView from './StateView'
import ReactDnDList from './ReactDnDList'
import './DnD.css'

export default class ReactDnD extends Component {
  constructor(props) {
    super(props)

    this.moveCard = this.moveCard.bind(this)
  }

  moveCard(dragIndex, hoverIndex) {
    const cards = Object.assign([], this.props.houses)
    const dragCard = cards[dragIndex]

    // remove the dragged card
    cards.splice(dragIndex, 1)

    // add it back in at the hover position
    cards.splice(hoverIndex, 0, dragCard)

    // update the sort index
    cards.forEach((card, i) => (card.sortIndex = i))
    this.props.handleDataChanged(cards)
  }

  render() {
    const { houses } = this.props
    return (
      <div>
        <h3 className="dnd-title">Drag and Drop using react-dnd</h3>
        <div className="dnd">
          <div className="dnd-column">
            <ReactDnDList data={houses} moveCard={this.moveCard} />
          </div>
          <StateView state={houses} />
        </div>
      </div>
    )
  }
}
