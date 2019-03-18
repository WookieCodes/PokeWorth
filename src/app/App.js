import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Title from '../title/title';
import SelectionList from '../selection-list/selection-list';
import PokeBox from '../pokebox/pokebox';

class App extends Component {
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

        <SelectionList boxNames={["Raid Passes", "Super Incubators", "Egg Incubators", "Lucky Eggs", "Star Pieces", "Incenses", "Lure Modules", "Berries"]}/>
        
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
              <PokeBox name="Special" contents=
              /* Raid Passes, Super Incs, Egg Incs, Eggs, Star Pieces, Incenses, Lures, Berries */
              {[ 4,           0,          1,        3,    0,           0,        0,     0]}/>
              <PokeBox name="Great" contents=
              {[ 6,           2,          0,        3,    4,           0,        0,     0]}/>
              <PokeBox name="Ultra" contents=
              {[ 15,          6,          0,        0,    8,           7,        0,     0]}/>
              <PokeBox name="Adventure" contents=
              {[ 0,           11,         5,        0,    8,           7,        0,     0]}/>
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
