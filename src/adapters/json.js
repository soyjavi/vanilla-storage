let fs = {
  existsSync() {},
  mkdirSync() {},
  readFileSync() {},
  writeFileSync() {},
};
let path = {
  resolve() {},
};

try {
  if (typeof process === 'object') {
    fs = require('fs');
    path = require('path');
  }
} catch (error) {
  fs.error = error;
}

export class JsonAdapter {
  constructor({ defaults = {}, filename = 'store' } = {}) {
    const folder = path.resolve('.', 'store');
    this.file = path.resolve('.', `store/${filename}.json`);

    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    if (!fs.existsSync(this.file)) {
      this.write(defaults);
    }

    return this;
  }

  read() {
    const { file } = this;
    let data;

    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      throw new Error(`${file} could not be loaded correctly.`);
    }

    return data;
  }

  write(data = {}) {
    const { file } = this;

    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 1), 'utf8');
    } catch (error) {
      throw new Error(`${file} could not be saved correctly.`);
    }
  }
}
