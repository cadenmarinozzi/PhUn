import { Component, createRef } from 'react';

class Mandelbrot extends Component {
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

		let offsetX = 0;
		let offsetY = 0;

		function resize(shouldDraw) {
			width = canvas.parentElement.clientWidth;
			height = canvas.parentElement.clientHeight;

			canvas.width = width;
			canvas.height = height;

			if (shouldDraw) draw(offsetX, offsetY);
		}

		resize();
		window.addEventListener('resize', resize.bind(true));

		function draw(offsetX, offsetY) {
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					let x0 = -2 + (x / width) * 4 + offsetX;
					let y0 = -1 + (y / height) * 2 + offsetY;
					let x1 = 0;
					let y1 = 0;
					let i = 0;

					while (x1 * x1 + y1 * y1 < 4 && i < 25) {
						let xtemp = x1 * x1 - y1 * y1 + x0;
						y1 = 2 * x1 * y1 + y0;
						x1 = xtemp;
						i++;
					}

					ctx.fillStyle = i === 25 ? 'black' : 'white';
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}

		canvas.addEventListener('click', function (e) {
			offsetX = e.offsetX / width;
			offsetY = e.offsetY / height;

			draw(offsetX, offsetY);
		});

		draw(0, 0);
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref} />
			</div>
		);
	}
}

export default Mandelbrot;
