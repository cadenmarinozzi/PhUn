import { Component } from 'react';
import './Button.scss';

class Button extends Component {
	handleClick() {
		if (!this.props.onClick) return;

		this.props.onClick();
	}

	render() {
		return (
			<button className="button" onClick={this.handleClick.bind(this)}>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
