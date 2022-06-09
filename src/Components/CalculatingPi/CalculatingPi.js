import { Component, createRef } from 'react';

class CalculatingPi extends Component {
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

		resize();
		window.addEventListener('resize', resize.bind(true));

		let g = 9.81;
		let dt = 1;
		let m = 1;

		let objects = [
			{
				x: 20,
				y: height / 2,
				vx: 0,
				size: 50,
				m: m,
			},
			{
				x: width - 50,
				y: height / 2,
				vx: -2,
				size: 20,
				m: 100 ** 4 * m,
			},
		];

		let pi = 0;

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let i = 0; i < objects.length; i++) {
				let obj = objects[i];

				ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
			}
		}

		function update() {
			let obj = objects[0];
			let obj2 = objects[1];

			obj.x += obj.vx * dt;
			obj2.x += obj2.vx * dt;

			if (obj.x <= 0) {
				obj.vx = -obj.vx;
			}

			if (obj2.x <= 0) {
				obj2.vx = -obj2.vx;
			}

			if (obj.x >= width - obj.size) {
				obj.vx = -obj.vx;
			}

			if (obj2.x >= width - obj2.size) {
				obj2.vx = -obj2.vx;
			}

			// check collision between obj and obj2
			if (!(obj.x + obj.size < obj2.x || obj.x > obj2.x + obj2.size)) {
				obj.vx =
					((obj.m - obj2.m) / (obj.m + obj2.m)) * obj.vx +
					((2 * obj2.m) / (obj.m + obj2.m)) * obj2.vx;

				obj2.vx =
					((obj.m - obj2.m) / (obj2.m + obj.m)) * obj2.vx +
					((2 * obj.m) / (obj2.m + obj.m)) * obj.vx;

				pi++;
			}

			// write pi to the screen
			ctx.fillText(pi, width / 2, height / 2);
		}

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
				<canvas ref={this.state.ref} />
			</div>
		);
	}
}

export default CalculatingPi;
