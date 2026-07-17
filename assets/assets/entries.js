// Add new entries by duplicating an object in the array.

const entries = [
	{
		id: "Entry0001",
		slug: "Entry0001-Curse-to-Separate-Sipa-and-Ouarteihla",
		title: "Curse to Separate Sipa and Ouarteihla",
		description: "Ritual written on Parchment detailing a curse to cause animosity.",
		tags: ["800-1000 AD", "9th Century", "Middle Ages", "Ritual", "Curse", "Animosity"],
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
	const tbody = document.getElementById("entriesBody");
	tbody.innerHTML = "";

	for (const e of list) {
		const link = `${e.slug}.html`;

		const entryLink = el("a", { href: link, class: "entry-id" }, [e.id]);
		const titleLink = el("a", { href: link }, [e.title]);

		const thumb = el("div", { class: "thumb", "aria-hidden": "true" }, [
			e.thumb ? el("img", { src: e.thumb, alt: "" }) : "—"
		]);

		const titleCell = el("div", { class: "title-cell" }, [thumb, el("div", {}, [titleLink])]);

		const tagsCell = el("div", { class: "tags" },
			(e.tags || []).map(t => el("span", {}, [t]))
		);

		const tr = el("tr", {}, [
			el("td", {}, [entryLink]),
			el("td", {}, [titleCell]),
			el("td", {}, [e.description]),
			el("td", {}, [tagsCell]),
		]);

		tbody.appendChild(tr);
	}

	const count = document.getElementById("entryCount");
	count.textContent = `${list.length} item(s)`;
}

function normalize(s) {
	return (s || "").toLowerCase().trim();
}

function applySearch() {
	const q = normalize(document.getElementById("entrySearch").value);
	if (!q) return renderRows(entries);

	const filtered = entries.filter(e => {
		const hay = [
			e.id, e.title, e.description, (e.tags || []).join(" ")
		].map(normalize).join(" | ");
		return hay.includes(q);
	});

	renderRows(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
	renderRows(entries);
	const input = document.getElementById("entrySearch");
	input.addEventListener("input", applySearch);
});
