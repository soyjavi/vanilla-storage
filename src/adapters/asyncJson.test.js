import fs from 'fs';
import path from 'path';
import 'regenerator-runtime/runtime';

import { AsyncJsonAdapter } from './asyncJson';

const folder = path.resolve('.', 'store');
const defaults = { numbers: [1, 2, 3] };

describe('adapters/AsyncJson', () => {
  beforeAll(() => {
    if (fs.existsSync(folder)) fs.readdirSync(folder).forEach((file) => fs.unlinkSync(`${folder}/${file}`));
  });

  it('default', async () => {
    const asyncJsonAdapter = await new AsyncJsonAdapter();
    expect(asyncJsonAdapter).toBeDefined();
    expect(asyncJsonAdapter.read).toBeDefined();
    expect(asyncJsonAdapter.write).toBeDefined();

    expect(fs.existsSync(`${folder}/store.json`)).toBeTruthy();
  });

  it('when {filename}', async () => {
    const filename = 'adapter-json-filename';
    const asyncJsonAdapter = await new AsyncJsonAdapter({ filename });
    expect(fs.existsSync(`${folder}/${filename}.json`)).toBeTruthy();
  });

  it('when {read}', async () => {
    const asyncJsonAdapter = await new AsyncJsonAdapter({ filename: 'adapter-json-read', defaults });
    expect(await asyncJsonAdapter.read()).toEqual(defaults);
  });

  it('when {write}', async () => {
    const asyncJsonAdapter = await new AsyncJsonAdapter({ filename: 'adapter-json-write', defaults });

    expect(await asyncJsonAdapter.read()).toEqual(defaults);

    const next = { ...defaults, hello: 'world' };
    await asyncJsonAdapter.write(next);
    expect(await asyncJsonAdapter.read()).toEqual(next);
  });
});
