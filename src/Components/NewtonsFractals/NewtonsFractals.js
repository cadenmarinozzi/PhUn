import { Component, createRef } from 'react';

class NewtonsFractals extends Component {
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

		class Cnum {
			constructor(real, imaginary) {
				this.real = real;
				this.imaginary = imaginary;
			}

			add(b) {
				let newA = this.real + b.real;
				let newB = this.imaginary + b.imaginary;

				return new Cnum(newA, newB);
			}

			sub(b) {
				let newA = this.real - b.real;
				let newB = this.imaginary - b.imaginary;

				return new Cnum(newA, newB);
			}

			mul(b) {
				let newA = this.real * b.real - this.imaginary * b.imaginary;
				let newB = this.imaginary * b.real + this.real * b.imaginary;

				return new Cnum(newA, newB);
			}

			div(b) {
				let denominator = b.real * b.real + b.imaginary * b.imaginary;
				let newA =
					(this.real * b.real + this.imaginary * b.imaginary) /
					denominator;
				let newB =
					(this.imaginary * b.real - this.real * b.imaginary) /
					denominator;

				return new Cnum(newA, newB);
			}
		}

		function f(x) {
			return x.mul(x).mul(x).sub(new Cnum(1, 0));
		}

		function fPrime(x) {
			return new Cnum(3, 0).mul(x).mul(x);
		}

		function newtonsMethod(x) {
			return x.sub(f(x).div(fPrime(x)));
		}

		let maxIterations = 20;
		let scale = 250;
		let error = 0.01;
		let xPos = 0;
		let yPos = 0;
		let centerX = width / 2;
		let centerY = height / 2;

		function draw() {
			centerX = width / 2;
			centerY = height / 2;

			for (let x = -centerX; x < centerX; x++) {
				for (let y = -centerY; y < centerY; y++) {
					let scaled = new Cnum(
						(x + xPos) / scale,
						(y + yPos) / scale
					);
					let zero = newtonsMethod(scaled);
					let x1 = newtonsMethod(zero);
					let iterations = 0;

					while (
						Math.abs(x1.real - zero.real) > error &&
						iterations < maxIterations
					) {
						zero = x1;
						x1 = newtonsMethod(x1);
						iterations++;
					}

					const color = iterations * 10;

					ctx.fillStyle = `rgb(${color}, ${color} , ${color})`;
					ctx.fillRect(x + centerX, y + centerY, 1, 1);
				}
			}
		}

		draw();

		canvas.addEventListener('mousedown', (e) => {
			xPos = e.offsetX - centerX;
			yPos = e.offsetY - centerY;
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

export default NewtonsFractals;
