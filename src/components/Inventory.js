import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

	handleChange(key, e) {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name]: [e.target.value]
		}
		this.props.updateFish(key, updatedFish);
	}

	renderInventory(key){
		const fish = this.props.fishes[key];


		return(
			<div
				className="fish-edit"
				key={key}
			>
				<input
					type="text"
					name="name"
					placeholder="Fish Name"
					value={fish.name}
					onChange={this.handleChange.bind(this, key)}
				/>
				<input
					type="text"
					name="price"
					placeholder="Fish Price"
					value={fish.price}
					onChange={this.handleChange.bind(this, key)}
				/>
				<select
					name="status"
					placeholder="Fish Status"
					value={fish.status}
					onChange={this.handleChange.bind(this, key)}
				>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea
					name="desc"
					placeholder="Fish Desc"
					value={fish.desc}
					onChange={this.handleChange.bind(this, key)}
				>

				</textarea>
				<input
					type="text"
					name="image"
					placeholder="Fish Image"
					value={fish.image}
					onChange={this.handleChange.bind(this, key)}
				/>
				<button onClick={this.props.removeFish.bind(this, key)}>Remove Fish</button>
			</div>
		);
	}

	render() {

		const fishes = Object.keys(this.props.fishes);

		return(
			<div>
				<h2>Inventory</h2>
				{fishes.map(this.renderInventory.bind(this))}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

export default Inventory;
