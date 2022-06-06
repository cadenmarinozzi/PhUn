import Button from '../Button/Button';
import { useState, createRef, useEffect } from 'react';
import './SimulationPage.scss';
import { CodeBlock, googlecode } from 'react-code-blocks';
import { Gradient } from 'react-gradient';
import code from '../../simulationCode';
import { useCookies } from 'react-cookie';
import Latex from 'react-latex';

function toLatex(str) {
	return <Latex>{str}</Latex>;
}

function SimulationPage(props) {
	let canvasRef = createRef();
	let [cookies] = useCookies(['user']);

	let simulationName = props.simulationName ?? cookies['simulationName'];
	let simulationDescription =
		props.simulationDescription ?? cookies['simulationDescription'];
	let cookieCode = code[simulationName];

	let [codeString, setCode] = useState(cookieCode);

	useEffect(() => {
		let width;
		let height;

		let canvas = canvasRef.current;
		let ctx = canvas.getContext('2d');

		let draw;

		function resize(shouldDraw) {
			width = canvas.parentElement.clientWidth;
			height = canvas.parentElement.clientHeight;

			canvas.width = width;
			canvas.height = height;

			if (shouldDraw) draw();
		}

		resize();
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

		eval(codeString);
	}, []);

	function handleClick() {
		setCode(cookieCode);
	}

	return (
		<div className="simulation-page-container">
			<i>
				<Gradient
					gradients={[
						['#8a80ff', '#80ffb9'],
						['#ff808d', '#80bdff'],
					]}
					angle="30deg"
					element="h1"
					className="simulation-title"
					property="text"
					duration={3000}>
					{simulationName}
				</Gradient>
			</i>

			<div className="simulation-page">
				<div className="section">
					<div className="simulation-header">
						<h2>Code</h2>
						<Button onClick={handleClick}>Reset</Button>
					</div>

					<div className="code-section">
						<CodeBlock
							text={cookieCode}
							language="javascript"
							theme={googlecode}
							customStyle={{
								height: 'calc(50vh - 80px)',
							}}
							onChange={(code) => setCode(code)}
						/>
					</div>
				</div>

				<div className="section output-section">
					<h2>Output</h2>
					<canvas ref={canvasRef} />
				</div>

				<div className="section description-section">
					<h2>Description</h2>
					{toLatex(simulationDescription)}
				</div>
			</div>
		</div>
	);
}

export default SimulationPage;
