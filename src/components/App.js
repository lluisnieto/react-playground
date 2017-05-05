import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import sampleFishes2 from '../sample-fishes-2';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

	state = {
		fishes: {},
      	order: {}
	}

	componentWillMount() {

		this.ref = base.syncState(this.props.params.storeId + `/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish(fish) {
		// update our state
		const fishes = {
			...this.state.fishes
		};

		// add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		// set state
		this.setState({
			fishes: fishes
		});
	}

	loadSamples() {

		const rand =  Math.floor(Math.random() * (1 - 0 + 1)) + 0;
		const newFishes = rand === 0 ? sampleFishes : sampleFishes2;

		this.setState({
		  fishes: newFishes
		});
	}

	renderFishes() {
		return Object.keys(this.state.fishes).map((key) => {
		  return (
			  <Fish
				  key={key}
				  index={key}
				  addToOrder={this.addToOrder.bind(this)}
				  {...this.state.fishes[key]}
			  />
		  );
		});
	}

  addToOrder(key) {
	  // take a copy of our state
	  const order = {...this.state.order};
	  // update or add the new number of fish ordered
	  order[key] = order[key] + 1 || 1;
	  // update our state
	  this.setState({ order: order });
  }

  render() {
    console.log('this', this);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={
            this.props.params.storeId
          } />
          <ul className="list-of-fishes">
            {this.renderFishes()}
          </ul>
        </div>

        <Order
			fishes={ this.state.fishes }
			order={ this.state.order }
		/>
        <Inventory
			addFish={this.addFish.bind(this)}
			loadSamples={this.loadSamples.bind(this)}
		/>
      </div>
    )
  }
}

export default App;
