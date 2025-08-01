<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Todo } from '../types/todo';

  export let todo: Todo;

  const dispatch = createEventDispatcher();

  function handleToggle() {
    dispatch('toggle', { id: todo.id, completed: !todo.completed });
  }

  function handleDelete() {
    dispatch('delete', { id: todo.id });
  }

  function handleEdit() {
    dispatch('edit', { id: todo.id, title: todo.title });
  }
</script>

<div class="todo-item" class:completed={todo.completed}>
  <div class="todo-content">
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={handleToggle}
      class="todo-checkbox"
    />
    <span class="todo-title">{todo.title}</span>
  </div>
  <div class="todo-actions">
    <button on:click={handleEdit} class="btn btn-edit">
      Edit
    </button>
    <button on:click={handleDelete} class="btn btn-delete">
      Delete
    </button>
  </div>
</div>

<style>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 0.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .todo-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .todo-item.completed {
    opacity: 0.7;
  }

  .todo-item.completed .todo-title {
    text-decoration: line-through;
    color: #666;
  }

  .todo-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .todo-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .todo-title {
    font-size: 1rem;
    color: #333;
    word-break: break-word;
  }

  .todo-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .btn-edit {
    background: #3b82f6;
    color: white;
  }

  .btn-edit:hover {
    background: #2563eb;
  }

  .btn-delete {
    background: #ef4444;
    color: white;
  }

  .btn-delete:hover {
    background: #dc2626;
  }
</style> 