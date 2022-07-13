export class Store<TValue> {
  readonly #listeners = new Set<() => void>();

  #value: TValue;

  constructor(initialValue: TValue) {
    this.#value = initialValue;
  }

  get value(): TValue {
    return this.#value;
  }

  set value(value: TValue) {
    if (!Object.is(value, this.#value)) {
      this.#value = value;

      for (const listener of this.#listeners) {
        listener();
      }
    }
  }

  subscribe(
    listener: () => void,
    options?: {readonly signal: AbortSignal},
  ): this {
    this.#listeners.add(listener);

    options?.signal.addEventListener(`abort`, () =>
      this.#listeners.delete(listener),
    );

    return this;
  }
}
