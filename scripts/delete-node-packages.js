const fs = require("fs");
const path = require("path");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) =>
  new Promise((resolve) => {
    readline.question(`${question} (Y/n) `, (input) =>
      resolve(input.length === 0 || input.toLowerCase().trim() === "y")
    );
  });

/**
 * Monorepo support has some issues with typescript and rollup
 * We run this script from time to time to make sure packages are installed in the expected location in the monorepo
 * Follow this script with: `npm i --legacy-peer-deps` in the Remix-Image repo root
 */

async function deleteNodePackages(directoryPath, searchInsideDirs) {
  if (!directoryPath || !fs.existsSync(directoryPath)) {
    throw new Error(`Invalid directory: ${directoryPath}`);
  }

  const toDelete = [];

  for (let { dir, includeSubDirs } of searchInsideDirs) {
    const fp = path.join(directoryPath, dir);

    if (!fp || !fs.existsSync(fp)) {
      throw new Error(`Invalid directory: ${fp}`);
    } else {
    }

    fs.readdirSync(fp, { withFileTypes: true }).forEach((item) => {
      if (item.isDirectory()) {
        if (item.name === "node_modules") {
          toDelete.push(path.join(fp, item.name));
        } else if (includeSubDirs) {
          searchInsideDirs.push({
            dir: path.join(dir, item.name),
            includeSubDirs: false,
          });
        }
      } else if (item.isFile() && item.name === "package-lock.json") {
        toDelete.push(path.join(fp, item.name));
      }
    });
  }

  await promptDeletions(toDelete);
}

async function promptDeletions(filePaths) {
  let deleting = [];

  if (filePaths.length > 0) {
    console.log("About to delete:");
    filePaths.forEach((i) => console.log(i));
    console.log("");

    const deleteAll = await prompt(`Would you like to delete all files?`);

    if (deleteAll) {
      console.log("deleting...");
      deleting = filePaths;
    } else if (await prompt(`Would you like to delete individual files?`)) {
      for (const item of filePaths) {
        if (await prompt(`Would you like to delete: ${item}?`)) {
          console.log("deleting...");
          deleting.push(item);
        }
      }
    }
  }

  readline.close();

  if (deleting.length === 0) {
    console.log("\nNo files were deleted!");
  } else {
    const failures = [];

    for (const item of deleting) {
      try {
        fs.rmSync(item, {
          force: true,
          recursive: true,
          maxRetries: 3,
        });
      } catch (error) {
        failures.push(item);
      }
    }

    console.log("\nSuccessfully deleted the following files:");
    deleting.forEach((i) => console.log(i));

    if (failures.length > 0) {
      console.log("\nFailed to delete the following files:");
      failures.forEach((i) => console.log(i));
    }
  }
}

// Remix Image Package root
const rootDir = path.resolve(__dirname, "..");
const searchInsideDirs = [
  {
    dir: ".",
    includeSubDirs: false,
  },
  {
    dir: "examples",
    includeSubDirs: true,
  },
  {
    dir: "packages",
    includeSubDirs: true,
  },
];
deleteNodePackages(rootDir, searchInsideDirs);
