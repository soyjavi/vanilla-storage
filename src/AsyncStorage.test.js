import fs from 'fs';
import path from 'path';
import 'regenerator-runtime/runtime';

import { AsyncStorage } from './AsyncStorage';

const folder = path.resolve('.', 'store');
const javi = { id: 1, name: 'javi', role: 'dev' };
const frank = { id: 2, name: 'frank', role: 'bof' };
const john = { id: 3, name: 'john', role: 'dev' };
const david = { id: 4, name: 'david', role: 'manager' };
const storeObject = { defaults: { users: { soyjavi: undefined } } };

describe('AsyncStorage', () => {
  beforeAll(() => {
    if (fs.existsSync(folder)) fs.readdirSync(folder).forEach((file) => fs.unlinkSync(`${folder}/${file}`));
  });

  it('default', async () => {
    const store = await new AsyncStorage({ filename: 'async' });

    expect(Object.keys(store)).toEqual([]);
    expect(store.findOne).toBeDefined();
    expect(store.find).toBeDefined();
    expect(store.get).toBeDefined();
    expect(store.push).toBeDefined();
    expect(store.save).toBeDefined();
    expect(store.update).toBeDefined();
    expect(store.value).toEqual(undefined);
  });

  it('when {filename}', async () => {
    const store = await new AsyncStorage({ filename: 'async-store_2' });
    expect(fs.existsSync(`${folder}/async-store_2.json`)).toBeTruthy();
  });

  it('when {defaults}', async () => {
    const store = await new AsyncStorage({ filename: 'async-defaults', defaults: { numbers: [1, 2, 3] } });
    expect(store.value).toEqual(undefined);
    expect(store.get('numbers').value).toEqual([1, 2, 3]);
  });

  it('when {defaults:object}', async () => {
    const store = await new AsyncStorage({ filename: 'async-defaults-object', ...storeObject });
    expect(store.value).toEqual(undefined);
    expect(store.get('users').value).toEqual(storeObject.defaults.users);
  });

  it('.push()', async () => {
    const store = await new AsyncStorage({ filename: 'async-push' });

    const row = await store.push({ hello: 'world' });
    expect(row).toEqual({ hello: 'world' });
    expect(store.value).toEqual([{ hello: 'world' }]);
  });

  it('.push() {object}', async () => {
    const store = await new AsyncStorage({ filename: 'async-push-object', ...storeObject });

    const row = await store.get('users').push({ javi: true });
    expect(row).toEqual({ javi: true });
    expect(store.value).toEqual({ soyjavi: undefined, javi: true });
  });

  it('.push() [array]', async () => {
    const store = await new AsyncStorage({ filename: 'async-push-object', family: [] });

    store.get('family');
    await store.push({ javi: true });
    await store.push({ eki: true });
    expect(store.value).toEqual([{ javi: true }, { eki: true }]);
    await store.push([{ alaia: true }, { you: true }]);
    expect(store.value).toEqual([{ javi: true }, { eki: true }, { alaia: true }, { you: true }]);
  });

  it('.get() & .push()', async () => {
    const store = await new AsyncStorage({ filename: 'async-get-push' });

    await store.get('spanish').push({ hola: 'mundo' });
    expect(store.value).toEqual([{ hola: 'mundo' }]);
  });

  it('.findOne()', async () => {
    const store = await new AsyncStorage({ filename: 'async-findone' });

    store.get('users');
    await store.push(javi);
    await store.push(frank);
    await store.push(john);
    await store.push(david);

    expect(store.findOne({ role: 'dev' })).toEqual(javi);
    expect(store.findOne({ name: 'john', role: 'dev' })).toEqual(john);
    expect(store.findOne({ role: 'manager' })).toEqual(david);
    expect(store.findOne({ id: 3, role: 'manager' })).toEqual(undefined);
  });

  it('.find()', async () => {
    const store = await new AsyncStorage({ filename: 'async-find' });

    store.get('users');
    await store.push(javi);
    await store.push(frank);
    await store.push(john);
    await store.push(david);

    expect(store.find({ role: 'dev' })).toEqual([javi, john]);
    expect(store.find({ name: 'john', role: 'dev' })).toEqual([john]);
    expect(store.find({ role: 'manager' })).toEqual([david]);
    expect(store.find({ id: 3, role: 'manager' })).toEqual(undefined);
  });

  it('when {autoSave:false} && .push()', async () => {
    const store = await new AsyncStorage({ filename: 'async-autosave-false', autoSave: false });

    await store.push({ kaixo: 'mundua' });
    await store.push({ hola: 'mundo' });
    await store.push({ hello: 'world' });
    expect(store.value).toEqual(undefined);
  });

  it('when {autoSave:false} && .get() && .push()', async () => {
    const store = await new AsyncStorage({ filename: 'async-autosave-false-get-push', autoSave: false });

    await store.get('basque').push({ kaixo: 'mundua' });
    expect(store.value).toEqual(undefined);
    await store.get('spanish').push({ hola: 'mundo' });
    expect(store.value).toEqual(undefined);
    await store.get('english').push({ hello: 'world' });
    expect(store.value).toEqual(undefined);

    await store.save();

    expect(store.get('basque').value).toEqual([{ kaixo: 'mundua' }]);
    expect(store.get('spanish').value).toEqual([{ hola: 'mundo' }]);
    expect(store.get('english').value).toEqual([{ hello: 'world' }]);
  });

  it('.update()', async () => {
    const store = await new AsyncStorage({ filename: 'async-update' });

    store.get('users');
    await store.push(javi);
    await store.push(frank);
    await store.push(john);
    await store.push(david);

    let query = { id: 2 };
    let nextData = { name: 'frank miller', twitter: 'frankmiller' };
    let update = await store.update(query, nextData);
    expect(update.length).toEqual(1);
    expect(update[0]).toEqual({ ...frank, ...nextData });
    expect(store.findOne(query)).toEqual({ ...frank, ...nextData });

    query = { role: 'dev' };
    nextData = { role: 'developer' };
    update = await store.update(query, nextData);

    expect(update.length).toEqual(2);
    expect(store.find(nextData)).toEqual([
      { ...javi, ...nextData },
      { ...john, ...nextData },
    ]);
  });

  // it('.update() {object}', async () => {
  //   const store = await new AsyncStorage({ filename: 'async-update', defaults: { obj: {} } });

  //   expect(update.length).toEqual(1);
  //   expect(update[0]).toEqual({ ...frank, ...nextData });
  //   expect(store.findOne(query)).toEqual({ ...frank, ...nextData });

  //   query = { role: 'dev' };
  //   nextData = { role: 'developer' };
  //   update = await store.update(query, nextData);

  //   expect(update.length).toEqual(2);
  //   expect(store.find(nextData)).toEqual([
  //     { ...javi, ...nextData },
  //     { ...john, ...nextData },
  //   ]);
  // });

  it('.remove()', async () => {
    const store = await new AsyncStorage({ filename: 'async-remove' });

    store.get('users');
    await store.push(javi);
    await store.push(frank);
    await store.push(john);
    await store.push(david);

    const query = { id: 2 };
    const remove = await store.remove(query);
    expect(remove.length).toEqual(1);
    expect(remove[0]).toEqual(frank);
    expect(store.findOne(query)).toEqual(undefined);
    expect(store.value.length).toEqual(3);
  });

  it('when {secret}', async () => {
    const secret = 'pāşšŵōřđ';
    const store = await new AsyncStorage({ filename: 'async-secret', defaults: { obj: {}, users: [] }, secret });

    // -- Create
    await store.get('users').push(javi);
    expect(store.value.length).toEqual(1);
    expect(store.value).toEqual([javi]);

    await store.get('obj').save(javi);
    expect(store.value).toEqual(javi);
    await store.save({ location: ['a', 'b', 'c'] });
    expect(store.value).toEqual({ ...javi, location: ['a', 'b', 'c'] });

    // -- Read
    store.get('users');
    const query = { id: 1 };
    expect(store.findOne(query)).toEqual(javi);
    expect(store.find(query)).toEqual([javi]);

    // -- Update
    const nextData = { twitter: 'soyjavi' };
    const update = await store.update(query, nextData);
    expect(update.length).toEqual(1);
    expect(update[0]).toEqual({ ...javi, ...nextData });
    expect(store.findOne(query)).toEqual({ ...javi, ...nextData });

    // -- Delete
    await store.push(frank);
    const remove = await store.remove(query);
    expect(remove.length).toEqual(1);
    expect(remove[0]).toEqual({ ...javi, ...nextData });
    expect(store.findOne(query)).toEqual(undefined);
    expect(store.value.length).toEqual(1);
    expect(store.value).toEqual([frank]);
  });

  it('when {secret} invalid', async () => {
    const filename = 'async-secret-invalid';
    const secret = 'pāşšŵōřđ';
    let store = await new AsyncStorage({ filename, defaults: { obj: {}, users: [] }, secret });

    // -- Create
    const key = 'users';
    await store.get(key).push(javi);
    expect(store.value.length).toEqual(1);
    expect(store.value).toEqual([javi]);

    store = await new AsyncStorage({ filename, defaults: { obj: {}, users: [] }, secret: 'wrong' });
    expect(() => {
      expect(store.value).toEqual([javi]);
    }).toThrowError(`filename ${filename} can't be decrypted.`);
  });

  it('when {wipe}', async () => {
    const store = await new AsyncStorage({
      filename: 'async-wipe',
      defaults: { letters: ['a', 'b', 'c'], numbers: [1, 2, 3] },
    });

    await store.get('letters').push('d');
    await store.get('numbers').push(4);
    expect(store.get('letters').value).toEqual(['a', 'b', 'c', 'd']);
    expect(store.get('numbers').value).toEqual([1, 2, 3, 4]);
    await store.wipe();
    expect(store.get('letters').value).toEqual(['a', 'b', 'c']);
    expect(store.get('numbers').value).toEqual([1, 2, 3]);

    await store.get('letters').push('d');
    await store.get('numbers').push(4);
    await store.wipe('numbers');
    expect(store.get('letters').value).toEqual(['a', 'b', 'c', 'd']);
    expect(store.get('numbers').value).toEqual([1, 2, 3]);
  });
});
