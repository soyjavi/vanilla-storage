import { jsonAdapter } from './adapters';

const state = new WeakMap();

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

  }

  find(query) {
    const { data } = state.get(this);

  }

  get(key) {
    state.set(this, Object.assign(state.get(this), { key }));

    return this;
  }

  push(value = {}) {
    const { autoSave, key, memoryPool } = state.get(this);

    if (autoSave) this.save(value);
    else memoryPool.push({ key, value });

    return this;
  }

  save(value) {
    const {
      adapter, data, key, memoryPool = [],
    } = state.get(this);

    if (value) {
      data[key] = data[key] ? [...data[key], value] : [value];
      adapter.write(data);
    } else if (memoryPool.length > 0) {
      memoryPool.forEach((item) => {
        data[item.key] = data[item.key] ? [...data[item.key], item.value] : [item.value];
      });
      adapter.write(data);
      state.set(this, Object.assign(state.get(this), { memoryPool: [] }));
    }
  }

  update(query, data) {
    const { adapter, data } = state.get(this);

    const rows = this.find(query);
    // @TODO: Iterate rows and adapter.write()
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
