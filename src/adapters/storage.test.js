import StorageAdapter from './storage';

const defaults = { numbers: [1, 2, 3] };

describe('adapters/Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('default', () => {
    const storageAdapter = new StorageAdapter();
    expect(storageAdapter).toBeDefined();
    expect(storageAdapter.read).toBeDefined();
    expect(storageAdapter.write).toBeDefined();
  });

  it('when {defaults}', () => {
    const storageAdapter = new StorageAdapter({ defaults });
    expect(JSON.parse(localStorage.__STORE__.store)).toEqual(defaults);
  });

  it('when {read}', () => {
    const storageAdapter = new StorageAdapter({ defaults });
    expect(storageAdapter.read()).toEqual(defaults);
  });

  it('when {write}', () => {
    const storageAdapter = new StorageAdapter({ defaults });

    const next = { ...defaults, hello: 'world' };
    storageAdapter.write(next);
    expect(storageAdapter.read()).toEqual(next);
  });
});
