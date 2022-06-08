import { Component, createRef } from 'react';

class MetaBalls extends Component {
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
		ctx.fillStyle = `black`;

		function resize() {
			width = canvas.parentElement.clientWidth;
			height = canvas.parentElement.clientHeight;

			canvas.width = width;
			canvas.height = height;
		}

		resize();
		window.addEventListener('resize', resize);

		const points = [
			{
				x: Math.random() * width,
				y: Math.random() * height,
				vx: Math.random() * 2 - 1,
				vy: Math.random() * 2 - 1,
			},
			{
				x: Math.random() * width,
				y: Math.random() * height,
				vx: Math.random() * 2 - 1,
				vy: Math.random() * 2 - 1,
			},
		];

		let selectedPoint;

		function update() {
			for (let i = 0; i < points.length; i++) {
				const point = points[i];

				if (selectedPoint === point) continue;

				if (point.x + 50 > width || point.x - 50 < 0) {
					point.vx = -point.vx;
				}

				if (point.y + 50 > height || point.y - 50 < 0) {
					point.vy = -point.vy;
				}

				point.x += point.vx;
				point.y += point.vy;
			}
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let x = 0; x < width; x += 2) {
				for (let y = 0; y < height; y += 2) {
					let sum = 0;

					for (const point of points) {
						const xDist = x - point.x;
						const yDist = y - point.y;

						const dist = Math.sqrt(xDist * xDist + yDist * yDist);
						const recipDist = 900 / (dist * dist);

						sum += 200 * recipDist;
					}

					if (sum < 100) continue;

					ctx.fillRect(x, y, 2, 2);
				}
			}
		}

		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', () => {
			mouseDown = false;
			selectedPoint = null;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (mouseDown) {
				// move the closest point
				const closestPoint = points.reduce(
					(prev, curr) => {
						const prevDist = Math.sqrt(
							(prev.x - e.offsetX) * (prev.x - e.offsetX) +
								(prev.y - e.offsetY) * (prev.y - e.offsetY)
						);
						const currDist = Math.sqrt(
							(curr.x - e.offsetX) * (curr.x - e.offsetX) +
								(curr.y - e.offsetY) * (curr.y - e.offsetY)
						);

						return prevDist < currDist ? prev : curr;
					},
					{ x: 0, y: 0 }
				);

				selectedPoint = closestPoint;
				closestPoint.x = e.offsetX;
				closestPoint.y = e.offsetY;
			}
		});

		function animate() {
			draw();
			update();
			requestAnimationFrame(animate);
		}

		animate();
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref}></canvas>
			</div>
		);
	}
}

export default MetaBalls;
