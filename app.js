const STORAGE_KEY = "favorite-links-v1";
const CATEGORY_ORDER_KEY = "favorite-category-order-v1";

const linkForm = document.getElementById("linkForm");
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const categoryInput = document.getElementById("categoryInput");
const categorySuggestions = document.getElementById("categorySuggestions");
const tilesContainer = document.getElementById("tilesContainer");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFileInput = document.getElementById("importFileInput");
const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");
const editTitleInput = document.getElementById("editTitleInput");
const editUrlInput = document.getElementById("editUrlInput");
const editCategoryInput = document.getElementById("editCategoryInput");
const editCancelBtn = document.getElementById("editCancelBtn");

const defaultLinks = [
  { id: crypto.randomUUID(), title: "Tagesschau", url: "https://www.tagesschau.de", category: "Nachrichten" },
  { id: crypto.randomUUID(), title: "Wikipedia", url: "https://de.wikipedia.org", category: "Wissen" }
];
let draggedId = null;
let draggedCategory = null;
let activeCategoryMenu = null;
let editingLinkId = null;

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

function loadCategoryOrder() {
  try {
    const fromStorage = localStorage.getItem(CATEGORY_ORDER_KEY);
    if (!fromStorage) return [];
    const parsed = JSON.parse(fromStorage);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => typeof item === "string" && item.trim()).map(item => item.trim());
  } catch {
    return [];
  }
}

function saveCategoryOrder(order) {
  localStorage.setItem(CATEGORY_ORDER_KEY, JSON.stringify(order));
}

function getExistingCategories() {
  return [...new Set(links.map(link => normalizeCategory(link.category)))];
}

function syncCategoryOrder() {
  const existing = getExistingCategories();
  existing.forEach(category => {
    if (!categoryOrder.includes(category)) {
      categoryOrder.push(category);
    }
  });

  saveCategoryOrder(categoryOrder);
}

function sanitizeImportedLinks(rawLinks) {
  if (!Array.isArray(rawLinks)) return [];

  return rawLinks
    .filter(link => link && typeof link.title === "string" && typeof link.url === "string")
    .map(link => {
      const normalizedUrl = normalizeUrl(link.url);
      try {
        new URL(normalizedUrl);
      } catch {
        return null;
      }

      return {
        id: typeof link.id === "string" && link.id.trim() ? link.id : crypto.randomUUID(),
        title: link.title.trim(),
        url: normalizedUrl,
        category: normalizeCategory(typeof link.category === "string" ? link.category : "Allgemein")
      };
    })
    .filter(link => link && link.title);
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

function reassignLinkCategory(linkId, nextCategory) {
  const normalizedCategory = normalizeCategory(nextCategory);
  const link = links.find(item => item.id === linkId);
  if (!link) return;

  link.category = normalizedCategory;
  saveLinks(links);

  if (!categoryOrder.includes(normalizedCategory)) {
    categoryOrder.push(normalizedCategory);
    saveCategoryOrder(categoryOrder);
  }

  render();
}

function openEditDialog(linkId) {
  const link = links.find(item => item.id === linkId);
  if (!link) return;

  editingLinkId = linkId;
  editTitleInput.value = link.title;
  editUrlInput.value = link.url;
  editCategoryInput.value = normalizeCategory(link.category);
  editDialog.showModal();
}

function closeCategoryMenu() {
  if (!activeCategoryMenu) return;
  activeCategoryMenu.remove();
  activeCategoryMenu = null;
}

function openCategoryMenu(triggerElement, link) {
  closeCategoryMenu();

  const currentCategory = normalizeCategory(link.category);
  const categories = categoryOrder.filter(category => category !== currentCategory);
  if (!categories.length) {
    alert("Es gibt noch keine andere Kategorie zur Auswahl.");
    return;
  }

  const menu = document.createElement("div");
  menu.className = "category-menu";
  menu.setAttribute("role", "menu");

  categories.forEach(category => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "category-menu-item";
    item.textContent = category;
    item.setAttribute("role", "menuitem");
    item.addEventListener("click", event => {
      event.preventDefault();
      reassignLinkCategory(link.id, category);
      closeCategoryMenu();
    });
    menu.append(item);
  });

  document.body.append(menu);
  const rect = triggerElement.getBoundingClientRect();
  const margin = 8;
  const menuRect = menu.getBoundingClientRect();

  let left = rect.left;
  if (left + menuRect.width + margin > window.innerWidth) {
    left = window.innerWidth - menuRect.width - margin;
  }
  left = Math.max(margin, left);

  let top = rect.bottom + 6;
  if (top + menuRect.height + margin > window.innerHeight) {
    top = rect.top - menuRect.height - 6;
  }
  top = Math.max(margin, top);

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  activeCategoryMenu = menu;
}

function moveCategory(fromCategory, toCategory) {
  if (!fromCategory || !toCategory || fromCategory === toCategory) return;

  const fromIndex = categoryOrder.indexOf(fromCategory);
  const toIndex = categoryOrder.indexOf(toCategory);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = categoryOrder.splice(fromIndex, 1);
  categoryOrder.splice(toIndex, 0, moved);
  saveCategoryOrder(categoryOrder);
  render();
}

function moveCategoryToEnd(category) {
  const index = categoryOrder.indexOf(category);
  if (index === -1) return;

  const [moved] = categoryOrder.splice(index, 1);
  categoryOrder.push(moved);
  saveCategoryOrder(categoryOrder);
  render();
}

function deleteEmptyCategory(category) {
  const hasLinks = links.some(link => normalizeCategory(link.category) === category);
  if (hasLinks) {
    alert("Diese Kategorie enthält noch Kacheln und kann nicht gelöscht werden.");
    return;
  }

  categoryOrder = categoryOrder.filter(item => item !== category);
  saveCategoryOrder(categoryOrder);
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

  const changeCategoryBtn = document.createElement("button");
  changeCategoryBtn.className = "change-category-btn";
  changeCategoryBtn.type = "button";
  changeCategoryBtn.textContent = "Kategorie ändern";
  changeCategoryBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    openCategoryMenu(changeCategoryBtn, link);
  });

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.type = "button";
  editBtn.textContent = "✏️";
  editBtn.setAttribute("aria-label", `Link ${link.title} bearbeiten`);
  editBtn.setAttribute("data-tooltip", "Kachel bearbeiten");
  editBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    openEditDialog(link.id);
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
  actions.append(editBtn);
  actions.append(changeCategoryBtn);
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
  syncCategoryOrder();

  if (!links.length && !categoryOrder.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Noch keine Links oder Kategorien vorhanden. Füge oben deinen ersten Eintrag hinzu.";
    tilesContainer.append(empty);
    renderCategorySuggestions();
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

  categoryOrder.forEach(category => {
    const items = groupedLinks.get(category) || [];

    const section = document.createElement("section");
    section.className = "category-section";
    section.dataset.category = category;

    const header = document.createElement("div");
    header.className = "category-header";

    const heading = document.createElement("h2");
    heading.className = "category-title";
    heading.textContent = category;

    const categoryDragHandle = document.createElement("button");
    categoryDragHandle.className = "category-drag-handle";
    categoryDragHandle.type = "button";
    categoryDragHandle.textContent = "Abschnitt verschieben";
    categoryDragHandle.draggable = true;
    categoryDragHandle.setAttribute("aria-label", `Kategorie ${category} verschieben`);

    const deleteCategoryBtn = document.createElement("button");
    deleteCategoryBtn.className = "delete-category-btn";
    deleteCategoryBtn.type = "button";
    deleteCategoryBtn.textContent = "🗑";
    deleteCategoryBtn.setAttribute("aria-label", `Kategorie ${category} löschen`);
    deleteCategoryBtn.setAttribute("data-tooltip", "Kategorie löschen");
    deleteCategoryBtn.disabled = items.length > 0;
    deleteCategoryBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      deleteEmptyCategory(category);
    });

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

    categoryDragHandle.addEventListener("dragstart", event => {
      draggedCategory = category;
      section.classList.add("category-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", category);
    });

    categoryDragHandle.addEventListener("dragend", () => {
      draggedCategory = null;
      section.classList.remove("category-dragging");
      document.querySelectorAll(".category-section.category-drag-over").forEach(el => {
        el.classList.remove("category-drag-over");
      });
    });

    section.addEventListener("dragover", event => {
      if (!draggedCategory || draggedCategory === category) return;
      event.preventDefault();
      section.classList.add("category-drag-over");
    });

    section.addEventListener("dragleave", () => {
      section.classList.remove("category-drag-over");
    });

    section.addEventListener("drop", event => {
      if (!draggedCategory) return;
      event.preventDefault();
      section.classList.remove("category-drag-over");
      moveCategory(draggedCategory, category);
    });

    items.forEach(link => {
      grid.append(createTile(link));
    });

    if (!items.length) {
      const emptyCategoryInfo = document.createElement("div");
      emptyCategoryInfo.className = "empty-category";
      emptyCategoryInfo.textContent = "Noch keine Kacheln in dieser Kategorie.";
      grid.append(emptyCategoryInfo);
    }

    const categoryHeaderActions = document.createElement("div");
    categoryHeaderActions.className = "category-header-actions";
    categoryHeaderActions.append(categoryDragHandle, deleteCategoryBtn);

    header.append(heading, categoryHeaderActions);
    section.append(header, grid);
    tilesContainer.append(section);
  });

  renderCategorySuggestions();
}

let links = loadLinks();
let categoryOrder = loadCategoryOrder();
saveLinks(links);
render();

document.addEventListener("click", event => {
  if (!activeCategoryMenu) return;
  if (event.target.closest(".category-menu") || event.target.closest(".change-category-btn")) return;
  closeCategoryMenu();
});

tilesContainer.addEventListener("dragover", event => {
  if (!draggedCategory) return;
  event.preventDefault();
});

tilesContainer.addEventListener("drop", event => {
  if (!draggedCategory) return;
  if (event.target.closest(".category-section")) return;
  event.preventDefault();
  moveCategoryToEnd(draggedCategory);
});

linkForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const url = normalizeUrl(urlInput.value);
  const category = normalizeCategory(categoryInput.value);

  if (!category) return;

  if (!title && !url) {
    if (!categoryOrder.includes(category)) {
      categoryOrder.push(category);
      saveCategoryOrder(categoryOrder);
    }
    render();
    linkForm.reset();
    categoryInput.focus();
    return;
  }

  if (!title || !url) {
    alert("Bitte Name und URL angeben oder nur eine Kategorie erstellen.");
    return;
  }

  try {
    new URL(url);
  } catch {
    alert("Bitte eine gültige URL eingeben.");
    return;
  }

  links.unshift({ id: crypto.randomUUID(), title, url, category });
  saveLinks(links);
  if (!categoryOrder.includes(category)) {
    categoryOrder.push(category);
    saveCategoryOrder(categoryOrder);
  }
  render();
  linkForm.reset();
  titleInput.focus();
});

exportBtn.addEventListener("click", () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    links
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "favoriten-links.json";
  anchor.click();

  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => {
  importFileInput.click();
});

importFileInput.addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const content = await file.text();
    const parsed = JSON.parse(content);
    const importedLinks = sanitizeImportedLinks(parsed.links ?? parsed);

    if (!importedLinks.length) {
      alert("Keine gültigen Links in der JSON-Datei gefunden.");
      return;
    }

    const shouldReplace = confirm(
      `Es wurden ${importedLinks.length} Links gefunden. Bestehende Links ersetzen?`
    );

    if (shouldReplace) {
      links = importedLinks;
    } else {
      links = [...importedLinks, ...links];
    }

    saveLinks(links);
    render();
  } catch {
    alert("Import fehlgeschlagen. Bitte eine gültige JSON-Datei auswählen.");
  } finally {
    importFileInput.value = "";
  }
});

editForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!editingLinkId) return;

  const link = links.find(item => item.id === editingLinkId);
  if (!link) return;

  const normalizedTitle = editTitleInput.value.trim();
  const normalizedUrl = normalizeUrl(editUrlInput.value);
  const normalizedCategory = normalizeCategory(editCategoryInput.value);

  if (!normalizedTitle) {
    alert("Der Titel darf nicht leer sein.");
    return;
  }

  try {
    new URL(normalizedUrl);
  } catch {
    alert("Bitte eine gültige URL eingeben.");
    return;
  }

  link.title = normalizedTitle;
  link.url = normalizedUrl;
  link.category = normalizedCategory;
  saveLinks(links);

  if (!categoryOrder.includes(normalizedCategory)) {
    categoryOrder.push(normalizedCategory);
    saveCategoryOrder(categoryOrder);
  }

  render();
  editDialog.close();
  editingLinkId = null;
});

editCancelBtn.addEventListener("click", () => {
  editDialog.close();
  editingLinkId = null;
});
