// Add new articles by duplicating an object in the array.

const articles = [
	{
		id: "An Introduction",
		slug: "An-Introduction",
		title: "An Introduction",
		description: "This article should help introduce you to the Library as well as its purpose.",
		author: "L.T. Bishop",
		thumb: "../assets/img/Entry0001/fig1.jpg"
	}
];

function el(tag, attrs = {}, children = []) {
	const node = document.createElement(tag);
	for (const [k, v] of Object.entries(attrs)) {
		if (k === "class") node.className = v;
		else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
		else node.setAttribute(k, v);
	}
	for (const child of children) {
		node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
	}
	return node;
}

function renderRows(list) {
	const tbody = document.getElementById("articlesBody");
	tbody.innerHTML = "";

	for (const e of list) {
		const link = `${e.slug}.html`;

		const articleLink = el("a", { href: link, class: "article-id" }, [e.id]);
		const titleLink = el("a", { href: link }, [e.title]);

		const thumb = el("div", { class: "thumb", "aria-hidden": "true" }, [
			e.thumb ? el("img", { src: e.thumb, alt: "" }) : "—"
		]);

		const titleCell = el("div", { class: "title-cell" }, [
			thumb,
			 el("div", {}, [titleLink])
			]);


		const tr = el("tr", {}, [
			el("td",{}, [thumb]),
			el("td", {}, [titleCell]),
			el("td", {}, [e.description]),
			el("td", {}, [e.author]),
		]);

		tbody.appendChild(tr);
	}

	const count = document.getElementById("articleCount");
	count.textContent = `${list.length} item(s)`;
}

function normalize(s) {
	return (s || "").toLowerCase().trim();
}

function applySearch() {
	const q = normalize(document.getElementById("articleSearch").value);
	if (!q) return renderRows(articles);

	const filtered = articles.filter(e => {
		const hay = [
			e.id, e.title, e.description, e.author
		].map(normalize).join(" | ");
		return hay.includes(q);
	});

	renderRows(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
	renderRows(articles);
	const input = document.getElementById("articleSearch");
	input.addEventListener("input", applySearch);
});
