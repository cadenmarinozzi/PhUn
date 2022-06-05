import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import SimulationPage from './Components/SimulationPage';
import { Routes, Route } from 'react-router-dom';
import './fonts.js';
import './App.scss';
import { Component, createRef } from 'react';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			link: createRef(),
			simulationName: null,
		};
	}
	render() {
		return (
			<>
				<Navbar />

				<Routes>
					<Route
						path="/"
						element={
							<HomePage
								setSimulationState={this.setState.bind(this)}
								simulationName={this.state.simulationName}
							/>
						}
					/>
					<Route
						path="/PhUn"
						element={
							<HomePage
								setSimulationState={this.setState.bind(this)}
								simulationName={this.state.simulationName}
							/>
						}
					/>
					<Route
						path="/simulation"
						element={
							<SimulationPage
								simulationName={this.state.simulationName}
							/>
						}
					/>
					<Route
						path="/PhUn/simulation"
						element={
							<SimulationPage
								simulationName={this.state.simulationName}
							/>
						}
					/>
				</Routes>
			</>
		);
	}
}

export default App;
