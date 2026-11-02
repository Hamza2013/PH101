(function () {
  "use strict";
  var DRAFT_KEY = "ph101-draft";
  var isAdmin = /[?&]admin\b/.test(location.search);
  var data = window.COURSE;

  // In admin mode, keep unsaved edits on this computer until downloaded.
  if (isAdmin) {
    try {
      var d = localStorage.getItem(DRAFT_KEY);
      if (d) data = JSON.parse(d);
    } catch (e) {}
  }

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function byWeek(a, b) { return (a.week || 0) - (b.week || 0); }

  // ---------- Masthead ----------
  function renderInfo() {
    var i = data.info || {};
    $("m-inst").textContent = i.institute || "";
    $("m-code").textContent = i.code || "";
    $("m-title").textContent = i.title || "";
    $("m-sem").textContent = i.semester || "";
    $("m-dept").textContent = i.department || "";
    $("about").textContent = i.about || "";
    $("p-inst").textContent = i.instructor || "";
    $("p-lab").textContent = i.labEngineer || "";
    $("p-contact").textContent = i.contact || "";
    $("f-line").textContent = (i.code || "") + " " + (i.title || "") + " · " + (i.semester || "") + " · " + (i.institute || "");
    document.title = (i.code || "") + " " + (i.title || "");
  }

  // Damped oscillation trace, x(t) = A e^(-γt) cos(ωt)
  (function drawTrace() {
    var d = "M0 30";
    for (var x = 0; x <= 600; x += 2) {
      var t = x / 600;
      var y = 30 - 26 * Math.exp(-2.2 * t) * Math.cos(2 * Math.PI * 7 * t);
      d += " L" + x + " " + y.toFixed(2);
    }
    $("trace-path").setAttribute("d", d);
  })();

  // ---------- Announcements ----------
  function renderAnnouncements() {
    var ul = $("announcements");
    ul.innerHTML = "";
    var list = (data.announcements || []).slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    if (!list.length) { ul.appendChild(el("li", "empty", "No announcements yet.")); return; }
    list.forEach(function (a) {
      var li = el("li");
      var t = el("time", null, formatDate(a.date));
      li.appendChild(t);
      li.appendChild(document.createTextNode(a.text || a.title || ""));
      addDelete(li, "announcements", a);
      ul.appendChild(li);
    });
  }
  function formatDate(s) {
    if (!s) return "";
    var d = new Date(s + "T00:00:00");
    return isNaN(d) ? s : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  // ---------- Material lists ----------
  function renderList(key, listId, label) {
    var ol = $(listId);
    ol.innerHTML = "";
    var items = (data[key] || []).slice().sort(byWeek);
    if (!items.length) { ol.appendChild(el("li", "empty", "Nothing posted yet.")); return; }
    items.forEach(function (it) {
      var li = el("li", "row");
      li.dataset.search = [it.title, it.description, it.objective, "week " + it.week].join(" ").toLowerCase();
      var wk = el("div", "wk", label);
      wk.appendChild(el("b", null, it.week != null ? String(it.week).padStart(2, "0") : "—"));
      var body = el("div");
      body.appendChild(el("h3", null, it.title || ""));
      if (it.description) body.appendChild(el("p", null, it.description));
      if (it.objective) {
        var o = el("p", "obj");
        o.appendChild(el("b", null, "Objective"));
        o.appendChild(document.createTextNode(it.objective));
        body.appendChild(o);
      }
      addDelete(body, key, it);
      var links = el("div", "links");
      (it.links || []).forEach(function (l) {
        if (!l.url) return;
        var a = el("a", "chip", l.label || "Open");
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        links.appendChild(a);
      });
      li.appendChild(wk); li.appendChild(body); li.appendChild(links);
      ol.appendChild(li);
    });
  }

  // ---------- Videos ----------
  function youtubeId(url) {
    if (!url) return null;
    var m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function renderDemos() {
    var box = $("list-demos");
    box.innerHTML = "";
    var items = data.demos || [];
    if (!items.length) { box.appendChild(el("p", "empty", "No demonstrations posted yet.")); return; }
    items.forEach(function (v) {
      var card = el("article", "video");
      card.dataset.search = [v.title, v.description, v.topic].join(" ").toLowerCase();
      var player = el("div", "player");
      var id = youtubeId(v.video);
      if (id) {
        // Load the YouTube player only when clicked (keeps the page fast).
        var b = el("button");
        b.type = "button";
        b.setAttribute("aria-label", "Play " + (v.title || "video"));
        b.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
        b.addEventListener("click", function () {
          var f = document.createElement("iframe");
          f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
          f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
          f.allowFullscreen = true;
          f.title = v.title || "Demonstration";
          player.replaceChildren(f);
        });
        player.appendChild(b);
      } else if (v.video && /\.(mp4|webm|ogg)(\?|$)/i.test(v.video)) {
        var vid = document.createElement("video");
        vid.src = v.video; vid.controls = true; vid.preload = "metadata";
        player.appendChild(vid);
      } else if (v.video) {
        var a = el("a", "out", "Open video ↗");
        a.href = v.video; a.target = "_blank"; a.rel = "noopener";
        player.appendChild(a);
      }
      var body = el("div", "video-body");
      if (v.topic) body.appendChild(el("span", "topic", v.topic));
      body.appendChild(el("h3", null, v.title || ""));
      if (v.description) body.appendChild(el("p", null, v.description));
      addDelete(body, "demos", v);
      card.appendChild(player); card.appendChild(body);
      box.appendChild(card);
    });
  }

  function renderCounts() {
    var c = $("counts");
    c.innerHTML = "";
    [["lectures", "#lectures", "Lectures"], ["tutorials", "#tutorials", "Tutorials"],
     ["labs", "#lab", "Lab experiments"], ["demos", "#demos", "Demo videos"]].forEach(function (x) {
      var a = el("a"); a.href = x[1];
      a.appendChild(el("b", null, String((data[x[0]] || []).length)));
      a.appendChild(el("span", null, x[2]));
      c.appendChild(a);
    });
  }

  function renderAll() {
    renderInfo(); renderAnnouncements(); renderCounts();
    renderList("lectures", "list-lectures", "Week");
    renderList("tutorials", "list-tutorials", "Week");
    renderList("labs", "list-labs", "Lab");
    renderDemos();
    applySearch();
  }

  // ---------- Search ----------
  function applySearch() {
    var q = $("q").value.trim().toLowerCase();
    var any = false;
    document.querySelectorAll("[data-search]").forEach(function (n) {
      var hit = !q || n.dataset.search.indexOf(q) !== -1;
      n.hidden = !hit;
      if (hit) any = true;
    });
    $("no-results").hidden = !q || any;
  }
  $("q").addEventListener("input", applySearch);

  // ---------- Active tab ----------
  var tabs = document.querySelectorAll(".tabs a");
  var sections = ["home", "lectures", "tutorials", "lab", "demos"].map(function (id) { return $(id); });
  function markTab() {
    var cur = "home";
    sections.forEach(function (s) { if (s.getBoundingClientRect().top < 120) cur = s.id; });
    tabs.forEach(function (t) { t.classList.toggle("on", t.getAttribute("href") === "#" + cur); });
  }
  window.addEventListener("scroll", markTab, { passive: true });
  markTab();

  // ---------- Admin ----------
  function addDelete(container, key, item) {
    if (!isAdmin) return;
    var b = el("button", "del", "Remove");
    b.type = "button";
    b.addEventListener("click", function () {
      if (b.dataset.armed) {
        data[key] = (data[key] || []).filter(function (x) { return x !== item; });
        saveDraft(); renderAll(); msg("Removed. Download content.js to publish.");
      } else {
        b.dataset.armed = "1"; b.textContent = "Click again to remove";
      }
    });
    container.appendChild(b);
  }
  function saveDraft() { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch (e) {} }
  function msg(t) { $("admin-msg").textContent = t; }

  function fileText() {
    return "/* PH101 site content. Edit here, or open the site with ?admin and use the form. */\n" +
      "window.COURSE = " + JSON.stringify(data, null, 2) + ";\n";
  }

  function linkRow(label, url) {
    var r = el("div", "link-row");
    var l = el("input"); l.placeholder = "Label (e.g. Slides)"; l.value = label || "";
    var u = el("input"); u.placeholder = "URL or materials/…/file.pdf"; u.value = url || "";
    var x = el("button", null, "×"); x.type = "button"; x.setAttribute("aria-label", "Remove link");
    x.addEventListener("click", function () { r.remove(); });
    r.appendChild(l); r.appendChild(u); r.appendChild(x);
    $("f-link-rows").appendChild(r);
  }

  function syncForm() {
    var s = $("f-section").value;
    document.querySelector(".f-obj").hidden = s !== "labs";
    document.querySelector(".f-video").hidden = s !== "demos";
    document.querySelector(".f-topic").hidden = s !== "demos";
    document.querySelector(".f-links").hidden = s === "demos" || s === "announcements";
    document.querySelector(".f-week").hidden = s === "demos" || s === "announcements";
  }

  if (isAdmin) {
    $("admin").hidden = false;
    linkRow("Slides", "");
    $("f-section").addEventListener("change", syncForm);
    $("f-add-link").addEventListener("click", function () { linkRow(); });
    syncForm();

    $("add-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var s = $("f-section").value;
      var title = $("f-title").value.trim();
      var desc = $("f-desc").value.trim();
      var item;
      if (s === "announcements") {
        item = { date: new Date().toISOString().slice(0, 10), text: title + (desc ? " " + desc : "") };
      } else if (s === "demos") {
        item = { title: title, description: desc, topic: $("f-topic").value.trim(), video: $("f-video").value.trim() };
      } else {
        var links = [];
        document.querySelectorAll(".link-row").forEach(function (r) {
          var i = r.querySelectorAll("input");
          if (i[1].value.trim()) links.push({ label: i[0].value.trim() || "Open", url: i[1].value.trim() });
        });
        item = { week: Number($("f-week").value) || null, title: title, description: desc, links: links };
        if (s === "labs" && $("f-obj").value.trim()) item.objective = $("f-obj").value.trim();
      }
      (data[s] = data[s] || []).push(item);
      saveDraft(); renderAll();
      $("f-title").value = ""; $("f-desc").value = ""; $("f-obj").value = ""; $("f-video").value = ""; $("f-topic").value = "";
      $("f-link-rows").innerHTML = ""; linkRow("Slides", "");
      msg("Added. Download content.js and upload it to GitHub to publish.");
    });

    $("dl").addEventListener("click", function () {
      var blob = new Blob([fileText()], { type: "text/javascript" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "content.js";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      msg("Downloaded. Upload it to the repo to replace the old content.js.");
    });
    $("cp").addEventListener("click", function () {
      navigator.clipboard.writeText(fileText()).then(
        function () { msg("Copied. Paste over content.js on GitHub and commit."); },
        function () { msg("Copy blocked by the browser. Use Download instead."); });
    });
  }

  renderAll();
})();
