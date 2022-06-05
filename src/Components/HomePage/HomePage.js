import './HomePage.scss';
import { Gradient } from 'react-gradient';
import { Grid, GridCard } from '../Grid';
import BezierCurves from '../BezierCurves';
import MetaBalls from '../MetaBalls';
import NBody from '../N-Body';
import RiemannSum from '../RiemannSum';
import Raycaster from '../Raycaster';
import { useCookies } from 'react-cookie';
import NewtonsFractals from '../NewtonsFractals';
import GameOfLife from '../GameOfLife';
import ClothSimulation from '../ClothSimulation';

function HomePage(props) {
	let [cookies, setCookie] = useCookies(['user']);

	function handleClick(title, description) {
		props.setSimulationState({
			simulationName: title,
			simulationDescription: description,
		});

		setCookie('simulationName', title, { path: '/' });
		setCookie('simulationDescription', description, { path: '/' });
	}

	return (
		<div className="home-page">
			<h4>
				<i>welcome to</i>
			</h4>

			<i>
				<Gradient
					gradients={[
						['#8a80ff', '#80ffb9'],
						['#ff808d', '#80bdff'],
					]}
					angle="30deg"
					element="h1"
					className="title"
					property="text"
					duration={3000}>
					PhUn
				</Gradient>
			</i>

			<Grid>
				<GridCard
					onClick={handleClick}
					title="Bezier Curves"
					description="Bezier curves are a type of mathematical curve that is
							defined by a set of points, called control points, that
							define the shape of the curve. It works by interpolating
							between the control points to create a smooth curve.">
					<BezierCurves />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Meta Balls"
					description="Meta Balls are isosurfaces of n-dimensional space. They
						work by creating a set of points that lie on the surface
						of the space and then using these points to create a
						smooth curve.">
					<MetaBalls />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="N-Body"
					description="An N-Body simulation is a simulation that uses a set of
						particles to simulate the motion of bodies in space.
						N-bodies use Newton's laws of motion to calculate the
						forces acting on each body.">
					<NBody />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Riemann Sum"
					description="A Riemann sum is a sum of intervals. It is used to find
						the area under a curve.">
					<RiemannSum />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Raycasting"
					description="Raycasting is a rendering method where rays are shot from the camera to each pixel on the screen, and the pixel is colored based on if the ray hit or not.">
					<Raycaster />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Game Of Life"
					description="Game Of Life is a cellular automation game created by John Conway. It simulates life by using a grid of cells and a few rules each cell has to abide by.">
					<GameOfLife />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Newtons Fractals"
					description="Newtons Fractals uses Newtons method to find the roots of a function, and then plots the path to those roots, creating a beautiful rendering.">
					<NewtonsFractals />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Cloth Simulation"
					description="Cloth Simulations emulate real world physics to simulate the structure and motion of a cloth.">
					<ClothSimulation />
				</GridCard>
			</Grid>
		</div>
	);
}

export default HomePage;
