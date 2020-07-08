import fs from 'fs';
import path from 'path';

import JsonAdapter from './json';

const folder = path.resolve('.', 'store');
const defaults = { numbers: [1, 2, 3] };

describe('adapters/Json', () => {
  beforeAll(() => {
    if (fs.existsSync(folder)) fs.readdirSync(folder).forEach((file) => fs.unlinkSync(`${folder}/${file}`));
  });

  it('default', () => {
    const jsonAdapter = new JsonAdapter();
    expect(jsonAdapter).toBeDefined();
    expect(jsonAdapter.read).toBeDefined();
    expect(jsonAdapter.write).toBeDefined();

    expect(fs.existsSync(`${folder}/store.json`)).toBeTruthy();
  });

  it('when {filename}', () => {
    const filename = 'adapter-json-filename';
    const jsonAdapter = new JsonAdapter({ filename });
    expect(fs.existsSync(`${folder}/${filename}.json`)).toBeTruthy();
  });

  it('when {read}', () => {
    const jsonAdapter = new JsonAdapter({ filename: 'adapter-json-read', defaults });
    expect(jsonAdapter.read()).toEqual(defaults);
  });

  it('when {write}', () => {
    const jsonAdapter = new JsonAdapter({ filename: 'adapter-json-write', defaults });

    expect(jsonAdapter.read()).toEqual(defaults);

    const next = { ...defaults, hello: 'world' };
    jsonAdapter.write(next);
    expect(jsonAdapter.read()).toEqual(next);
  });
});
