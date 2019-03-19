import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Title from '../title/title';
import SelectionList from '../selection-list/selection-list';
import PokeBox from '../pokebox/pokebox';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checkboxes: [
				{
					itemName: "Raid Passes",
					cost: 100,
					checked: false
				}, 
				{
					itemName: "Super Incubators",
					cost: 200,
					checked: false
				}, 
				{
					itemName: "Egg Incubators",
					cost: 150,
					checked: false
				}, 
				{
					itemName: "Lucky Eggs",
					cost: 80,
					checked: false
				}, 
				{
					itemName: "Star Pieces",
					cost: 80,
					checked: false
				}, 
				{
					itemName: "Incenses",
					cost: 80,
					checked: false
				}, 
				{
					itemName: "Lure Modules",
					cost: 100,
					checked: false
				}, 
				{
					itemName: "Berries",
					cost: 0,
					checked: false
				}
			],
			contentBoxes: [
				{
					boxName: "Special",
					contents: {
						raidPasses: 4,
						superIncs: 0,
						eggIncs: 1,
						luckyEggs: 3,
						starPieces: 0,
						incenses: 0,
						lures: 0,
						berries: 0
					},
					price: 480,
					isActive: true
				},
				{
					boxName: "Great",
					contents: {
						raidPasses: 6,
						superIncs: 2,
						eggIncs: 0,
						luckyEggs: 3,
						starPieces: 4,
						incenses: 0,
						lures: 0,
						berries: 0
					},
					price: 780,
					isActive: true
				},
				{
					boxName: "Ultra",
					contents: {
						raidPasses: 15,
						superIncs: 6,
						eggIncs: 0,
						luckyEggs: 0,
						starPieces: 8,
						incenses: 7,
						lures: 0,
						berries: 0
					},
					price: 1480,
					isActive: true
				},
				{
					boxName: "Adventure",
					contents: {
						raidPasses: 0,
						superIncs: 11,
						eggIncs: 5,
						luckyEggs: 0,
						starPieces: 8,
						incenses: 7,
						lures: 0,
						berries: 0
					},
					price: 480,
					isActive: true
				}, 
			]
		}
	}

	onAppChange = e => {
		const updatedBoxes = this.state.checkboxes.map((box) => {
			if (e.target.id === box.itemName.replace(/\s+/g, '')) {
				box.checked = e.target.checked;
			}
			return box;
		});

		this.setState({checkboxes: updatedBoxes});
	}

	renderPokeboxes = () => {
		const boxesToShow = this.state.contentBoxes.map( (box) => {
			if (box.isActive) {
				return (<PokeBox key={box.boxName} name={box.boxName} contents={box.contents}/>);
			}
			return null;
		})

		return (boxesToShow);
	}

	render() {
		return (
			<div className="App">
				<Title />

				<section className="how-to text-center" id="how-to-section">
					<div className="container">
						<h2>How to use:</h2>
						<p>Select any items that you want to buy and you will automatically be shown whether or not you'll be saving Pok&eacute;coins by purchasing a box.</p>
					</div>
				</section>

				<SelectionList checkboxes={this.state.checkboxes} onSelectedChange={this.onAppChange}/>

				<section className="berry-troll">
					<div className="container">
						<h2 className="text-center">Seriously?!</h2>
						<p className="text-center">You actually want to spend money on berries... Really?! No. Just... no. Go out and spin some Pok&eacutestops ya lazy bum!!!</p>
					</div>
				</section>

				<section className="boxes-section">
					<div className="container">
						<h2 className="worth-title">Is the box worth it?</h2>
						<p className="expand-text align-middle text-center">Click a box to expand.</p>
						<div className="boxes-wrapper row justify-content-center">
							{this.renderPokeboxes()}
						</div>
					</div>
				</section>

				<section className="star-piece-disclaimer">
					<div className="container">
						<p>Note: Since star pieces can't be bought individually in the shop, we have assigned the same cost of 80 Pokécoins as other 30 minute items (Lucky Eggs/Incenses). This is to prevent skewing calculations by thinking a valuable item is "free".</p>
					</div>
				</section>

			</div>
		);
	}
}

export default App;
