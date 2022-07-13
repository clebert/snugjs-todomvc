import {createElement, createFragment} from '@snugjs/html';
import {CustomElement, createElementRef} from 'snugjs';
import {TodoItem} from './todo-item.js';
import {todos} from './todos.js';

export const TodoList = CustomElement.define(
  `x-todo-list`,
  {},
  function* ({next, signal}) {
    todos.subscribe(next, {signal});

    const toggleAllInput = createElementRef(`input`);

    toggleAllInput.element.addEventListener(`change`, () =>
      todos.toggleAll(toggleAllInput.element.checked),
    );

    while (true) {
      this.replaceChildren(
        todos.value.length === 0 ? (
          <></>
        ) : (
          <section class="main">
            <input
              key={toggleAllInput.key}
              id="toggle-all"
              class="toggle-all"
              type="checkbox"
              checked={todos.isAllCompleted}
            />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
              {todos.value.map((todo, index) => (
                <TodoItem key={todo} index={index} />
              ))}
            </ul>
          </section>
        ),
      );

      yield;
    }
  },
);
