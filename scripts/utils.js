const fsp = require("fs-extra");
const path = require("path");
const jsonfile = require("jsonfile");

let rootDir = path.resolve(__dirname, "..");

async function fileExists(filePath) {
  try {
    await fsp.stat(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

function packageJson(packageName, directory) {
  return path.join(rootDir, directory, packageName, "package.json");
}

async function getPackageVersion(packageName) {
  let file = packageJson(packageName, "packages");
  let json = await jsonfile.readFile(file);
  return json.version;
}

async function updateExamplesPackageConfig(example, transform) {
  const file = packageJson(example, "examples");
  if (!(await fileExists(file))) {
    return;
  }

  const json = await jsonfile.readFile(file);
  transform(json);
  await jsonfile.writeFile(file, json, { spaces: 2 });
}

module.exports = {
  fileExists,
  packageJson,
  getPackageVersion,
  updateExamplesPackageConfig,
};
