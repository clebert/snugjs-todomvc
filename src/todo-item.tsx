import {Store} from './store.js';
import {todos} from './todos.js';
import {createElement} from '@snugjs/html';
import classNames from 'classnames';
import {CustomElement, createElementRef} from 'snugjs';

export const TodoItem = CustomElement.define(
  `x-todo-item`,
  {index: `number`},
  function* ({next, signal}) {
    const isEditing = new Store(false).subscribe(next, {signal});
    const toggleInput = createElementRef(`input`);

    toggleInput.element.addEventListener(`change`, () =>
      todos.toggle(this.props.index),
    );

    const titleLabel = createElementRef(`label`);

    titleLabel.element.addEventListener(`dblclick`, () => {
      isEditing.value = true;
    });

    const destroyButton = createElementRef(`button`);

    destroyButton.element.addEventListener(`click`, () =>
      todos.destroy(this.props.index),
    );

    const editInput = createElementRef(`input`);
    const {completed, title} = todos.value[this.props.index]!;

    const saveTodo = () => {
      const newTitle = editInput.element.value.trim();

      if (!newTitle) {
        todos.destroy(this.props.index);
      } else if (newTitle !== title) {
        todos.update(this.props.index, newTitle);
      } else {
        isEditing.value = false;
      }
    };

    editInput.element.addEventListener(`blur`, saveTodo);

    editInput.element.addEventListener(`keyup`, ({key}) => {
      if (key === `Enter`) {
        saveTodo();
      } else if (key === `Escape`) {
        isEditing.value = false;
      }
    });

    while (true) {
      this.replaceChildren(
        <li class={classNames({completed}, {editing: isEditing.value})}>
          <div class="view">
            <input
              key={toggleInput.key}
              class="toggle"
              type="checkbox"
              checked={completed}
            />
            <label key={titleLabel.key}>{title}</label>
            <button key={destroyButton.key} class="destroy" />
          </div>
          {isEditing.value && (
            <input key={editInput.key} class="edit" value={title} />
          )}
        </li>,
      );

      if (isEditing.value) {
        editInput.element.focus();
        editInput.element.select();
      }

      yield;
    }
  },
);
