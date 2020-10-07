const items = Array.from(document.querySelectorAll("li"));

function getVisualOrder(items) {
	return items
		.map((item) => {
			const { top } = item.getBoundingClientRect();

			return { item, top };
		})
		.sort((a, b) => a.top - b.top)
		.map(({ item }) => item);
}

console.log(getVisualOrder(items).map(({ textContent }) => textContent));

items[2].style = `transform: translate3d(0, 300px, 0)`;

console.log(getVisualOrder(items).map(({ textContent }) => textContent));
