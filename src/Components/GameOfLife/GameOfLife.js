import { Component, createRef } from 'react';

class GameOfLife extends Component {
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

		function update(grid, M, N) {
			ctx.clearRect(0, 0, width, height);

			let future = new Array(M);
			for (let i = 0; i < M; i++) {
				future[i] = new Array(N).fill(0);
			}

			for (let l = 0; l < M; l++) {
				for (let m = 0; m < N; m++) {
					let aliveNeighbours = 0;
					for (let i = -1; i < 2; i++) {
						for (let j = -1; j < 2; j++) {
							if (
								l + i >= 0 &&
								l + i < M &&
								m + j >= 0 &&
								m + j < N
							)
								aliveNeighbours += grid[l + i][m + j];
						}
					}
					aliveNeighbours -= grid[l][m];

					if (grid[l][m] === 1 && aliveNeighbours < 2)
						future[l][m] = 0;
					else if (grid[l][m] === 1 && aliveNeighbours > 3)
						future[l][m] = 0;
					else if (grid[l][m] === 0 && aliveNeighbours === 3)
						future[l][m] = 1;
					else future[l][m] = grid[l][m];
				}
			}

			for (let i = 0; i < M; i++) {
				for (let j = 0; j < N; j++) {
					if (future[i][j] !== 0) {
						ctx.fillStyle = 'black';
						ctx.fillRect(i * 5, j * 5, 5, 5);
					}
				}
			}

			return future;
		}

		let M = Math.floor(width / 5),
			N = Math.floor(height / 5);

		let grid = [];

		for (let i = 0; i < M; i++) {
			let row = [];

			for (let j = 0; j < N; j++) {
				row[j] = Math.random() > 0.5 ? 1 : 0;
			}

			grid[i] = row;
		}

		let updating = true;

		function animate(grid) {
			let newGrid = grid;

			if (updating) {
				newGrid = update(grid, M, N);
			}

			setTimeout(() => {
				animate(newGrid);
			}, 100);
		}

		animate(grid);
	}

	render() {
		return (
			<div>
				<canvas ref={this.state.ref}></canvas>
			</div>
		);
	}
}

export default GameOfLife;
