export default class memoryAdapter {
  constructor({ defaults = {} }) {
    this.store = defaults;

    return this;
  }

  read() {
    return this.store;
  }

  write(data = {}) {
    this.store = data;
  }
}
