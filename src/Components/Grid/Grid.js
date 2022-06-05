import './Grid.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class GridCard extends Component {
	handleClick() {
		this.props.onClick(this.props.title, this.props.description);
	}

	render() {
		return (
			<div className="grid-card">
				<div className="grid-card-content">
					<div className="grid-card-header">
						<h2>{this.props.title}</h2>

						<Link to="/PhUn/simulation">
							<Button onClick={this.handleClick.bind(this)}>
								View
							</Button>
						</Link>
					</div>

					{this.props.children}

					<h4>{this.props.description}</h4>
				</div>
			</div>
		);
	}
}

class Grid extends Component {
	render() {
		return <div className="grid-container">{this.props.children}</div>;
	}
}

export { Grid, GridCard };
