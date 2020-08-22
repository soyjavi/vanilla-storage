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

export class AsyncJsonAdapter {
  constructor({ defaults = {}, filename = 'store' } = {}) {
    return new Promise((resolve) => {
      const folder = path.resolve('.', 'store');
      this.file = path.resolve('.', `store/${filename}.json`);

      if (!fs.existsSync(folder)) fs.mkdirSync(folder);
      if (!fs.existsSync(this.file)) {
        this.write(defaults);
      }

      return resolve(this);
    });
  }

  read() {
    const { file } = this;
    let data;

    return new Promise((resolve, reject) => {
      try {
        data = JSON.parse(fs.readFileSync(file, 'utf8'));
        resolve(data);
      } catch (error) {
        reject(new Error(`${file} could not be loaded correctly.`));
      }
    });
  }

  write(data = {}) {
    const { file } = this;

    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(file, JSON.stringify(data, null, 1), 'utf8');
        resolve();
      } catch (error) {
        reject(new Error(`${file} could not be saved correctly.`));
      }
    });
  }
}
