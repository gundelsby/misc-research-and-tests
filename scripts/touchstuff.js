const movable = document.querySelector(".movable");
const { left: movableLeft, top: movableTop } = movable.getBoundingClientRect();
console.log(
	`.movable at ${movableLeft + window.scrollX},${top + window.scrollY}`
);

const container = document.querySelector(".container");
const {
	left: containerLeft,
	top: containerTop,
	width: containerWidth,
	height: containerHeight
} = container.getBoundingClientRect();
console.log(
	`.container at ${containerLeft + window.scrollX},${containerTop +
		window.scrollY}`
);

document.addEventListener("touchmove", event => {
	if (event.target.className === "movable") {
		console.table("mm", event);
	}
});

document.addEventListener("touchstart", event => {
	if (event.target.className === "container") {
		const touch = event.touches[0];

		// container relative values
		const x = touch.pageX + window.scrollX - containerLeft;
		const y = touch.pageY + window.scrollY - containerTop;

		console.log("click", touch.pageX, touch.pageY);
		console.log("normalized to container", x, y);

		placeMovable(x, y);
	}
});

function placeMovable(x, y) {
	const { width, height } = movable.getBoundingClientRect();

	// set bounds for movable to avoid placing it outside the container
	const minX = 0;
	const maxX = containerWidth - width;
	const minY = 0;
	const maxY = containerHeight - height;

	// center movable at click
	const cx = x - width / 2;
	const cy = y - height / 2;

	const calculatedLeft = clamp(cx, minX, maxX);
	const calculatedTop = clamp(cy, minY, maxY);

	console.log(
		`movable placed at`,
		calculatedLeft,
		calculatedTop,
		calculatedLeft + width,
		calculatedTop + height
	);

	movable.style.left = `${calculatedLeft}px`;
	movable.style.top = `${calculatedTop}px`;
}

function clamp(value, min, max) {
	console.log(`Clamping ${value} to ${min}..${max}`);
	return Math.min(max, Math.max(value, min));
}
