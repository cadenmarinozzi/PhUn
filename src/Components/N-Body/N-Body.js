import { Component, createRef } from 'react';

class NBody extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ref: createRef(),
		};
	}

	componentDidMount() {
		let width;
		let height;

		let canvas = this.state.ref.current;
		let ctx = canvas.getContext('2d');

		function resize() {
			width = canvas.parentElement.clientWidth;
			height = canvas.parentElement.clientHeight;

			canvas.width = width;
			canvas.height = height;
		}

		resize();
		window.addEventListener('resize', resize);

		function circle(x, y, radius, filled = true) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.closePath();

			if (filled) {
				ctx.fill();

				return;
			}

			ctx.stroke();
		}

		const particles = [];
		const G = 6.67408e-11;
		const dt = 1000;

		for (let i = 0; i < 100; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: 0,
				vy: 0,
				mass: Math.random() * 1000,
			});
		}

		function update() {
			for (const particle of particles) {
				let xForce = 0;
				let yForce = 0;

				for (const other of particles) {
					if (particle === other) {
						continue;
					}

					const xDist = other.x - particle.x;
					const yDist = other.y - particle.y;

					const dist = Math.sqrt(
						xDist * xDist + yDist * yDist + 1e-10
					);
					const Fg = (G * particle.mass * other.mass) / (dist * dist);

					xForce += xDist * Fg;
					yForce += yDist * Fg;
				}

				const ax = xForce / particle.mass;
				const ay = yForce / particle.mass;
				particle.vx += ax * dt;
				particle.vy += ay * dt;

				if (particle.x <= 0 || particle.x >= width) {
					particle.vx = -particle.vx;
				}

				if (particle.y <= 0 || particle.y >= height) {
					particle.vy = -particle.vy;
				}

				particle.x += particle.vx * dt;
				particle.y += particle.vy * dt;
			}
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (const particle of particles) {
				circle(particle.x, particle.y, particle.mass / 400);
			}
		}

		function animate() {
			draw();
			update();

			requestAnimationFrame(animate);
		}

		animate();

		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', (e) => {
			mouseDown = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (!mouseDown || particles.length > 500) return;

			particles.push({
				x: e.offsetX,
				y: e.offsetY,
				vx: 0,
				vy: 0,
				mass: Math.random() * 1000,
			});
		});
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref}></canvas>
			</div>
		);
	}
}

export default NBody;
