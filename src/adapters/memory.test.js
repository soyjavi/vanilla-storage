import MemoryAdapter from './memory';

const defaults = { numbers: [1, 2, 3] };

describe('adapters/Memory', () => {
  it('default', () => {
    const memoryAdapter = new MemoryAdapter();
    expect(memoryAdapter).toBeDefined();
    expect(memoryAdapter.read).toBeDefined();
    expect(memoryAdapter.write).toBeDefined();
  });

  it('when {defaults}', () => {
    const memoryAdapter = new MemoryAdapter({ defaults });
    expect(memoryAdapter.store).toEqual(defaults);
  });

  it('when {read}', () => {
    const memoryAdapter = new MemoryAdapter({ defaults });
    expect(memoryAdapter.read()).toEqual(defaults);
  });

  it('when {write}', () => {
    const memoryAdapter = new MemoryAdapter({ defaults });

    const next = { ...defaults, hello: 'world' };
    memoryAdapter.write(next);
    expect(memoryAdapter.read()).toEqual(next);
  });
});
