import {todos} from './todos.js';
import {createElement, createFragment} from '@snugjs/html';
import {CustomElement, createElementRef} from 'snugjs';

export const TodoFooter = CustomElement.define(
  `x-todo-footer`,
  {},
  function* ({next, signal}) {
    todos.subscribe(next, {signal});

    const clearCompleted = createElementRef(`button`);

    clearCompleted.element.addEventListener(`click`, () =>
      todos.clearCompleted(),
    );

    while (true) {
      this.replaceChildren(
        todos.value.length === 0 ? (
          <></>
        ) : (
          <footer class="footer">
            <span class="todo-count">
              <strong>{todos.activeTodos.length}</strong>
              {` `}
              {todos.activeTodos.length === 1 ? `item` : `items`} left
            </span>
            {todos.completedTodos.length > 0 && (
              <button key={clearCompleted.key} class="clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        ),
      );

      yield;
    }
  },
);
