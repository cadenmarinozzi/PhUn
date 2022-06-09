import { Component, createRef } from 'react';

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	const viewSize = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight
	);

	return !(rect.bottom < 0 || rect.top - viewSize >= 0);
}

class VectorField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ref: createRef(),
			inViewport: false,
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

		let vectors = [];
		let spacing = 30;

		for (let x = 0; x < width; x += spacing) {
			for (let y = 0; y < height; y += spacing) {
				let vector = {
					dx: Math.random() * 20 - 10,
					dy: Math.random() * 20 - 10,
					addx: 0,
					addy: 0,
					x: x,
					y: y,
				};

				vectors.push(vector);
			}
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let i = 0; i < vectors.length; i++) {
				let vector = vectors[i];
				let tox = vector.x + vector.dx + vector.addx;
				let toy = vector.y + vector.dy + vector.addy;
				let angle = Math.atan2(toy - vector.y, tox - vector.x);

				ctx.beginPath();
				ctx.moveTo(vector.x, vector.y);
				ctx.lineTo(tox, toy);

				ctx.lineTo(
					tox - 5 * Math.cos(angle - Math.PI / 6),
					toy - 5 * Math.sin(angle - Math.PI / 6)
				);

				ctx.moveTo(tox, toy);
				ctx.lineTo(
					tox - 5 * Math.cos(angle + Math.PI / 6),
					toy - 5 * Math.sin(angle + Math.PI / 6)
				);

				ctx.stroke();
			}
		}

		let mousex = 0;
		let mousey = 0;
		let mouseDownX = 0;
		let mouseDownY = 0;
		let mouseVector;

		canvas.addEventListener('mousemove', function (e) {
			mousex = e.offsetX;
			mousey = e.offsetY;

			let dx = e.offsetX - mouseDownX;
			let dy = e.offsetY - mouseDownY;

			if (mouseVector) {
				mouseVector.addx = dx;
				mouseVector.addy = dy;
			}
		});

		canvas.addEventListener('mousedown', function (e) {
			mouseDownX = e.offsetX;
			mouseDownY = e.offsetY;

			let vector = {
				dx: 0,
				dy: 0,
				addx: 0,
				addy: 0,
				x: mouseDownX,
				y: mouseDownY,
			};

			mouseVector = vector;

			vectors.push(vector);
		});

		canvas.addEventListener('mouseup', function (e) {
			mouseVector = null;
		});

		function update() {
			for (let i = 0; i < vectors.length; i++) {
				let vector = vectors[i];
				vector.dx = ((mousex - vector.x) / 100) * 5;

				vector.dy = ((mousey - vector.y) / 100) * 5;
			}
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

export default VectorField;
