import React, { Component } from 'react'
import StateView from './StateView'
import ReactDnDList from './ReactDnDList'
import './DnD.css'

export default class ReactDnD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataState: [
        {
          id: 0,
          name: 'Arryn',
          sortIndex: 0,
        },
        {
          id: 1,
          name: 'Frey',
          sortIndex: 1,
        },
        {
          id: 2,
          name: 'Greyjoy',
          sortIndex: 2,
        },
        {
          id: 3,
          name: 'Lannister',
          sortIndex: 3,
        },
        {
          id: 4,
          name: 'Stark',
          sortIndex: 4,
        },
        {
          id: 5,
          name: 'Targaryen',
          sortIndex: 5,
        },
      ],
    }

    this.moveCard = this.moveCard.bind(this)
  }

  moveCard(dragIndex, hoverIndex) {
    const cards = Object.assign([], this.state.dataState)
    const dragCard = cards[dragIndex]

    // remove the dragged card
    cards.splice(dragIndex, 1)

    // add it back in at the hover position
    cards.splice(hoverIndex, 0, dragCard)

    // update the sort index
    cards.forEach((card, i) => (card.sortIndex = i))

    this.setState({ dataState: cards })
    console.log('h')
  }

  render() {
    const { dataState } = this.state
    return (
      <div>
        <h3 className="dnd-title">Drag and Drop using react-dnd</h3>
        <div className="dnd">
          <div className="dnd-column">
            <ReactDnDList data={dataState} moveCard={this.moveCard} />
          </div>
          <StateView state={this.state.dataState} />
        </div>
      </div>
    )
  }
}
