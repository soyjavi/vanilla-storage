import { jsonAdapter, memoryAdapter, storageAdapter } from './adapters';

const state = new WeakMap();

export {
  jsonAdapter,
  memoryAdapter,
  storageAdapter,
};

export default class Store {
  constructor(props = {}) {
    const {
      adapter: Adapter = jsonAdapter,
      autoSave = true,
      defaults = {},
      filename = 'store',
    } = props;
    const adapter = new Adapter({ defaults, filename });

    state.set(this, {
      adapter,
      autoSave,
      data: adapter.read(),
      key: 'default',
      memoryPool: [],
    });

    return this;
  }

  findOne(query) {
    const { data, key } = state.get(this);
    const queryFields = Object.keys(query);

    return data[key].find((row) => {
      let found = true;

      queryFields.some((field) => {
        found = (row[field] === query[field]);
        return !found;
      });

      return found;
    });
  }

  find(query = {}) {
    const { data, key } = state.get(this);
    const queryFields = Object.keys(query);
    const values = [];

    data[key].forEach((row) => {
      let found = true;

      queryFields.some((field) => {
        found = (row[field] === query[field]);
        return !found;
      });

      if (found) values.push(row);
    });

    return values.length > 0 ? values : undefined;
  }

  get(key) {
    state.set(this, Object.assign(state.get(this), { key }));

    return this;
  }

  push(value = {}) {
    const { autoSave, key, memoryPool } = state.get(this);

    if (autoSave) this.save(value);
    else memoryPool.push({ key, value });

    return value;
  }

  save(value) {
    const {
      adapter, data, key, memoryPool = [],
    } = state.get(this);
    const isArray = data[key] === undefined || Array.isArray(data[key]);

    if (value) {
      if (isArray) data[key] = data[key] ? [...data[key], value] : [value];
      else data[key] = Object.assign({}, data[key], value);
      adapter.write(data);
    } else if (memoryPool.length > 0) {
      memoryPool.forEach((item) => {
        data[item.key] = data[item.key] ? [...data[item.key], item.value] : [item.value];
      });
      adapter.write(data);
      state.set(this, Object.assign(state.get(this), { memoryPool: [] }));
    }
  }

  update(query, nextData) {
    const { adapter, data, key } = state.get(this);
    const queryFields = Object.keys(query);
    const values = [];

    data[key] = data[key].map((row) => {
      let found = true;
      let changes;

      queryFields.some((field) => {
        found = (row[field] === query[field]);
        return !found;
      });

      if (found) {
        changes = Object.assign(row, nextData);
        values.push(changes);
      }

      return changes || row;
    });

    if (values.length > 0) adapter.write(data);

    return values;
  }

  get value() {
    const { data, key } = state.get(this);

    return data[key];
  }

  wipe() {
    const { adapter } = state.get(this);

    adapter.write();
  }
}
