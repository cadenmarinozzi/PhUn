let code = {};

code['Bezier Curves'] = ` \
const points = [
    { x: 10, y: 5 },
    { x: width - 10, y: height / 2 },
];

const controlPoint = { x: width / 2 - 50, y: height / 2 + 50 };

let mouseDown = false;

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        controlPoint.x = e.offsetX;
        controlPoint.y = e.offsetY;
        draw();
    }
});

function draw() {
    ctx.clearRect(0, 0, width, height);
    circle(controlPoint.x, controlPoint.y, 5, false);

    points.forEach((point) => {
        circle(point.x, point.y, 5);
    });

    let lastPoint;

    for (let t = 0; t < 1; t += 0.1) {
        const x =
            (1 - t) ** 2 * points[0].x +
            2 * (1 - t) * t * controlPoint.x +
            t ** 2 * points[1].x;
        const y =
            (1 - t) ** 2 * points[0].y +
            2 * (1 - t) * t * controlPoint.y +
            t ** 2 * points[1].y;

        if (lastPoint) {
            line(lastPoint.x, lastPoint.y, x, y);
        } else {
            ctx.fillRect(x, y, 1, 1);
        }

        lastPoint = { x, y };
    }
}

draw();
`;

export default code;
