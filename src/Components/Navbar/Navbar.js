import './Navbar.scss';
import '../../fonts.js';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<div className="navbar-container">
				<Link to="/">
					<h1 className="navbar-title">PhUn</h1>
				</Link>

				<div>
					<Link to="/">
						<span className="material-symbols-outlined">home</span>
					</Link>

					<Link to="/simulation">
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
