import fs from 'fs';
import path from 'path';

import { Storage } from './Storage';

const folder = path.resolve('.', 'store');
const javi = { id: 1, name: 'javi', role: 'dev' };
const frank = { id: 2, name: 'frank', role: 'bof' };
const john = { id: 3, name: 'john', role: 'dev' };
const david = { id: 4, name: 'david', role: 'manager' };
const storeObject = { defaults: { users: { soyjavi: undefined } } };

describe('Storage', () => {
  beforeEach(() => {
    if (fs.existsSync(folder)) fs.readdirSync(folder).forEach((file) => fs.unlinkSync(`${folder}/${file}`));
  });

  // it('default', () => {
  //   const store = new Storage();

  //   expect(Object.keys(store)).toEqual([]);
  //   expect(store.findOne).toBeDefined();
  //   expect(store.find).toBeDefined();
  //   expect(store.get).toBeDefined();
  //   expect(store.push).toBeDefined();
  //   expect(store.save).toBeDefined();
  //   expect(store.update).toBeDefined();
  //   expect(store.value).toEqual(undefined);
  // });

  // it('when {filename}', () => {
  //   const store = new Storage({ filename: 'store_2' });
  //   expect(fs.existsSync(`${folder}/store_2.json`)).toBeTruthy();
  // });

  // it('when {defaults}', () => {
  //   const store = new Storage({ defaults: { numbers: [1, 2, 3] } });
  //   expect(store.value).toEqual(undefined);
  //   expect(store.get('numbers').value).toEqual([1, 2, 3]);
  // });

  // it('when {defaults:object}', () => {
  //   const store = new Storage(storeObject);
  //   expect(store.value).toEqual(undefined);
  //   expect(store.get('users').value).toEqual({ soyjavi: undefined });
  // });

  // it('.push()', () => {
  //   const store = new Storage();

  //   const row = store.push({ hello: 'world' });
  //   expect(row).toEqual({ hello: 'world' });
  //   expect(store.value).toEqual([{ hello: 'world' }]);
  // });

  // it('.push() {object}', () => {
  //   const store = new Storage(storeObject);

  //   const row = store.get('users').push({ javi: true });
  //   expect(row).toEqual({ javi: true });
  //   expect(store.value).toEqual({ soyjavi: undefined, javi: true });
  // });

  // it('.get() & .push()', () => {
  //   const store = new Storage();

  //   store.get('spanish').push({ hola: 'mundo' });
  //   expect(store.value).toEqual([{ hola: 'mundo' }]);
  // });

  // it('.findOne()', () => {
  //   const store = new Storage();

  //   store.get('users');
  //   store.push(javi);
  //   store.push(frank);
  //   store.push(john);
  //   store.push(david);

  //   expect(store.findOne({ role: 'dev' })).toEqual(javi);
  //   expect(store.findOne({ name: 'john', role: 'dev' })).toEqual(john);
  //   expect(store.findOne({ role: 'manager' })).toEqual(david);
  //   expect(store.findOne({ id: 3, role: 'manager' })).toEqual(undefined);
  // });

  // it('.find()', () => {
  //   const store = new Storage();

  //   store.get('users');
  //   store.push(javi);
  //   store.push(frank);
  //   store.push(john);
  //   store.push(david);

  //   expect(store.find({ role: 'dev' })).toEqual([javi, john]);
  //   expect(store.find({ name: 'john', role: 'dev' })).toEqual([john]);
  //   expect(store.find({ role: 'manager' })).toEqual([david]);
  //   expect(store.find({ id: 3, role: 'manager' })).toEqual(undefined);
  // });

  // it('when {autoSave:false} && .push()', () => {
  //   const store = new Storage({ autoSave: false });

  //   store.push({ kaixo: 'mundua' });
  //   store.push({ hola: 'mundo' });
  //   store.push({ hello: 'world' });
  //   expect(store.value).toEqual(undefined);
  // });

  // it('when {autoSave:false} && .get() && .push()', () => {
  //   const store = new Storage({ autoSave: false });

  //   store.get('basque').push({ kaixo: 'mundua' });
  //   expect(store.value).toEqual(undefined);
  //   store.get('spanish').push({ hola: 'mundo' });
  //   expect(store.value).toEqual(undefined);
  //   store.get('english').push({ hello: 'world' });
  //   expect(store.value).toEqual(undefined);

  //   store.save();
  //   expect(store.get('basque').value).toEqual([{ kaixo: 'mundua' }]);
  //   expect(store.get('spanish').value).toEqual([{ hola: 'mundo' }]);
  //   expect(store.get('english').value).toEqual([{ hello: 'world' }]);

  //   store.save();
  // });

  // it('.update()', () => {
  //   const store = new Storage();

  //   store.get('users');
  //   store.push(javi);
  //   store.push(frank);
  //   store.push(john);
  //   store.push(david);

  //   let query = { id: 2 };
  //   let nextData = { name: 'frank miller', twitter: 'frankmiller' };
  //   let update = store.update(query, nextData);
  //   expect(update.length).toEqual(1);
  //   expect(update[0]).toEqual({ ...frank, ...nextData });
  //   expect(store.findOne(query)).toEqual({ ...frank, ...nextData });

  //   query = { role: 'dev' };
  //   nextData = { role: 'developer' };
  //   update = store.update(query, nextData);
  //   expect(update.length).toEqual(2);
  //   // expect(update).toEqual(([{ ...javi, ...nextData }, { ...john, ...nextData }]);
  //   expect(store.find(nextData)).toEqual([
  //     { ...javi, ...nextData },
  //     { ...john, ...nextData },
  //   ]);
  // });

  // it('.remove()', () => {
  //   const store = new Storage();

  //   store.get('users');
  //   store.push(javi);
  //   store.push(frank);
  //   store.push(john);
  //   store.push(david);

  //   const query = { id: 2 };
  //   const remove = store.remove(query);
  //   expect(remove.length).toEqual(1);
  //   expect(remove[0]).toEqual(frank);
  //   expect(store.findOne(query)).toEqual(undefined);
  //   expect(store.value.length).toEqual(3);
  // });

  // it('when {secret}', () => {
  //   const secret = 'pāşšŵōřđ';
  //   const store = new Storage({ filename: 'store_encript', defaults: { obj: {}, users: [] }, secret });

  //   // -- Create
  //   store.get('users').push(javi);
  //   expect(store.value.length).toEqual(1);
  //   expect(store.value).toEqual([javi]);

  //   store.get('obj').save(javi);
  //   expect(store.value).toEqual(javi);
  //   store.save({ location: ['a', 'b', 'c'] });
  //   expect(store.value).toEqual({ ...javi, location: ['a', 'b', 'c'] });

  //   // -- Read
  //   store.get('users');
  //   const query = { id: 1 };
  //   expect(store.findOne(query)).toEqual(javi);
  //   expect(store.find(query)).toEqual([javi]);

  //   // -- Update
  //   const nextData = { twitter: 'soyjavi' };
  //   const update = store.update(query, nextData);
  //   expect(update.length).toEqual(1);
  //   expect(update[0]).toEqual({ ...javi, ...nextData });
  //   expect(store.findOne(query)).toEqual({ ...javi, ...nextData });

  //   // -- Delete
  //   store.push(frank);
  //   const remove = store.remove(query);
  //   expect(remove.length).toEqual(1);
  //   expect(remove[0]).toEqual({ ...javi, ...nextData });
  //   expect(store.findOne(query)).toEqual(undefined);
  //   expect(store.value.length).toEqual(1);
  //   expect(store.value).toEqual([frank]);
  // });

  // it('when {secret} invalid', () => {
  //   const filename = 'store_encript';
  //   const secret = 'pāşšŵōřđ';
  //   let store = new Storage({ filename, defaults: { obj: {}, users: [] }, secret });

  //   // -- Create
  //   const key = 'users';
  //   store.get(key).push(javi);
  //   expect(store.value.length).toEqual(1);
  //   expect(store.value).toEqual([javi]);

  //   store = new Storage({ filename, defaults: { obj: {}, users: [] }, secret: 'wrong' });
  //   expect(() => {
  //     expect(store.value).toEqual([javi]);
  //   }).toThrowError(`filename ${filename} can't be decrypted.`);
  // });

  it('when {wipe}', () => {
    const store = new Storage({ defaults: { letters: ['a', 'b', 'c'], numbers: [1, 2, 3] } });

    store.get('letters').push('d');
    store.get('numbers').push(4);
    expect(store.get('letters').value).toEqual(['a', 'b', 'c', 'd']);
    expect(store.get('numbers').value).toEqual([1, 2, 3, 4]);

    store.wipe();
    expect(store.get('letters').value).toEqual(['a', 'b', 'c']);
    expect(store.get('numbers').value).toEqual([1, 2, 3]);

    store.get('letters').push('d');
    store.get('numbers').push(4);
    store.wipe('numbers');
    expect(store.get('letters').value).toEqual(['a', 'b', 'c', 'd']);
    expect(store.get('numbers').value).toEqual([1, 2, 3]);
  });
});
