import { Component, createRef } from 'react';

class FluidSimulation extends Component {
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
		}

		resize();
		window.addEventListener('resize', resize.bind(true));

		let particles = [];

		let tdelta = 0.01;
		let touchradius = 1000;
		let touchradius2 = 1000 * 1000;
		let GRAVITYX = 0;
		let GRAVITYY = 0.5;
		let touches = [{ x: 140, y: 0, down: false }];

		class Particle {
			constructor(x, y) {
				this.x = x;
				this.y = y;
				this.gx = 0;
				this.gy = 0;
				this.vx = 0;
				this.vy = 0;
				this.fx = 0;
				this.fy = 0;
				this.density = 0;
				this.pressure = 0;
			}

			update() {
				var time = tdelta / 0.064;

				for (var i in touches) {
					var t = touches[i];
					if (t.down) {
						var dist =
							Math.abs(this.x - t.x) * Math.abs(this.x - t.x) +
							Math.abs(this.y - t.y) * Math.abs(this.y - t.y);

						if (dist < touchradius * 2) {
							var dx = this.x - t.x;
							var dy = this.y - t.y;

							var fx = 1.0 - Math.abs(dx) / touchradius2;
							var fy = 1.0 - Math.abs(dy) / touchradius2;
							if (fx > 0 && fx <= 1) {
								fx *= dx < 0 ? -1 : 1;

								this.vx = 0.8 * fx * 5 + this.vx * 0.3;
							}

							if (fy > 0 && fy <= 1) {
								fy *= dy < 0 ? -1 : 1;
								this.vy = 0.5 * fy * 5 + this.vy * 0.5;
							}
						}
					}
				}

				this.vy += GRAVITYY;
				this.vx += GRAVITYX;
				this.vx += this.fx;
				this.vy += this.fy;
				this.x += this.vx * time;
				this.y += this.vy * time;
				if (this.x < 5) this.vx += (5 - this.x) * 0.5 - this.vx * 0.5;
				if (this.y < 5) this.vy += (5 - this.y) * 0.5 - this.vy * 0.5;
				if (this.x > width)
					this.vx += (width - this.x) * 0.5 - this.vx * 0.5;
				if (this.y > height)
					this.vy += (height - this.y) * 0.5 - this.vy * 0.5;
			}
		}

		for (var i = 0; i < 100; i++) {
			particles.push(
				new Particle(Math.random() * width, Math.random() * height)
			);
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (const p of particles) {
				ctx.fillRect(p.x, p.y, 5, 5);
			}
		}

		function update() {
			for (const p of particles) {
				p.update();
			}
		}

		function animate() {
			draw();
			update();
			setTimeout(animate, 100);
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

export default FluidSimulation;
