import { Component, createRef } from 'react';

class ClothSimulation extends Component {
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

		let nodes = [];
		let springs = [];

		class Node {
			constructor(x, y, fixed, holder) {
				this.x = x;
				this.y = y;
				this.oldx = x;
				this.oldy = y;
				this.fixed = fixed;
				this.holder = holder;
			}
		}

		class Spring {
			constructor(firstNode, secondNode) {
				this.firstNode = firstNode;
				this.secondNode = secondNode;
				this.len = Math.sqrt(
					Math.pow(firstNode.x - secondNode.x, 2) +
						Math.pow(firstNode.y - secondNode.y, 2)
				);
			}
		}

		for (let row = 0; row < width / 10; row++) {
			let x = row * 10;

			for (let col = 0; col < 10; col++) {
				let y = col * 10;
				let holder = y === 0 && x % 12 === 0;
				nodes.push(new Node(x, y, holder, holder));

				if (col) {
					springs.push(
						new Spring(
							nodes[nodes.length - 2],
							nodes[nodes.length - 1]
						)
					);
				}

				if (row) {
					springs.push(
						new Spring(
							nodes[nodes.length - 10 - 1],
							nodes[nodes.length - 1]
						)
					);
				}
			}
		}

		let gravity = 0.2;
		let friction = 0.99;
		let bounce = 0.5;
		let elasticity = 10;

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (let spring of springs) {
				if (spring.removed) continue;

				ctx.beginPath();
				ctx.moveTo(spring.firstNode.x, spring.firstNode.y);
				ctx.lineTo(spring.secondNode.x, spring.secondNode.y);
				ctx.stroke();
			}
		}

		function update() {
			for (let i = 0; i < springs.length; i++) {
				let spring = springs[i],
					dx = spring.secondNode.x - spring.firstNode.x,
					dy = spring.secondNode.y - spring.firstNode.y,
					distance = Math.sqrt(dx * dx + dy * dy),
					percent = (spring.len - distance) / distance / 2,
					offsetX = dx * percent,
					offsetY = dy * percent;

				if (distance * 2 > spring.len * elasticity) {
					spring.removed = true;
				}

				if (!spring.firstNode.fixed && !spring.removed) {
					spring.firstNode.x -= offsetX;
					spring.firstNode.y -= offsetY;
				}

				if (!spring.secondNode.fixed && !spring.removed) {
					spring.secondNode.x += offsetX;
					spring.secondNode.y += offsetY;
				}
			}

			for (let i = 0; i < nodes.length; i++) {
				let node = nodes[i];
				if (node.fixed) continue;

				let vx = (node.x - node.oldx) * friction;
				let vy = (node.y - node.oldy) * friction;

				node.oldx = node.x;
				node.oldy = node.y;
				node.x += vx;
				node.y += vy + gravity;

				if (node.x > width) {
					node.x = width;
					node.oldx = node.x + vx * bounce;
				} else if (node.x < 0) {
					node.x = 0;
					node.oldx = node.x + vx * bounce;
				}

				if (node.y > height) {
					node.y = height;
					node.oldy = node.y + vy * bounce;
				} else if (node.y < 0) {
					node.y = 0;
					node.oldy = node.y + vy * bounce;
				}
			}
		}

		function animate() {
			draw();
			update();
			requestAnimationFrame(animate);
		}

		animate();

		let mouseDown = false;
		let closestNode;

		canvas.addEventListener('mousedown', (e) => {
			mouseDown = true;
		});

		canvas.addEventListener('mouseup', (e) => {
			mouseDown = false;

			closestNode.fixed = false;
			closestNode.held = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (!mouseDown) return;

			let x = e.offsetX;
			let y = e.offsetY;

			// get closest node

			let closest = 100000;

			for (let node of nodes) {
				if (node.holder) continue;

				let dx = x - node.x,
					dy = y - node.y,
					distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < closest) {
					closest = distance;
					closestNode = node;
				}
			}

			closestNode.fixed = false;
			closestNode.held = true;
			closestNode.x = x;
			closestNode.y = y;
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

export default ClothSimulation;
