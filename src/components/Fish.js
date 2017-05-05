import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.PureComponent {
  render() {
    const {
		image,
		name,
		price,
		desc,
		status,
		index
	} = this.props;

	const isAvailable = status === 'available';
	const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';

    return(
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{ formatPrice(price) }</span>
        </h3>
        <p>{desc}</p>
        <button
			disabled={!isAvailable}
			onClick={this.props.addToOrder.bind(this, index)}
		>{ buttonText }</button>
      </li>
    )
  }
}

Fish.propTypes = {
	image: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	price: React.PropTypes.number.isRequired,
	desc: React.PropTypes.string.isRequired,
	status: React.PropTypes.string.isRequired,
	index: React.PropTypes.string.isRequired,
	addToOrder: React.PropTypes.func.isRequired
}

export default Fish;
