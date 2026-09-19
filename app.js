// 待辦清單應用程式：純原生 JavaScript 實作，資料儲存在 localStorage
(function () {
  const STORAGE_KEY = "todo-list-items";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyMessage = document.getElementById("empty-message");
  const remainingCount = document.getElementById("remaining-count");

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

  // 依目前的 todos 重新繪製整個清單畫面
  function render() {
    list.innerHTML = "";

    todos.forEach((todo) => {
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

    // 清單為空時顯示提示文字，否則隱藏
    emptyMessage.style.display = todos.length === 0 ? "block" : "none";

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

  render();
})();
