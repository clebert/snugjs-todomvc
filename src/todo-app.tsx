import {TodoFooter} from './todo-footer.js';
import {TodoHeader} from './todo-header.js';
import {TodoList} from './todo-list.js';
import {createElement} from '@snugjs/html';
import {CustomElement} from 'snugjs';

export const TodoApp = CustomElement.define(`x-todo-app`, {}, function* () {
  this.replaceChildren(
    <section class="todoapp">
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </section>,
  );
});
