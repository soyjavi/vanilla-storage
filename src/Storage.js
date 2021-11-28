import { JsonAdapter } from './adapters';
import { cloneObject, encrypt, decrypt } from './modules';

// eslint-disable-next-line no-undef
const state = new WeakMap();

export class Storage {
  constructor(props = {}) {
    const { adapter: Adapter = JsonAdapter, autoSave = true, defaults = {}, filename = 'store', secret } = props;
    const adapter = new Adapter({ defaults, filename });

    state.set(this, {
      adapter,
      autoSave,
      data: adapter.read(),
      defaults: cloneObject(defaults),
      filename,
      key: 'default',
      memoryPool: [],
      secret,
    });

    return this;
  }

  findOne(query) {
    const queryFields = Object.keys(query);

    return this.value.find((row) => {
      const found = !queryFields.some((field) => !(row[field] === query[field]));

      return found;
    });
  }

  find(query = {}) {
    const queryFields = Object.keys(query);
    const values = [];

    this.value.forEach((row) => {
      const found = !queryFields.some((field) => !(row[field] === query[field]));
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
    const { adapter, data, key, memoryPool = [], secret } = state.get(this);
    const isArray = data[key] === undefined || Array.isArray(data[key]);

    if (value) {
      if (isArray) data[key] = data[key] ? [...data[key], encrypt(value, secret)] : [encrypt(value, secret)];
      else {
        if (secret && Object.keys(data[key]).length !== 0) data[key] = decrypt(data[key], secret);
        data[key] = encrypt({ ...data[key], ...value }, secret);
      }
      adapter.write(data);
    } else if (memoryPool.length > 0) {
      memoryPool.forEach((item) => {
        data[item.key] = data[item.key]
          ? [...data[item.key], encrypt(item.value, secret)]
          : [encrypt(item.value, secret)];
      });
      adapter.write(data);
      state.set(this, Object.assign(state.get(this), { memoryPool: [] }));
    }
  }

  update(query, nextData) {
    const { adapter, data, key, secret } = state.get(this);
    const queryFields = Object.keys(query);
    const values = [];

    data[key] = this.value
      .map((row) => {
        const found = !queryFields.some((field) => !(row[field] === query[field]));
        let changes;

        if (found) {
          changes = Object.assign(row, nextData);
          values.push(changes);
        }

        return changes || row;
      })
      .map((row) => encrypt(row, secret));

    if (values.length > 0) adapter.write(data);

    return values;
  }

  remove(query) {
    const { adapter, data, key, secret } = state.get(this);
    const queryFields = Object.keys(query);
    const values = [];

    data[key] = this.value
      .filter((row) => {
        const found = !queryFields.some((field) => !(row[field] === query[field]));
        if (found) values.push(row);

        return !found;
      })
      .map((row) => encrypt(row, secret));

    if (values.length > 0) adapter.write(data);

    return values;
  }

  get value() {
    const { data, key, filename, secret } = state.get(this);

    if (!secret) return data[key];

    let decryptedValue;
    try {
      decryptedValue = Array.isArray(data[key])
        ? data[key].map((item) => decrypt(item, secret))
        : decrypt(data[key], secret);
    } catch (error) {
      throw Error(`filename ${filename} can't be decrypted.`);
    }

    return decryptedValue;
  }

  wipe(key) {
    const { adapter, data = {}, defaults = {} } = state.get(this);

    const nextData = cloneObject(key ? { ...data, [key]: defaults[key] } : defaults);
    adapter.write(nextData);
    state.set(this, Object.assign(state.get(this), { data: nextData, memoryPool: [] }));
  }
}
