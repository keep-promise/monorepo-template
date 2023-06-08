const fs = require('fs');
const path = require('path');

function getPackageFolder() {
  return process.cwd();
}

function getPackageName() {
  const filepath = path.resolve(getPackageFolder(), 'package.json');
  return require(filepath).name;
}

function generateExternals() {
  const externals = {};
  const packagesFolder = path.resolve(getPackageFolder(), '../');
  fs.readdirSync(packagesFolder).forEach((filename) => {
    if (fs.statSync(path.join(packagesFolder, filename)).isDirectory()) {
//       const packageName = `${filename}`;
//       externals[packageName] = {
//         root: filename,
//         commonjs: packageName,
//         commonjs2: packageName,
//         amd: packageName
//       };
    }
  });
  return externals;
}

module.exports = {
  generateExternals,
  getPackageFolder,
  getPackageName
};
