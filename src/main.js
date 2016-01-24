import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './components/Tile';
import Timer from './components/Timer';
require('./less/style.less');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tiles: [],
			moves: [],
			end: false,
			startGame: false
		}
	}
	shuffleFY(tiles) {
		//shuffling with Fisher-Yeits algorithm
		let rand = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}
		for (let i = tiles.length - 1; i > 0; i--) {
			let j = rand(0, i);
			let sw = tiles[j];
			tiles[j] = tiles[i];
			tiles[i]= sw;
		}
	}
	newGame() {
		let tiles = Array(15);
		this.setState({
			end: false
		});

		for (let i = 1; i < 16; i++) {
			tiles[i - 1] = i;
		}

		tiles.push(null);
		this.shuffleFY(tiles);
		this.setState({
			tiles: tiles,
			startGame: true
		});

		setTimeout(() => {
			this.setState({
				startGame: false
			});
		}, 0)
			
	}
	replayGame() {

	}
	checkCondition(tiles) {
		let 	winCondition = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
		for (let t = 0; t < tiles.length - 1 ; t++) {
			if (!tiles[t] || winCondition[t] != tiles[t]) return false;
		}
		return true;
	}
	moveRow(tile_number, position) {
		let leftSpace = -1;
		let topSpace = -1;

		if (this.state.end) return;

		for (let t = 0; t < 4; t++) {
			if (!this.state.tiles[position[1]*4 + t]) {
				leftSpace = t;
				break;
			}
		}

		for (let t = 0; t < 4; t++) {
			if (!this.state.tiles[4*t + position[0]]) {
				topSpace = t;
				break;
			}
		}	

		let tiles = this.state.tiles;

		if (leftSpace >= 0) {
			let movedBy = Math.abs(leftSpace - position[0]);
			let diff = leftSpace - position[0] > 0 ? -1: 1;
			for (let m = 0; m < movedBy; m++) {
				let oldNum = tiles[position[1] * 4 + leftSpace + diff * (m + 1)];
				tiles[position[1] * 4 + leftSpace + diff * (m + 1)] = null;
				tiles[position[1] * 4 + leftSpace + diff * m] = oldNum;
			}
		}

		if (topSpace >= 0) {
			let movedBy = Math.abs(topSpace - position[1]);
			let diff = topSpace - position[1] > 0 ? -1: 1;
			for (let m = 0; m < movedBy; m++) {
				let oldNum = tiles[(topSpace + diff * (m + 1)) * 4 + position[0]];
				tiles[(topSpace + diff * (m + 1)) * 4 + position[0]] = null;
				tiles[(topSpace + diff * m) * 4 + position[0]] = oldNum;
			}
		}

		if (topSpace >= 0 || leftSpace >= 0) {
			this.setState({
				tiles: tiles
			});
		}

		if (this.checkCondition(tiles)) {
			this.setState({
				end: true
			})
		}	
	}
	render() {
		let top = 0;
		let stateScreen = null;

		if (this.state.end) {
			stateScreen = (
				<h1>Game finished!</h1>
			);
		}

		return (
			<div className="game-field-wrapper">
				<div className="title">
					<h1>GEMS 15</h1>
					<div className="tools">
						<Timer start={this.state.startGame}></Timer>
						<button onClick={this.newGame.bind(this)}>Reset</button>	
						<button onClick={this.replayGame.bind(this)}>Replay</button>
					</div>
				</div>
				<div className="game-field" style={{position: 'relative'}}>	
				{ this.state.tiles.map((title, index) => {
					let left = index % 4 == 0 ? 0: index - top * 4;
					top += (index % 4 == 0 && index > 0) ? 1: 0;

					if (!title) return (<span key={index}></span>);
					return (
						<Tile onClickRow={this.moveRow.bind(this)} key={index} position={[left, top]} number={title}/>
					)
				})}
				</div>
				{stateScreen}
			</div>
		)
	}
}

window.onload = () => {
	ReactDOM.render(<App/>, document.getElementById('gameField'));
};