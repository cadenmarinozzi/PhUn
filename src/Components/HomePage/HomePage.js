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
import PerlinNoise from '../PerlinNoise';
import VectorField from '../VectorField';
import Mandelbrot from '../Mandelbrot';

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
							between the control points to create a smooth curve. 
							A quadratic bezier curve, a curve with 3 control points, 
							is defined with the following equation: 
							$x_{\tiny1}+(1-t)^2(x_{\tiny1}-x_{\tiny0})+2t(x_{\tiny2}-x_{\tiny1})$
							where $t$ is the parameter that determines the position
							of the curve on the curve, and $x_{\tiny0}, x_{\tiny1}, x_{\tiny2}$ are the control points.
							$t$ is of the range $0\leq t\leq 1$.
							">
					<BezierCurves />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Meta Balls"
					description="Meta Balls are isosurfaces of n-dimensional space. 
						They work by creating a set of points that lie on the surface
						of the space and then using these points to create a
						smooth curve.
						The fundemental equation for a meta ball is:
						$r/d^2$
						where $r$ is the radius of the ball, and $d$ is the distance from the center of the ball to a pixel.
						Each pixel is then assigned a value based on the distance from the center of the ball to the pixel.
						For each pixel on the screen we sum the values of each meta ball, which is what creates the smooth interpolation between close meta balls.
						">
					<MetaBalls />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="N-Body"
					description="An N-Body simulation uses a set of
						particles to simulate the motion of bodies in space.
						N-bodies use Newton's laws of motion to calculate the
						forces acting on each body.
						Each body is attracted to every other body with Newton's universal law of gravitation: 
						$F_g=G {mM\over r^2}$ where $G$ is the gravitational constant $6.67408e^{-11}$, 
						$m$ and $M$ are the masses of the bodies,
						and $r$ is the distance between the bodies.
						Also, in the distance function, a softening parameter, $ϵ$, is used to prevent bodies ontop of each other having a NaN force. This can be any value greater than 0, but larger values will result in less realistic simulations.
						Next, Newton's law of motion is used to calculate the force acting on each body: $F=m/a$ where $m$ is the mass of the body, $a$ is the acceleration, and $F$ is the force acting on the body. 
						The acceleration is then calculated, $a=F/m$,
						The velocity is then calculated, $v=a*dt$ where $dt$ is the time step.
						And finally the position is calculated, $x=v*dt$ where $dt$ is the time step.
						">
					<NBody />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Riemann Sum"
					description="The Riemann Sum is a mathematical function that is used to approximate the area under a curve.
							The Riemann Sum is a function that is defined by a function $f(x)$ and a set of intervals $[a,b]$
							where $a$ and $b$ are the endpoints of the interval.
							The Riemann Sum is then calculated by summing the area of each interval,
							and then dividing the sum by the width of the interval.
							A Riemann Sum is defined by the following equation:
							$\displaystyle\sum_{i=1}^n f(x_{\tiny i})\Delta{x_{\tiny i}}$
							where $x_{\tiny i}$ is the endpoint of the interval, and $n$ is the number of intervals.
							">
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

				<GridCard
					onClick={handleClick}
					title="Perlin Noise"
					description="Perlin Noise is a random noise function that is used to create smooth textures and patterns.">
					<PerlinNoise />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Vector Field"
					description="A Vector Field is a grid of vectors, each of which have a position, a direction, and a magnitude.">
					<VectorField />
				</GridCard>

				<GridCard
					onClick={handleClick}
					title="Mandelbrot"
					description="Mandelbrot is a fractal that is used to create a set of points that lie on the surface of the Mandelbrot set. The Mandelbrot set is a set of points that lie on the surface of a plane that is defined by a function. The function is defined by the following equation: $z_{\tiny1}=z_{\tiny0}^2+c$ where $z_{\tiny1}$ is the new value of the point, $z_{\tiny0}$ is the old value of the point, and $c$ is the constant that is added to the function.
						The function is then iterated until the value of the point is greater than 2, which is the escape value.
						The escape value is then used to determine the color of the point.
					">
					<Mandelbrot />
				</GridCard>
			</Grid>
		</div>
	);
}

export default HomePage;
