const fsp = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const helpers = require("./utils");

let rootDir = path.resolve(__dirname, "..");
let examplesDir = path.resolve(rootDir, "examples");

let remixPackages = ["remix-image", "remix-image-wasm", "remix-image-sharp"];

async function updateExamplesRemixVersion() {
  const examples = await fsp.readdir(examplesDir);

  const packageVersions = {};
  await Promise.all(
    remixPackages.map(async (pkg) => {
      packageVersions[pkg] = await helpers.getPackageVersion(pkg);
    })
  );

  if (examples.length > 0) {
    for (const example of examples) {
      const stat = await fsp.stat(path.join(examplesDir, example));
      if (!stat.isDirectory()) {
        continue;
      }

      await helpers.updateExamplesPackageConfig(example, (config) => {
        for (const pkg of remixPackages) {
          if (config.dependencies?.[pkg]) {
            config.dependencies[pkg] = packageVersions[pkg];
            console.log(
              chalk.green(
                `Updated ${pkg} to version ${chalk.bold(
                  packageVersions[pkg]
                )} in ${chalk.bold(example)} example`
              )
            );
          }

          if (config.devDependencies?.[pkg]) {
            config.devDependencies[pkg] = packageVersions[pkg];
            console.log(
              chalk.green(
                `Updated ${pkg} to version ${chalk.bold(
                  packageVersions[pkg]
                )} in ${chalk.bold(example)} example`
              )
            );
          }
        }
      });
    }
  }
}

updateExamplesRemixVersion();
