import './Navbar.scss';
import '../../fonts.js';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<div className="navbar-container">
				<Link to="/PhUn">
					<h1 className="navbar-title">PhUn</h1>
				</Link>

				<div>
					<Link to="/">
						<span className="material-symbols-outlined">home</span>
					</Link>

					<Link to="/PhUn/simulation">
						<span className="material-symbols-outlined">
							build_circle
						</span>
					</Link>
				</div>
			</div>
		);
	}
}

export default Navbar;
