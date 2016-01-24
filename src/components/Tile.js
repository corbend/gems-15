import React from 'react';


export default class Tile extends React.Component {
	onClickTile() {
		this.props.onClickRow(this.props.number, this.props.position);
	}
	render() {
		let [left, top] = this.props.position;
		left = left  * 100;
		top = top * 100;
		return (
			<div onClick={this.onClickTile.bind(this)} className="tile" style={{position: 'absolute', top, left}}>
				<span className='tile-title'>{this.props.number}</span>
			</div>
		)
	}
}