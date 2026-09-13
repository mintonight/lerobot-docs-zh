(function () {
  "use strict";

  var DATA = window.LEROBOT_DATA || {};
  var CATS = DATA.categories || [];
  var ITEMS = DATA.items || [];
  var STORAGE_KEY = "lerobot-minitool-cat";

  var state = { cat: "all", query: "" };
  var searchTimer = null;
  var toastTimer = null;
  var lastPicked = null;

  var chipsEl = document.getElementById("chips");
  var listEl = document.getElementById("list");
  var searchEl = document.getElementById("search");
  var clearEl = document.getElementById("clearBtn");
  var toastEl = document.getElementById("toast");

  function catName(id) {
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i].id === id) {
        return CATS[i].name;
      }
    }
    return id;
  }

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(cmd) {
    var lines = esc(cmd).split("\n");
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var lead = /^\s*/.exec(line)[0];
      var rest = line.slice(lead.length);
      rest = rest.replace(/(^|\s)(--[A-Za-z0-9_.-]+)/g, function (m, sp, flag) {
        return sp + '<span class="hl-flag">' + flag + "</span>";
      });
      rest = rest.replace(/(\$\{[A-Za-z0-9_]+\})/g, '<span class="hl-var">$1</span>');
      rest = rest.replace(/^([A-Za-z][A-Za-z0-9_.-]*)/, '<span class="hl-cmd">$1</span>');
      out.push(lead + rest);
    }
    return out.join("\n");
  }

  function visibleItems() {
    var q = state.query;
    var out = [];
    for (var i = 0; i < ITEMS.length; i++) {
      var item = ITEMS[i];
      if (q) {
        var hay = (item.title + "\n" + (item.desc || "") + "\n" + (item.cmd || "")).toLowerCase();
        if (hay.indexOf(q) !== -1) {
          out.push(item);
        }
      } else if (state.cat === "all" || item.cat === state.cat) {
        out.push(item);
      }
    }
    return out;
  }

  function selectNode(node) {
    var selection = window.getSelection ? window.getSelection() : null;
    if (!selection || !document.createRange) {
      return false;
    }
    try {
      var range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
      return true;
    } catch (e) {
      return false;
    }
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(function () {
      toastEl.hidden = true;
    }, 1800);
  }

  function buildCard(item) {
    var card = document.createElement("article");
    card.className = "card";

    var head = document.createElement("header");
    head.className = "card-head";

    var title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title;
    head.appendChild(title);

    var tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = catName(item.cat);
    head.appendChild(tag);

    card.appendChild(head);

    if (item.desc) {
      var desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = item.desc;
      card.appendChild(desc);
    }

    if (item.cmd) {
      var box = document.createElement("div");
      box.className = "cmd-box";
      box.setAttribute("role", "button");
      box.setAttribute("tabindex", "0");
      box.setAttribute("aria-label", "选中命令：" + item.title);

      var pre = document.createElement("pre");
      pre.className = "cmd";
      pre.innerHTML = highlight(item.cmd);
      box.appendChild(pre);

      var hint = document.createElement("span");
      hint.className = "cmd-hint";
      hint.textContent = "点击选中 · 长按复制";
      box.appendChild(hint);

      (function (target, preEl) {
        function pick() {
          if (!selectNode(preEl)) {
            showToast("请长按命令文本手动选择复制");
            return;
          }
          if (lastPicked && lastPicked !== target) {
            lastPicked.className = lastPicked.className.replace(" is-picked", "");
          }
          if (target.className.indexOf("is-picked") === -1) {
            target.className += " is-picked";
          }
          lastPicked = target;
          showToast("已选中，长按后选择「复制」");
        }

        target.addEventListener("click", pick);
        target.addEventListener("keydown", function (event) {
          var code = event.key ? event.key : String.fromCharCode(event.keyCode);
          if (code === "Enter" || code === " " || event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            pick();
          }
        });
      })(box, pre);

      card.appendChild(box);
    }

    return card;
  }

  function renderList() {
    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }
    var items = visibleItems();
    if (items.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "没有匹配的内容";
      listEl.appendChild(empty);
      return;
    }
    for (var i = 0; i < items.length; i++) {
      listEl.appendChild(buildCard(items[i]));
    }
  }

  function setActiveChip() {
    var chips = chipsEl.children;
    for (var i = 0; i < chips.length; i++) {
      var el = chips[i];
      var active = el.getAttribute("data-cat") === state.cat;
      if (active) {
        if (el.className.indexOf("is-active") === -1) {
          el.className += " is-active";
        }
      } else if (el.className.indexOf("is-active") !== -1) {
        el.className = el.className.replace(" is-active", "");
      }
    }
  }

  function updateClear() {
    clearEl.hidden = !searchEl.value;
  }

  function saveCat() {
    try {
      localStorage.setItem(STORAGE_KEY, state.cat);
    } catch (e) {
      /* storage unavailable */
    }
  }

  function loadCat() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === "all" || catName(saved) !== saved)) {
        state.cat = saved;
      }
    } catch (e) {
      /* storage unavailable */
    }
  }

  function makeChips() {
    var defs = [{ id: "all", name: "全部" }].concat(CATS);
    for (var i = 0; i < defs.length; i++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.setAttribute("data-cat", defs[i].id);
      btn.textContent = defs[i].name;
      chipsEl.appendChild(btn);
    }
    chipsEl.addEventListener("click", function (event) {
      var el = event.target;
      while (el && el !== chipsEl && !el.getAttribute("data-cat")) {
        el = el.parentNode;
      }
      if (!el || el === chipsEl) {
        return;
      }
      state.cat = el.getAttribute("data-cat");
      state.query = "";
      searchEl.value = "";
      updateClear();
      setActiveChip();
      renderList();
      saveCat();
    });
  }

  function applySearch() {
    state.query = searchEl.value.replace(/^\s+|\s+$/g, "").toLowerCase();
    if (state.query) {
      state.cat = "all";
      setActiveChip();
    }
    updateClear();
    renderList();
  }

  function scheduleSearch() {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(applySearch, 120);
  }

  function supportsFlexGap() {
    var flex = document.createElement("div");
    flex.style.position = "absolute";
    flex.style.visibility = "hidden";
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
    document.body.appendChild(flex);
    var supported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    return supported;
  }

  if (supportsFlexGap()) {
    document.documentElement.className += " supports-flex-gap";
  }

  loadCat();
  makeChips();
  setActiveChip();
  updateClear();
  renderList();

  searchEl.addEventListener("input", scheduleSearch);
  searchEl.addEventListener("search", applySearch);
  clearEl.addEventListener("click", function () {
    searchEl.value = "";
    applySearch();
    searchEl.focus();
  });
})();
