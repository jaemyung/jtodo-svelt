<script lang="ts">
  import { onMount } from 'svelte';
  import TodoItem from './components/TodoItem.svelte';
  import { todoApi } from './lib/api';
  import type { Todo } from './types/todo';

  let todos: Todo[] = [];
  let newTodoTitle = '';
  let loading = false;
  let editingTodo: Todo | null = null;
  let editTitle = '';

  onMount(async () => {
    await loadTodos();
  });

  async function loadTodos() {
    try {
      loading = true;
      todos = await todoApi.getTodos();
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      loading = false;
    }
  }

  async function addTodo() {
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todoApi.createTodo({ title: newTodoTitle.trim() });
      todos = [...todos, newTodo];
      newTodoTitle = '';
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }

  async function toggleTodo(event: CustomEvent) {
    const { id, completed } = event.detail;
    
    try {
      const updatedTodo = await todoApi.toggleTodo(id, completed);
      todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  }

  async function deleteTodo(event: CustomEvent) {
    const { id } = event.detail;
    
    try {
      await todoApi.deleteTodo(id);
      todos = todos.filter(todo => todo.id !== id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  function startEdit(event: CustomEvent) {
    const { id, title } = event.detail;
    editingTodo = todos.find(todo => todo.id === id) || null;
    editTitle = title;
  }

  async function saveEdit() {
    if (!editingTodo || !editTitle.trim()) return;

    try {
      const updatedTodo = await todoApi.updateTodo(editingTodo.id, { title: editTitle.trim() });
      todos = todos.map(todo => todo.id === editingTodo!.id ? updatedTodo : todo);
      editingTodo = null;
      editTitle = '';
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  function cancelEdit() {
    editingTodo = null;
    editTitle = '';
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (editingTodo) {
        saveEdit();
      } else {
        addTodo();
      }
    }
  }
</script>

<main>
  <div class="container">
    <h1>Todo App</h1>
    
    <div class="add-todo">
      <input
        type="text"
        bind:value={newTodoTitle}
        placeholder="Add a new todo..."
        on:keypress={handleKeyPress}
        class="todo-input"
      />
      <button on:click={addTodo} class="btn btn-add">
        Add
      </button>
    </div>

    {#if loading}
      <div class="loading">Loading todos...</div>
    {:else if todos.length === 0}
      <div class="empty-state">No todos yet. Add one above!</div>
    {:else}
      <div class="todos-list">
        {#each todos as todo (todo.id)}
          {#if editingTodo && editingTodo.id === todo.id}
            <div class="edit-todo">
              <input
                type="text"
                bind:value={editTitle}
                on:keypress={handleKeyPress}
                class="todo-input"
                autofocus
              />
              <button on:click={saveEdit} class="btn btn-save">Save</button>
              <button on:click={cancelEdit} class="btn btn-cancel">Cancel</button>
            </div>
          {:else}
            <TodoItem
              {todo}
              on:toggle={toggleTodo}
              on:delete={deleteTodo}
              on:edit={startEdit}
            />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem 1rem;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .add-todo {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .todo-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }

  .todo-input:focus {
    outline: none;
    border-color: #3b82f6;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .btn-add {
    background: #10b981;
    color: white;
  }

  .btn-add:hover {
    background: #059669;
  }

  .btn-save {
    background: #3b82f6;
    color: white;
  }

  .btn-save:hover {
    background: #2563eb;
  }

  .btn-cancel {
    background: #6b7280;
    color: white;
  }

  .btn-cancel:hover {
    background: #4b5563;
  }

  .edit-todo {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    background: #f3f4f6;
    border-radius: 8px;
  }

  .loading {
    text-align: center;
    color: #6b7280;
    font-size: 1.125rem;
    padding: 2rem;
  }

  .empty-state {
    text-align: center;
    color: #6b7280;
    font-size: 1.125rem;
    padding: 2rem;
    font-style: italic;
  }

  .todos-list {
    display: flex;
    flex-direction: column;
  }
</style> 