import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {

	composeOrder(prevTotal, key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === 'available';
		if(isAvailable){
			return prevTotal + (count * fish.price || 0)
		}
		return prevTotal;
	}

	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removeButton = <button onClick={ this.props.removeFromOrder.bind(this, key)}>&times;</button>

		if(!fish || fish.status === 'unavailable') {
			return <li key={key}>Sorry, {fish ? fish.name : ''} is no longer available! {removeButton}</li>
		}

		return (
			<li key={key}>
				<span>{count}lbs {fish.name}</span>
				<span className="price">{formatPrice(count * fish.price)} {removeButton}</span>
			</li>
		)
	}

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce(this.composeOrder.bind(this), 0);

		return(
			<div className="order-wrap">
				<h2>Your Order</h2>
				<ul className="order">
					{orderIds.map(this.renderOrder.bind(this))}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>

			</div>
		)
	}
}

export default Order;
