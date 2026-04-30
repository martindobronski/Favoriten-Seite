const STORAGE_KEY = "favorite-links-v1";

const linkForm = document.getElementById("linkForm");
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const categoryInput = document.getElementById("categoryInput");
const categorySuggestions = document.getElementById("categorySuggestions");
const tilesContainer = document.getElementById("tilesContainer");

const defaultLinks = [
  { id: crypto.randomUUID(), title: "Tagesschau", url: "https://www.tagesschau.de", category: "Nachrichten" },
  { id: crypto.randomUUID(), title: "Wikipedia", url: "https://de.wikipedia.org", category: "Wissen" }
];
let draggedId = null;

function normalizeUrl(rawUrl) {
  const value = rawUrl.trim();
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return "https://" + value;
}

function normalizeCategory(rawCategory) {
  const value = rawCategory.trim();
  return value || "Allgemein";
}

function loadLinks() {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (!fromStorage) return defaultLinks;
    const parsed = JSON.parse(fromStorage);
    if (!Array.isArray(parsed)) return defaultLinks;
    return parsed
      .filter(link => link && link.id && link.title && link.url)
      .map(link => ({
        ...link,
        category: normalizeCategory(link.category || "Allgemein")
      }));
  } catch {
    return defaultLinks;
  }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function moveLink(fromId, toId, targetCategory) {
  if (!fromId || !toId || fromId === toId) return;

  const fromIndex = links.findIndex(item => item.id === fromId);
  const toIndex = links.findIndex(item => item.id === toId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = links.splice(fromIndex, 1);
  moved.category = normalizeCategory(targetCategory || moved.category);

  const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
  links.splice(adjustedToIndex, 0, moved);
  saveLinks(links);
  render();
}

function moveLinkToCategoryEnd(fromId, targetCategory) {
  if (!fromId) return;

  const normalizedCategory = normalizeCategory(targetCategory);
  const fromIndex = links.findIndex(item => item.id === fromId);
  if (fromIndex === -1) return;

  const [moved] = links.splice(fromIndex, 1);
  moved.category = normalizedCategory;
  links.push(moved);
  saveLinks(links);
  render();
}

function createTile(link) {
  const tile = document.createElement("article");
  tile.className = "tile";
  tile.dataset.id = link.id;

  const header = document.createElement("div");
  header.className = "tile-header";

  const dragHandle = document.createElement("button");
  dragHandle.className = "drag-handle";
  dragHandle.type = "button";
  dragHandle.textContent = "Verschieben";
  dragHandle.setAttribute("aria-label", `Kachel ${link.title} verschieben`);
  dragHandle.draggable = true;

  const anchor = document.createElement("a");
  anchor.className = "tile-link";
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = link.title;

  const url = document.createElement("div");
  url.className = "tile-url";
  url.textContent = link.url;

  const actions = document.createElement("div");
  actions.className = "tile-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "🗑";
  deleteBtn.setAttribute("aria-label", `Link ${link.title} entfernen`);
  deleteBtn.setAttribute("data-tooltip", "Kachel löschen");
  deleteBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    links = links.filter(item => item.id !== link.id);
    saveLinks(links);
    render();
  });

  dragHandle.addEventListener("dragstart", event => {
    draggedId = link.id;
    tile.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", link.id);
  });

  dragHandle.addEventListener("dragend", () => {
    draggedId = null;
    tile.classList.remove("dragging");
    document.querySelectorAll(".tile.drag-over").forEach(el => {
      el.classList.remove("drag-over");
    });
  });

  tile.addEventListener("dragover", event => {
    event.preventDefault();
    if (draggedId && draggedId !== link.id) {
      tile.classList.add("drag-over");
    }
  });

  tile.addEventListener("dragleave", () => {
    tile.classList.remove("drag-over");
  });

  tile.addEventListener("drop", event => {
    event.preventDefault();
    tile.classList.remove("drag-over");
    moveLink(draggedId, link.id, link.category);
  });

  header.append(dragHandle);
  anchor.append(title, url);
  actions.append(deleteBtn);
  tile.append(header, anchor, actions);
  return tile;
}

function renderCategorySuggestions() {
  const categories = [...new Set(links.map(link => normalizeCategory(link.category)))];
  categorySuggestions.innerHTML = "";

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    categorySuggestions.append(option);
  });
}

function render() {
  tilesContainer.innerHTML = "";

  if (!links.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Noch keine Links vorhanden. Füge oben deinen ersten Link hinzu.";
    tilesContainer.append(empty);
    return;
  }

  const groupedLinks = new Map();
  links.forEach(link => {
    const category = normalizeCategory(link.category);
    if (!groupedLinks.has(category)) {
      groupedLinks.set(category, []);
    }
    groupedLinks.get(category).push(link);
  });

  groupedLinks.forEach((items, category) => {
    const section = document.createElement("section");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.className = "category-title";
    heading.textContent = category;

    const grid = document.createElement("div");
    grid.className = "tiles";
    grid.dataset.category = category;

    grid.addEventListener("dragover", event => {
      event.preventDefault();
    });

    grid.addEventListener("drop", event => {
      if (event.target.closest(".tile")) return;
      event.preventDefault();
      moveLinkToCategoryEnd(draggedId, category);
    });

    items.forEach(link => {
      grid.append(createTile(link));
    });

    section.append(heading, grid);
    tilesContainer.append(section);
  });

  renderCategorySuggestions();
}

let links = loadLinks();
saveLinks(links);
render();

linkForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const url = normalizeUrl(urlInput.value);
  const category = normalizeCategory(categoryInput.value);

  if (!title || !url || !category) return;

  try {
    new URL(url);
  } catch {
    alert("Bitte eine gültige URL eingeben.");
    return;
  }

  links.unshift({ id: crypto.randomUUID(), title, url, category });
  saveLinks(links);
  render();
  linkForm.reset();
  titleInput.focus();
});
