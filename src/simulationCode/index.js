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

draw = () => {
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

code['Meta Balls'] = ` \
const points = [
    {
        x: 120,
        y: 100,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
    },
    {
        x: width / 2,
        y: height / 2,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
    },
];

let selectedPoint;

function update() {
    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (selectedPoint === point) continue;

        point.x += point.vx;
        point.y += point.vy;

        if (point.x + 50 > width || point.x - 50 < 0) {
            point.vx = -point.vx;
        } else if (point.y + 50 > height || point.y - 50 < 0) {
            point.vy = -point.vy;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
            let sum = 0;

            for (const point of points) {
                const xDist = x - point.x;
                const yDist = y - point.y;

                const dist = Math.sqrt(xDist * xDist + yDist * yDist);
                const recipDist = 900 / (dist * dist);

                sum += 200 * recipDist;
            }

            if (sum < 100) continue;

            ctx.fillRect(x, y, 2, 2);
        }
    }
}

let mouseDown = false;

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    selectedPoint = null;
});

canvas.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;

    // Move the closest point
    const closestPoint = points.reduce(
        (prev, curr) => {
            const prevDist = Math.sqrt(
                (prev.x - e.offsetX) * (prev.x - e.offsetX) +
                    (prev.y - e.offsetY) * (prev.y - e.offsetY)
            );
            const currDist = Math.sqrt(
                (curr.x - e.offsetX) * (curr.x - e.offsetX) +
                    (curr.y - e.offsetY) * (curr.y - e.offsetY)
            );

            return prevDist < currDist ? prev : curr;
        },
        { x: 0, y: 0 }
    );

    selectedPoint = closestPoint;
    closestPoint.x = e.offsetX;
    closestPoint.y = e.offsetY;
});

function animate() {
    draw();
    update();

    requestAnimationFrame(animate);
}

animate();
`;

code['N-Body'] = `\
const particles = [];
const G = 6.67408e-11;
const dt = 1000;

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        mass: Math.random() * 1000,
    });
}

function update() {
    for (const particle of particles) {
        let xForce = 0;
        let yForce = 0;

        for (const other of particles) {
            if (particle === other) {
                continue;
            }

            const xDist = other.x - particle.x;
            const yDist = other.y - particle.y;

            const dist = Math.sqrt(
                xDist * xDist + yDist * yDist + 1e-10
            );
            const Fg = (G * particle.mass * other.mass) / (dist * dist);

            xForce += xDist * Fg;
            yForce += yDist * Fg;
        }

        const ax = xForce / particle.mass;
        const ay = yForce / particle.mass;
        particle.vx += ax * dt;
        particle.vy += ay * dt;

        if (particle.x <= 0 || particle.x >= width) {
            particle.vx = -particle.vx;
        }

        if (particle.y <= 0 || particle.y >= height) {
            particle.vy = -particle.vy;
        }

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
        circle(particle.x, particle.y, particle.mass / 400);
    }
}

function animate() {
    draw();
    update();

    requestAnimationFrame(animate);
}

animate();

let mouseDown = false;

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!mouseDown || particles.length > 500) return;

    particles.push({
        x: e.offsetX,
        y: e.offsetY,
        vx: 0,
        vy: 0,
        mass: Math.random() * 1000,
    });
});
`;

export default code;
