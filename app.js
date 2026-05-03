const STORAGE_KEY = "favorite-links-v1";
const CATEGORY_ORDER_KEY = "favorite-category-order-v1";
const VISIT_COUNTS_KEY = "favorite-visit-counts-v1";
const MOST_VISITED_CATEGORY = "Am häufigsten besucht";
const MOST_VISITED_LIMIT = 5;

const linkForm = document.getElementById("linkForm");
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const categoryInput = document.getElementById("categoryInput");
const categorySuggestions = document.getElementById("categorySuggestions");
const tilesContainer = document.getElementById("tilesContainer");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFileInput = document.getElementById("importFileInput");
const sortCategoriesBtn = document.getElementById("sortCategoriesBtn");
const sortCategoriesDialog = document.getElementById("sortCategoriesDialog");
const sortCategoriesForm = document.getElementById("sortCategoriesForm");
const sortCategoriesList = document.getElementById("sortCategoriesList");
const sortCategoriesCancelBtn = document.getElementById("sortCategoriesCancelBtn");
const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");
const editTitleInput = document.getElementById("editTitleInput");
const editUrlInput = document.getElementById("editUrlInput");
const editCategoryInput = document.getElementById("editCategoryInput");
const editCancelBtn = document.getElementById("editCancelBtn");
const searchInput = document.getElementById("searchInput");

const defaultLinks = [
  { id: crypto.randomUUID(), title: "Tagesschau", url: "https://www.tagesschau.de", category: "Nachrichten" },
  { id: crypto.randomUUID(), title: "Wikipedia", url: "https://de.wikipedia.org", category: "Wissen" }
];

let draggedId = null;
let draggedSortCategory = null;
let activeCategoryMenu = null;
let editingLinkId = null;
let pendingCategoryOrder = [];
let searchQuery = "";

// ── SICHERE SPEICHERFUNKTION (NEU) ────────────────────────────────────────────

/**
 * Versucht, Daten im localStorage zu speichern.
 * Fängt QuotaExceededError ab, bereinigt alte Daten und warnt den Nutzer.
 */
function safeLocalStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('localStorage ist voll. Versuche automatische Bereinigung...');

      // Versuch 1: Visit Counts bereinigen (alte Einträge von gelöschten Links entfernen)
      // Wir rufen pruneVisitCounts auf, aber müssen sicherstellen, dass es die globalen Variablen nutzt
      const linkIds = new Set(links.map(link => link.id));
      let didChange = false;
      Object.keys(visitCounts).forEach(id => {
        if (!linkIds.has(id)) {
          delete visitCounts[id];
          didChange = true;
        }
      });

      if (didChange) {
        try {
          localStorage.setItem(VISIT_COUNTS_KEY, JSON.stringify(visitCounts));
          alert('Speicher war voll. Alte Zählerdaten wurden automatisch bereinigt, um Platz zu schaffen.');
          // Jetzt den ursprünglichen Speicherversuch wiederholen
          localStorage.setItem(key, value);
          return true;
        } catch (e2) {
          // Immer noch voll trotz Bereinigung
        }
      }

      // Versuch 2: Nutzer warnen
      alert(
        'KRITISCH: Der lokale Speicher Ihres Browsers ist voll!\n\n' +
        'Neue Änderungen können NICHT gespeichert werden.\n\n' +
        'Bitte:\n' +
        '1. Exportieren Sie Ihre Daten SOFORT über den "Export"-Button.\n' +
        '2. Löschen Sie alte Links.\n' +
        '3. Leeren Sie ggf. den Browser-Cache.'
      );
      return false;
    }
    // Andere Fehler weiterwerfen
    throw e;
  }
}

// ── URL / CATEGORY HELPERS ───────────────────────────────────────────────────

function normalizeUrl(rawUrl) {
  const value = rawUrl.trim();
  if (!value) return "";
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(value)) return value;
  return "https://" + value;
}

function normalizeCategory(rawCategory) {
  const value = rawCategory.trim();
  return value || "Allgemein";
}

// ── STORAGE: LINKS ───────────────────────────────────────────────────────────

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
  const jsonData = JSON.stringify(links);
  const success = safeLocalStorageSetItem(STORAGE_KEY, jsonData);
  if (!success) console.error('Speichern von Links fehlgeschlagen.');
}

function setLinks(newLinks) {
  links = newLinks;
  saveLinks(links);
}

// ── STORAGE: CATEGORY ORDER ──────────────────────────────────────────────────

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
  const jsonData = JSON.stringify(order);
  safeLocalStorageSetItem(CATEGORY_ORDER_KEY, jsonData);
}

// ── STORAGE: VISIT COUNTS ────────────────────────────────────────────────────

function loadVisitCounts() {
  try {
    const fromStorage = localStorage.getItem(VISIT_COUNTS_KEY);
    if (!fromStorage) return {};
    const parsed = JSON.parse(fromStorage);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, count]) => (
        typeof id === "string" && id.trim() && Number.isInteger(count) && count > 0
      ))
    );
  } catch {
    return {};
  }
}

function saveVisitCounts(counts) {
  const jsonData = JSON.stringify(counts);
  const success = safeLocalStorageSetItem(VISIT_COUNTS_KEY, jsonData);
  if (!success) console.error('Speichern von Besuchszählern fehlgeschlagen.');
}

function pruneVisitCounts() {
  const linkIds = new Set(links.map(link => link.id));
  let didChange = false;

  Object.keys(visitCounts).forEach(id => {
    if (!linkIds.has(id)) {
      delete visitCounts[id];
      didChange = true;
    }
  });

  if (didChange) {
    saveVisitCounts(visitCounts);
  }
}

function recordVisit(linkId) {
  if (!linkId) return;
  visitCounts[linkId] = (visitCounts[linkId] || 0) + 1;
  saveVisitCounts(visitCounts);
  setTimeout(update, 0);
}

// ── MOST-VISITED HELPERS ─────────────────────────────────────────────────────

function getMostVisitedLinks() {
  return links
    .filter(link => visitCounts[link.id] > 0)
    .sort((first, second) => {
      const countDifference = visitCounts[second.id] - visitCounts[first.id];
      if (countDifference !== 0) return countDifference;
      return first.title.localeCompare(second.title, "de", { sensitivity: "base" });
    })
    .slice(0, MOST_VISITED_LIMIT);
}

// ── CATEGORY ORDER HELPERS ───────────────────────────────────────────────────

function getExistingCategories() {
  return [...new Set(links
    .map(link => normalizeCategory(link.category))
    .filter(category => category !== MOST_VISITED_CATEGORY)
  )];
}

function syncCategoryOrder() {
  const existing = getExistingCategories();
  categoryOrder = categoryOrder.filter(category => category !== MOST_VISITED_CATEGORY);

  existing.forEach(category => {
    if (!categoryOrder.includes(category)) {
      categoryOrder.unshift(category);
    }
  });

  saveCategoryOrder(categoryOrder);
}

// ── IMPORT SANITISATION ──────────────────────────────────────────────────────

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

// ── DRAG-AND-DROP: TILE REORDERING ───────────────────────────────────────────

function moveLink(fromId, toId, targetCategory) {
  if (!fromId || !toId || fromId === toId) return;

  const fromIndex = links.findIndex(item => item.id === fromId);
  const toIndex = links.findIndex(item => item.id === toId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = links.splice(fromIndex, 1);
  if (normalizeCategory(moved.category) !== normalizeCategory(targetCategory)) {
    links.splice(fromIndex, 0, moved);
    return;
  }
  moved.category = normalizeCategory(targetCategory || moved.category);

  const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
  links.splice(adjustedToIndex, 0, moved);
  saveLinks(links);
  update();
}

function moveLinkToCategoryEnd(fromId, targetCategory) {
  if (!fromId) return;

  const normalizedCategory = normalizeCategory(targetCategory);
  const fromIndex = links.findIndex(item => item.id === fromId);
  if (fromIndex === -1) return;

  const [moved] = links.splice(fromIndex, 1);
  if (normalizeCategory(moved.category) !== normalizedCategory) {
    links.splice(fromIndex, 0, moved);
    return;
  }
  moved.category = normalizedCategory;
  links.push(moved);
  saveLinks(links);
  update();
}

function reassignLinkCategory(linkId, nextCategory) {
  const normalizedCategory = normalizeCategory(nextCategory);
  const link = links.find(item => item.id === linkId);
  if (!link) return;

  link.category = normalizedCategory;
  saveLinks(links);

  if (!categoryOrder.includes(normalizedCategory)) {
    categoryOrder.unshift(normalizedCategory);
    saveCategoryOrder(categoryOrder);
  }

  update();
}

// ── EDIT DIALOG ──────────────────────────────────────────────────────────────

function openEditDialog(linkId) {
  const link = links.find(item => item.id === linkId);
  if (!link) return;

  editingLinkId = linkId;
  editTitleInput.value = link.title;
  editUrlInput.value = link.url;
  editCategoryInput.value = normalizeCategory(link.category);
  editDialog.showModal();
}

// ── CATEGORY CONTEXT MENU ────────────────────────────────────────────────────

function closeCategoryMenu() {
  if (!activeCategoryMenu) return;
  activeCategoryMenu.remove();
  activeCategoryMenu = null;
}

function openCategoryMenu(triggerElement, link) {
  closeCategoryMenu();

  const currentCategory = normalizeCategory(link.category);
  const categories = categoryOrder
    .filter(category => category !== currentCategory)
    .sort((first, second) => first.localeCompare(second, "de", { sensitivity: "base" }));

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

// ── CATEGORY DELETION ────────────────────────────────────────────────────────

function deleteEmptyCategory(category) {
  const hasLinks = links.some(link => normalizeCategory(link.category) === category);
  if (hasLinks) {
    alert("Diese Kategorie enthält noch Kacheln und kann nicht gelöscht werden.");
    return;
  }

  categoryOrder = categoryOrder.filter(item => item !== category);
  saveCategoryOrder(categoryOrder);
  update();
}

// ── SORT-CATEGORIES DIALOG ───────────────────────────────────────────────────

function movePendingCategory(fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
  if (fromIndex >= pendingCategoryOrder.length || toIndex >= pendingCategoryOrder.length) return;

  const [moved] = pendingCategoryOrder.splice(fromIndex, 1);
  pendingCategoryOrder.splice(toIndex, 0, moved);
  renderSortCategoriesList();
}

function movePendingCategoryToStart(index) {
  movePendingCategory(index, 0);
}

function movePendingCategoryToEnd(index) {
  movePendingCategory(index, pendingCategoryOrder.length - 1);
}

function renderSortCategoriesList() {
  sortCategoriesList.innerHTML = "";

  if (!pendingCategoryOrder.length) {
    const emptyInfo = document.createElement("div");
    emptyInfo.className = "sort-empty";
    emptyInfo.textContent = "Noch keine Kategorien vorhanden.";
    sortCategoriesList.append(emptyInfo);
    return;
  }

  pendingCategoryOrder.forEach((category, index) => {
    const item = document.createElement("div");
    item.className = "sort-category-item";
    item.draggable = true;
    item.dataset.index = String(index);

    const handle = document.createElement("span");
    handle.className = "sort-category-handle";
    handle.textContent = "≡";
    handle.title = "Kategorie ziehen";
    handle.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "sort-category-label";
    label.textContent = category;

    const moveTopBtn = document.createElement("button");
    moveTopBtn.type = "button";
    moveTopBtn.className = "sort-icon-btn";
    moveTopBtn.textContent = "⇧";
    moveTopBtn.disabled = index === 0;
    moveTopBtn.title = "Ganz nach oben";
    moveTopBtn.addEventListener("click", () => movePendingCategoryToStart(index));

    const moveUpBtn = document.createElement("button");
    moveUpBtn.type = "button";
    moveUpBtn.className = "sort-icon-btn";
    moveUpBtn.textContent = "↑";
    moveUpBtn.disabled = index === 0;
    moveUpBtn.title = "Eine Position nach oben";
    moveUpBtn.addEventListener("click", () => movePendingCategory(index, index - 1));

    const moveDownBtn = document.createElement("button");
    moveDownBtn.type = "button";
    moveDownBtn.className = "sort-icon-btn";
    moveDownBtn.textContent = "↓";
    moveDownBtn.disabled = index === pendingCategoryOrder.length - 1;
    moveDownBtn.title = "Eine Position nach unten";
    moveDownBtn.addEventListener("click", () => movePendingCategory(index, index + 1));

    const moveBottomBtn = document.createElement("button");
    moveBottomBtn.type = "button";
    moveBottomBtn.className = "sort-icon-btn";
    moveBottomBtn.textContent = "⇩";
    moveBottomBtn.disabled = index === pendingCategoryOrder.length - 1;
    moveBottomBtn.title = "Ganz nach unten";
    moveBottomBtn.addEventListener("click", () => movePendingCategoryToEnd(index));

    item.addEventListener("dragstart", event => {
      draggedSortCategory = category;
      item.classList.add("sort-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", category);
    });

    item.addEventListener("dragend", () => {
      draggedSortCategory = null;
      item.classList.remove("sort-dragging");
      document.querySelectorAll(".sort-category-item.sort-drag-over").forEach(el => {
        el.classList.remove("sort-drag-over");
      });
    });

    item.addEventListener("dragover", event => {
      if (!draggedSortCategory || draggedSortCategory === category) return;
      event.preventDefault();
      item.classList.add("sort-drag-over");
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("sort-drag-over");
    });

    item.addEventListener("drop", event => {
      event.preventDefault();
      item.classList.remove("sort-drag-over");
      const fromIndex = pendingCategoryOrder.indexOf(draggedSortCategory);
      const toIndex = pendingCategoryOrder.indexOf(category);
      movePendingCategory(fromIndex, toIndex);
    });

    const controls = document.createElement("div");
    controls.className = "sort-category-controls";
    controls.append(moveTopBtn, moveUpBtn, moveDownBtn, moveBottomBtn);

    item.append(handle, label, controls);
    sortCategoriesList.append(item);
  });
}

function openSortCategoriesDialog() {
  syncCategoryOrder();
  pendingCategoryOrder = [...categoryOrder];
  renderSortCategoriesList();
  sortCategoriesDialog.showModal();
}

// ── TILE FACTORY ─────────────────────────────────────────────────────────────

function createTile(link, options = {}) {
  const { isAutomatic = false } = options;
  const tile = document.createElement("article");
  tile.className = "tile";
  tile.dataset.id = link.id;

  const favicon = document.createElement("img");
  favicon.className = "tile-favicon";
  favicon.alt = "";
  favicon.setAttribute("aria-hidden", "true");
  if (/^https?:\/\//i.test(link.url)) {
    try {
      const domain = new URL(link.url).hostname;
      favicon.src = `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
    } catch {
      favicon.style.display = "none";
    }
    favicon.addEventListener("error", () => { favicon.style.display = "none"; });
  } else {
    favicon.style.display = "none";
  }

  const dragHandle = document.createElement("button");
  dragHandle.className = "drag-handle";
  dragHandle.type = "button";
  dragHandle.textContent = "↔️";
  dragHandle.title = "Reihenfolge ändern";
  dragHandle.draggable = true;

  const isCustomScheme = !/^https?:\/\//i.test(link.url);
  const anchor = document.createElement("a");
  anchor.className = "tile-link";
  anchor.href = link.url;
  anchor.rel = "noopener noreferrer";

  if (isCustomScheme) {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      recordVisit(link.id);
      window.location.href = link.url;
    });
  } else {
    anchor.target = "_blank";
    anchor.addEventListener("click", () => {
      recordVisit(link.id);
    });
  }

  const titleRow = document.createElement("div");
  titleRow.className = "tile-title-row";
  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = link.title;
  titleRow.append(favicon, title);

  const url = document.createElement("div");
  url.className = "tile-url";
  url.textContent = link.url;

  const actions = document.createElement("div");
  actions.className = "tile-actions";

  const actionsLeft = document.createElement("span");
  actionsLeft.className = "tile-actions-spacer";
  const visitCount = visitCounts[link.id] || 0;
  if (visitCount > 0) {
    const badge = document.createElement("span");
    badge.className = "visit-badge";
    badge.textContent = visitCount > 999 ? "999+" : String(visitCount);
    badge.title = `${visitCount} Mal besucht`;
    actionsLeft.append(badge);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "🗑";
  deleteBtn.title = "Löschen";
  deleteBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    if (!confirm(`„${link.title}" wirklich löschen?`)) return;
    setLinks(links.filter(item => item.id !== link.id));
    update();
  });

  const changeCategoryBtn = document.createElement("button");
  changeCategoryBtn.className = "change-category-btn";
  changeCategoryBtn.type = "button";
  changeCategoryBtn.textContent = "🏷️";
  changeCategoryBtn.title = "Kategorie ändern";
  changeCategoryBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    openCategoryMenu(changeCategoryBtn, link);
  });

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.type = "button";
  editBtn.textContent = "✏️";
  editBtn.title = "Bearbeiten";
  editBtn.addEventListener("click", event => {
    event.stopPropagation();
    event.preventDefault();
    openEditDialog(link.id);
  });

  if (!isAutomatic) {
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
  }

  anchor.append(titleRow, url);
  actions.append(actionsLeft);
  if (!isAutomatic) {
    actions.append(dragHandle);
  }
  actions.append(changeCategoryBtn, editBtn, deleteBtn);
  tile.append(anchor, actions);
  return tile;
}

// ── CATEGORY-SUGGESTIONS DATALIST ────────────────────────────────────────────

function renderCategorySuggestions() {
  const categories = [...new Set(links.map(link => normalizeCategory(link.category)))];
  categorySuggestions.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    categorySuggestions.append(option);
  });
}

// ── CATEGORY SECTION BUILDER ──────────────────────────────────────────────────

function renderCategorySection(category, items, options = {}) {
  const { isAutomatic = false } = options;
  const section = document.createElement("section");
  section.className = isAutomatic ? "category-section automatic-category-section" : "category-section";
  section.dataset.category = category;

  const header = document.createElement("div");
  header.className = isAutomatic ? "category-header automatic-category-header" : "category-header";

  const heading = document.createElement("h2");
  heading.className = "category-title";
  heading.textContent = category;
  header.append(heading);

  if (!isAutomatic) {
    const deleteCategoryBtn = document.createElement("button");
    deleteCategoryBtn.className = "delete-category-btn";
    deleteCategoryBtn.type = "button";
    deleteCategoryBtn.textContent = "🗑";
    deleteCategoryBtn.title = "Kategorie löschen";
    deleteCategoryBtn.disabled = items.length > 0;
    deleteCategoryBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      deleteEmptyCategory(category);
    });

    const categoryHeaderActions = document.createElement("div");
    categoryHeaderActions.className = "category-header-actions";
    categoryHeaderActions.append(deleteCategoryBtn);
    header.append(categoryHeaderActions);
  }

  const grid = document.createElement("div");
  grid.className = "tiles";
  grid.dataset.category = category;

  if (!isAutomatic) {
    grid.addEventListener("dragover", event => { event.preventDefault(); });
    grid.addEventListener("drop", event => {
      if (event.target.closest(".tile")) return;
      event.preventDefault();
      moveLinkToCategoryEnd(draggedId, category);
    });
  }

  items.forEach(link => {
    grid.append(createTile(link, { isAutomatic }));
  });

  if (!items.length) {
    const emptyCategoryInfo = document.createElement("div");
    emptyCategoryInfo.className = "empty-category";
    emptyCategoryInfo.textContent = isAutomatic
      ? "Noch keine aufgerufenen Kacheln."
      : "Noch keine Kacheln in dieser Kategorie.";
    grid.append(emptyCategoryInfo);
  }

  section.append(header, grid);
  tilesContainer.append(section);
}

// ── STATE UPDATE & RENDER ────────────────────────────────────────────────────

function update() {
  syncCategoryOrder();
  pruneVisitCounts();
  render();
}

function render() {
  tilesContainer.innerHTML = "";

  if (!links.length && !categoryOrder.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Noch keine Links oder Kategorien vorhanden. Füge oben deinen ersten Eintrag hinzu.";
    tilesContainer.append(empty);
    renderCategorySuggestions();
    return;
  }

  const q = searchQuery;
  const displayLinks = q
    ? links.filter(link =>
        link.title.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        normalizeCategory(link.category).toLowerCase().includes(q)
      )
    : links;

  const groupedLinks = new Map();
  displayLinks.forEach(link => {
    const category = normalizeCategory(link.category);
    if (!groupedLinks.has(category)) groupedLinks.set(category, []);
    groupedLinks.get(category).push(link);
  });

  const mostVisitedLinks = getMostVisitedLinks();
  const displayMostVisited = q
    ? mostVisitedLinks.filter(link =>
        link.title.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        normalizeCategory(link.category).toLowerCase().includes(q)
      )
    : mostVisitedLinks;

  if (displayMostVisited.length) {
    renderCategorySection(MOST_VISITED_CATEGORY, displayMostVisited, { isAutomatic: true });
  }

  let anyVisible = displayMostVisited.length > 0;
  categoryOrder.forEach(category => {
    const items = groupedLinks.get(category) || [];
    if (q && !items.length) return;
    anyVisible = true;
    renderCategorySection(category, items);
  });

  if (q && !anyVisible) {
    const noResults = document.createElement("div");
    noResults.className = "empty";
    noResults.textContent = `Keine Favoriten für „${searchQuery}" gefunden.`;
    tilesContainer.append(noResults);
  }

  renderCategorySuggestions();
}

// ── INITIALISIERUNG ──────────────────────────────────────────────────────────

let links = loadLinks();
let categoryOrder = loadCategoryOrder();
let visitCounts = loadVisitCounts();
saveLinks(links);
update();

// ── EVENT LISTENERS ──────────────────────────────────────────────────────────

document.addEventListener("click", event => {
  if (!activeCategoryMenu) return;
  if (event.target.closest(".category-menu") || event.target.closest(".change-category-btn")) return;
  closeCategoryMenu();
});

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  render();
});

linkForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const url = normalizeUrl(urlInput.value);
  const category = normalizeCategory(categoryInput.value);

  if (!category) return;

  if (!title && !url) {
    if (!categoryOrder.includes(category)) {
      categoryOrder.unshift(category);
      saveCategoryOrder(categoryOrder);
    }
    update();
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
    categoryOrder.unshift(category);
    saveCategoryOrder(categoryOrder);
  }
  update();
  linkForm.reset();
  titleInput.focus();
});

exportBtn.addEventListener("click", () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    categoryOrder,
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

sortCategoriesBtn.addEventListener("click", () => {
  openSortCategoriesDialog();
});

sortCategoriesForm.addEventListener("submit", event => {
  event.preventDefault();
  categoryOrder = [...pendingCategoryOrder];
  saveCategoryOrder(categoryOrder);
  pendingCategoryOrder = [];
  update();
  sortCategoriesDialog.close();
});

sortCategoriesCancelBtn.addEventListener("click", () => {
  pendingCategoryOrder = [];
  sortCategoriesDialog.close();
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

    const importedCategoryOrder = Array.isArray(parsed.categoryOrder)
      ? parsed.categoryOrder.filter(c => typeof c === "string" && c.trim()).map(c => c.trim())
      : [];

    const shouldReplace = confirm(
      `Es wurden ${importedLinks.length} Links gefunden. Bestehende Links ersetzen?`
    );

    if (shouldReplace) {
      setLinks(importedLinks);
      if (importedCategoryOrder.length) {
        categoryOrder = importedCategoryOrder;
        saveCategoryOrder(categoryOrder);
      }
    } else {
      setLinks([...importedLinks, ...links]);
      if (importedCategoryOrder.length) {
        const newCategories = importedCategoryOrder.filter(c => !categoryOrder.includes(c));
        if (newCategories.length) {
          categoryOrder = [...newCategories, ...categoryOrder];
          saveCategoryOrder(categoryOrder);
        }
      }
    }

    update();
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
    categoryOrder.unshift(normalizedCategory);
    saveCategoryOrder(categoryOrder);
  }

  update();
  editDialog.close();
  editingLinkId = null;
});

editCancelBtn.addEventListener("click", () => {
  editDialog.close();
  editingLinkId = null;
});

