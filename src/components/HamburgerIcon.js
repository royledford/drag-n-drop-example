import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HamburgerIcon extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.number,
    lineWidth: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    hoverStyle: PropTypes.object,
  }
  static defaultProps = {
    size: 16,
    lineWidth: 6,
    color: '#000',
    className: '',
    hoverStyle: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      hovered: false,
    }
    this.toggleHovered = this.toggleHovered.bind(this)
  }

  toggleHovered() {
    this.setState({ hovered: !this.state.hovered })
  }

  render() {
    const blockStyle = { display: 'inline-block' }
    const style = { ...this.props.hoverStyle, ...blockStyle }

    const { size, label, lineWidth, color, className } = this.props
    return (
      <div className={className} style={style} onMouseEnter={this.toggleHovered} onMouseLeave={this.toggleHovered}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" aria-labelledby={label}>
          <title>{label}</title>
          <g>
            <line strokeWidth={lineWidth} stroke={color} y1="3.5" x2="40" y2="3.5" />
            <line strokeWidth={lineWidth} stroke={color} y1="20.25" x2="40" y2="20.25" />
            <line strokeWidth={lineWidth} stroke={color} y1="37" x2="40" y2="37" />
          </g>
        </svg>
      </div>
    )
  }
}
