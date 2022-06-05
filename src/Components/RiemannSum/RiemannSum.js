import { Component, createRef } from 'react';

class RiemannSum extends Component {
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

		function line(x1, y1, x2, y2) {
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
		}

		let dx = 10;
		let phase = 0;
		let lastPoint;

		function draw() {
			ctx.clearRect(0, 0, width, height);
			lastPoint = null;

			for (let x = 0; x < width; x++) {
				const y = height - 50 * Math.sin(x / 50 + phase) - 51;
				if (lastPoint) {
					line(lastPoint.x, lastPoint.y, x, y);
				} else {
					ctx.fillRect(x, y, 1, 1);
				}

				lastPoint = { x, y };

				if (x % dx === 0) {
					ctx.fillRect(x, y, dx, height);
				}
			}
		}

		let mouseDown;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', () => {
			mouseDown = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (!mouseDown) return;

			phase = (e.offsetX / width) * Math.PI * 2;
			draw();
		});

		draw();
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref}></canvas>
			</div>
		);
	}
}

export default RiemannSum;
