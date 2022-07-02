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

  const searching = searchInsideDirs.map((dir) =>
    path.join(directoryPath, dir)
  );

  const toDelete = [];

  for (let i = 0; i < searching.length; i += 1) {
    let fp = searching[i];
    const includeSubDirs = fp.endsWith("/*");
    if (includeSubDirs) {
      fp = fp.slice(0, -2);
    }

    if (!fp || !fs.existsSync(fp)) {
      throw new Error(`Invalid directory: ${directoryPath}`);
    }

    fs.readdirSync(fp, { withFileTypes: true }).forEach((item) => {
      if (item.isDirectory()) {
        if (item.name === "node_modules") {
          toDelete.push(path.join(fp, item.name));
        } else if (includeSubDirs) {
          searching.push(path.join(fp, item.name));
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
      deleting = filePaths;
    } else if (await prompt(`Would you like to delete individual files?`)) {
      for (const item of filePaths) {
        if (await prompt(`Would you like to delete: ${item}?`)) {
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
const searchInsideDirs = [".", "examples/*", "packages/*"];
deleteNodePackages(rootDir, searchInsideDirs);
