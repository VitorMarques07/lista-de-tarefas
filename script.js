(function () {
  "use strict";

  var STORAGE_KEY = "taskflow:tasks";
  var tasks = [];
  var filter = "all";

  var $ = function (id) { return document.getElementById(id); };
  var form = $("form"), input = $("input"), list = $("list"), empty = $("empty");
  var clearBtn = $("clear-done");

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      tasks = Array.isArray(data)
        ? data.filter(function (t) { return t && typeof t.text === "string"; })
               .map(function (t) { return { id: String(t.id), text: t.text, done: !!t.done }; })
        : [];
    } catch (e) {
      tasks = [];
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) { /* armazenamento indisponível */ }
  }

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addTask(text) {
    text = text.trim();
    if (!text) return false;
    tasks.unshift({ id: newId(), text: text, done: false });
    save();
    render(tasks[0].id);
    return true;
  }

  function toggleTask(id) {
    tasks.forEach(function (t) { if (t.id === id) t.done = !t.done; });
    save();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    save();
    render();
  }

  function clearDone() {
    tasks = tasks.filter(function (t) { return !t.done; });
    save();
    render();
  }

  function visibleTasks() {
    return tasks.filter(function (t) {
      return filter === "all" || (filter === "done" ? t.done : !t.done);
    });
  }

  function emptyMessage() {
    if (tasks.length === 0) return "Nenhuma tarefa por aqui. Escreva a primeira acima.";
    if (filter === "pending") return "Tudo concluído. Nada pendente.";
    if (filter === "done") return "Nenhuma tarefa concluída ainda.";
    return "";
  }

  function buildItem(t, isNew) {
    var li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "") + (isNew ? " enter" : "");
    li.dataset.id = t.id;

    var label = document.createElement("label");
    label.className = "check";
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.setAttribute("aria-label", "Concluir: " + t.text);
    var box = document.createElement("span");
    box.className = "box";
    label.appendChild(cb);
    label.appendChild(box);

    var text = document.createElement("span");
    text.className = "text";
    text.textContent = t.text;

    var del = document.createElement("button");
    del.type = "button";
    del.className = "btn-del";
    del.setAttribute("aria-label", "Excluir: " + t.text);
    del.textContent = "×";

    li.appendChild(label);
    li.appendChild(text);
    li.appendChild(del);
    return li;
  }

  function renderProgress() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    $("percent").textContent = pct + "%";
    $("bar-fill").style.width = pct + "%";
    $("bar").setAttribute("aria-valuenow", String(pct));
    $("progress-text").textContent = total === 0
      ? "Nenhuma tarefa ainda"
      : done + " de " + total + (total === 1 ? " tarefa concluída" : " tarefas concluídas");
    $("count-all").textContent = total;
    $("count-done").textContent = done;
    $("count-pending").textContent = total - done;
    clearBtn.hidden = done === 0;
  }

  function render(newId) {
    var items = visibleTasks();
    list.textContent = "";
    items.forEach(function (t) { list.appendChild(buildItem(t, t.id === newId)); });
    var msg = items.length === 0 ? emptyMessage() : "";
    empty.textContent = msg;
    empty.hidden = !msg;
    renderProgress();
  }

  function setFilter(value) {
    filter = value;
    document.querySelectorAll(".filter").forEach(function (b) {
      var active = b.dataset.filter === value;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    render();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (addTask(input.value)) {
      input.value = "";
      if (filter === "done") setFilter("all");
    }
    input.focus();
  });

  list.addEventListener("change", function (e) {
    var li = e.target.closest(".task");
    if (li && e.target.type === "checkbox") toggleTask(li.dataset.id);
  });

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-del");
    var li = btn && btn.closest(".task");
    if (li) deleteTask(li.dataset.id);
  });

  document.querySelectorAll(".filter").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.dataset.filter); });
  });
  clearBtn.addEventListener("click", clearDone);

  $("date").textContent = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  load();
  render();
})();
