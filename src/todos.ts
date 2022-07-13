import {Store} from './store.js';

export interface Todo {
  readonly completed: boolean;
  readonly title: string;
}

const localStorageKey = `x-todos-snugjs`;

class TodosStore extends Store<readonly Todo[]> {
  constructor() {
    const item = localStorage.getItem(localStorageKey);

    super(item ? JSON.parse(item) : []);

    this.subscribe(() =>
      localStorage.setItem(localStorageKey, JSON.stringify(this.value)),
    );
  }

  get activeTodos(): readonly Todo[] {
    return this.value.filter(({completed}) => !completed);
  }

  get completedTodos(): readonly Todo[] {
    return this.value.filter(({completed}) => completed);
  }

  get isAllCompleted(): boolean {
    return this.value.every((todo) => todo.completed);
  }

  add(title: string): boolean {
    title = title.trim();

    if (!title) {
      return false;
    }

    this.value = [...this.value, {completed: false, title}];

    return true;
  }

  clearCompleted(): void {
    this.value = this.activeTodos;
  }

  toggleAll(completed: boolean): void {
    this.value = this.value.map((todo) => ({...todo, completed}));
  }

  destroy(index: number): void {
    this.value = this.value.filter((_todo, otherIndex) => otherIndex !== index);
  }

  toggle(index: number): void {
    this.value = this.value.map((todo, otherIndex) =>
      otherIndex === index ? {...todo, completed: !todo.completed} : todo,
    );
  }

  update(index: number, title: string): void {
    this.value = this.value.map((todo, otherIndex) =>
      otherIndex === index ? {...todo, title} : todo,
    );
  }
}

export const todos = new TodosStore();
