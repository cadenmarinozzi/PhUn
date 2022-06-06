import { Component, createRef } from 'react';

class PerlinNoise extends Component {
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

		class ClassicalNoise {
			constructor(r) {
				// Classic Perlin noise in 3D, for comparison
				if (r === undefined) r = Math;
				this.grad3 = [
					[1, 1, 0],
					[-1, 1, 0],
					[1, -1, 0],
					[-1, -1, 0],
					[1, 0, 1],
					[-1, 0, 1],
					[1, 0, -1],
					[-1, 0, -1],
					[0, 1, 1],
					[0, -1, 1],
					[0, 1, -1],
					[0, -1, -1],
				];
				this.p = [];
				for (var i = 0; i < 256; i++) {
					this.p[i] = Math.floor(r.random() * 256);
				}
				// To remove the need for index wrapping, double the permutation table length
				this.perm = [];
				for (var i = 0; i < 512; i++) {
					this.perm[i] = this.p[i & 255];
				}
			}
		}

		ClassicalNoise.prototype.dot = function (g, x, y, z) {
			return g[0] * x + g[1] * y + g[2] * z;
		};

		ClassicalNoise.prototype.mix = function (a, b, t) {
			return (1.0 - t) * a + t * b;
		};

		ClassicalNoise.prototype.fade = function (t) {
			return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
		};

		ClassicalNoise.prototype.noise = function (x, y, z) {
			var X = Math.floor(x);
			var Y = Math.floor(y);
			var Z = Math.floor(z);
			x = x - X;
			y = y - Y;
			z = z - Z;
			X = X & 255;
			Y = Y & 255;
			Z = Z & 255;
			var gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
			var gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
			var gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
			var gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
			var gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
			var gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
			var gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
			var gi111 =
				this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
			var n000 = this.dot(this.grad3[gi000], x, y, z);
			var n100 = this.dot(this.grad3[gi100], x - 1, y, z);
			var n010 = this.dot(this.grad3[gi010], x, y - 1, z);
			var n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z);
			var n001 = this.dot(this.grad3[gi001], x, y, z - 1);
			var n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1);
			var n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1);
			var n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1);
			// Compute the fade curve value for each of x, y, z
			var u = this.fade(x);
			var v = this.fade(y);
			var w = this.fade(z);
			// Interpolate along x the contributions from each of the corners
			var nx00 = this.mix(n000, n100, u);
			var nx01 = this.mix(n001, n101, u);
			var nx10 = this.mix(n010, n110, u);
			var nx11 = this.mix(n011, n111, u);
			// Interpolate the four results along y
			var nxy0 = this.mix(nx00, nx10, v);
			var nxy1 = this.mix(nx01, nx11, v);
			// Interpolate the two last results along z
			var nxyz = this.mix(nxy0, nxy1, w);

			return nxyz;
		};

		let perlinNoise = new ClassicalNoise();
		let ofx = 0;
		let ofy = 0;

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let x = 0; x < width; x += 3) {
				for (let y = 0; y < height; y += 3) {
					let z = perlinNoise.noise(x / 50 + ofx, y / 50 + ofy, 0);
					let color = 255 - z * 255;
					ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
					ctx.fillRect(x, y, 3, 3);
				}
			}
		}

		draw();

		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', (e) => {
			mouseDown = false;
		});

		canvas.addEventListener('mousemove', function (e) {
			if (!mouseDown) {
				return;
			}

			ofx = (e.offsetX / width) * Math.PI * 2;
			ofy = (e.offsetY / width) * Math.PI * 2;

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

export default PerlinNoise;
