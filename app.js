// 待辦清單應用程式：純原生 JavaScript 實作，資料儲存在 localStorage
(function () {
  const STORAGE_KEY = "todo-list-items";
  const THEME_STORAGE_KEY = "todo-list-theme";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyMessage = document.getElementById("empty-message");
  const remainingCount = document.getElementById("remaining-count");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");
  const themeToggleLabel = document.getElementById("theme-toggle-label");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  // 從 localStorage 讀取待辦事項，讀取失敗時回傳空陣列
  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  // 將待辦事項寫回 localStorage
  function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  let todos = loadTodos();
  let currentFilter = "all";

  // 套用主題：有手動選擇時優先使用，否則跟隨作業系統設定
  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggleIcon.textContent = isDark ? "☀️" : "🌙";
    themeToggleLabel.textContent = isDark ? "淺色模式" : "深色模式";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  function getCurrentTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || (systemTheme.matches ? "dark" : "light");
  }

  function updateFilterButtons() {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === currentFilter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function getVisibleTodos() {
    if (currentFilter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }

  // 依目前的 todos 重新繪製整個清單畫面
  function render() {
    list.innerHTML = "";

    const visibleTodos = getVisibleTodos();
    visibleTodos.forEach((todo) => {
      const item = document.createElement("li");
      item.className = "todo-item" + (todo.completed ? " completed" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const text = document.createElement("span");
      text.textContent = todo.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "刪除";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      item.append(checkbox, text, deleteBtn);
      list.appendChild(item);
    });

    // 篩選後沒有項目時，顯示符合目前狀態的提示文字
    const emptyMessages = {
      all: "還沒有任何待辦事項，新增一個吧!",
      active: "目前沒有未完成的待辦事項。",
      completed: "目前沒有已完成的待辦事項。",
    };
    emptyMessage.textContent = emptyMessages[currentFilter];
    emptyMessage.style.display = visibleTodos.length === 0 ? "block" : "none";

    const remaining = todos.filter((todo) => !todo.completed).length;
    remainingCount.textContent = `未完成：${remaining} 項`;
  }

  // 新增一筆待辦事項，空白內容不新增
  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    todos.push({
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    });

    saveTodos(todos);
    render();
  }

  // 切換指定待辦事項的完成狀態
  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
    render();
  }

  // 刪除指定的待辦事項
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
    render();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
  });

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      updateFilterButtons();
      render();
    });
  });

  systemTheme.addEventListener("change", () => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(getCurrentTheme());
    }
  });

  applyTheme(getCurrentTheme());
  updateFilterButtons();
  render();
})();
