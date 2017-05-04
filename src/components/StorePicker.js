import React from 'react';
import { getFunName } from '../helpers';

/*
 * @class StorePicker
 * @extends {React.Component}
 */
class StorePicker extends React.Component {

	static contextTypes = {
	  router: React.PropTypes.object
	}

	/**
	 * Rendered component reference
	 * @type {Object}
	 */
	domRefs = {};

  goToStore(event) {
	event.preventDefault();
	// console.log('You Changed the React URL');
	// first grab the text from the box
	// console.log(this.storeInput.value);
	const storeId = this.domRefs.input.value;
	// // second we're going to transition from / to /store:storeId
	this.context.router.transitionTo(`/store/${storeId}`);
  }

	/**
	 * [saveRefs description]
	 * @param  {[type]} name [description]
	 * @param  {[type]} ref  [description]
	 * @return {[type]}      [description]
	 */
	saveRefs(name, ref) {
	  this.domRefs[name] = ref;
	}

	/**
	 * React method.
	 * Return a single React element.
	 * This element can be either a representation of a native DOM component,
	 * such as <div />, or another composite component that you've defined yourself.
	 * You can also return null or false to indicate that you don't want anything rendered.
	 * When returning null or false, ReactDOM.findDOMNode(this) will return null.
	 * @protected
	 * @method render
	 * @return {Object} A representation of a native DOM component
	 */
	render() {
		return (
		<form
			className="store-selector"
			onSubmit={this.goToStore.bind(this)}
		>
			<h2>Please Enter A Store</h2>
			<input
				type="text"
				required
				placeholder="Store Name"
				defaultValue={getFunName()}
				// ref={(input) => { this.storeInput = input}}
				ref={this.saveRefs.bind(this, 'input')}
			/>
			<button
				type="submit"
			>
				Visit Store
			</button>
		</form>
	)
  }
}

export default StorePicker;
