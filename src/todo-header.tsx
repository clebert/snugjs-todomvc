import {todos} from './todos.js';
import {createElement} from '@snugjs/html';
import {CustomElement, createElementRef} from 'snugjs';

export const TodoHeader = CustomElement.define(
  `x-todo-header`,
  {},
  function* () {
    const newTodoInput = createElementRef(`input`);

    newTodoInput.element.addEventListener(`keyup`, ({key}) => {
      if (key === `Enter` && todos.add(newTodoInput.element.value)) {
        newTodoInput.element.value = ``;
      }
    });

    this.replaceChildren(
      <header class="header">
        <h1>todos</h1>
        <input
          key={newTodoInput.key}
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>,
    );
  },
);
