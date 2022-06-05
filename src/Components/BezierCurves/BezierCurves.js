import { Component, createRef } from 'react';

class BezierCurves extends Component {
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

		function line(x1, y1, x2, y2) {
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
		}

		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', () => {
			mouseDown = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (mouseDown) {
				controlPoint.x = e.offsetX;
				controlPoint.y = e.offsetY;
				draw();
			}
		});

		function draw() {
			ctx.clearRect(0, 0, width, height);
			circle(controlPoint.x, controlPoint.y, 5, false);

			points.forEach((point) => {
				circle(point.x, point.y, 5);
			});

			let lastPoint;

			for (let t = 0; t < 1; t += 0.1) {
				const x =
					(1 - t) ** 2 * points[0].x +
					2 * (1 - t) * t * controlPoint.x +
					t ** 2 * points[1].x;
				const y =
					(1 - t) ** 2 * points[0].y +
					2 * (1 - t) * t * controlPoint.y +
					t ** 2 * points[1].y;

				if (lastPoint) {
					line(lastPoint.x, lastPoint.y, x, y);
				} else {
					ctx.fillRect(x, y, 1, 1);
				}

				lastPoint = { x, y };
			}
		}

		resize();

		const points = [
			{ x: 10, y: 5 },
			{ x: width - 10, y: height / 2 },
		];

		const controlPoint = { x: width / 2 - 50, y: height / 2 + 50 };

		draw();
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref} />
			</div>
		);
	}
}

export default BezierCurves;
