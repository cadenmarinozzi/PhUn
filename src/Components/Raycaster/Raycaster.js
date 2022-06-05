import { Component, createRef } from 'react';

class Raycaster extends Component {
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

		function resize(shouldDraw) {
			width = canvas.parentElement.clientWidth;
			height = canvas.parentElement.clientHeight;

			canvas.width = width;
			canvas.height = height;

			if (shouldDraw) draw();
		}

		window.addEventListener('resize', resize.bind(true));

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let x = 0; x < width; x += 3) {
				for (let y = 0; y < height; y += 3) {
					for (const point of points) {
						const xDist = x - point.x;
						const yDist = y - point.y;
						const zDist = point.z;

						const dist = Math.sqrt(
							xDist * xDist + yDist * yDist + zDist * zDist
						);

						if (dist < point.radius) {
							// color from ligt direction
							const light =
								1.2 *
								Math.sqrt(
									xDist * xDist +
										yDist * yDist +
										zDist * zDist
								);
							const color = light;
							ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
							ctx.fillRect(x, y, 3, 3);
						}
					}
				}
			}
		}

		resize();

		const points = [
			{ x: 170, y: 100, z: 5, radius: 30 },
			{
				x: width / 2,
				y: height / 2,
				z: 20,
				radius: 50,
			},
			{
				x: width / 2 + 60,
				y: height / 2,
				z: 0,
				radius: 50,
			},
		];

		draw();

		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', () => {
			mouseDown = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (!mouseDown) return;

			const x = e.offsetX;
			const y = e.offsetY;

			for (const point of points) {
				const xDist = x - point.x;
				const yDist = y - point.y;
				const zDist = point.z;

				const dist = Math.sqrt(
					xDist * xDist + yDist * yDist + zDist * zDist
				);

				if (dist < point.radius) {
					point.x = x;
					point.y = y;

					break;
				}
			}

			draw();
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

export default Raycaster;
