const childProcess = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const { LIST_PATH, INDICATOR_FILE, WARNING_LIST_FILE, UNSUPPORTED_TYPES, UNSUPPORTED_LISTS } = require('./constants');

const exec = promisify(childProcess.exec);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

function isCloned() {
  return fs.existsSync('./misp-warninglists');
}

async function cloneRepo() {
  const { stdout, stderr } = await exec('git clone https://github.com/MISP/misp-warninglists');

  if (stderr) {
    throw new Error(stderr);
  } else {
    return stdout;
  }
}

async function updateRepo() {
  process.chdir('misp-warninglists');
  const { stdout, stderr } = await exec('git pull');
  process.chdir('../');

  if (stderr) {
    throw new Error(stderr);
  } else {
    return stdout;
  }
}

async function generateIndicatorFiles() {
  const listOutputStream = fs.createWriteStream(WARNING_LIST_FILE);
  const indicatorOutputStream = fs.createWriteStream(INDICATOR_FILE);
  const fileNames = await readdir(LIST_PATH);
  const warningLists = [];
  for (const fileName of fileNames) {
    if (!UNSUPPORTED_LISTS.has(fileName)) {
      const content = await readFile(path.join(LIST_PATH, fileName, 'list.json'), 'utf-8');
      const listObject = JSON.parse(content);
      if (!UNSUPPORTED_TYPES.has(listObject.type)) {
        warningLists.push(fileName);
        for (let i = 0; i < listObject.list.length; i++) {
          const indicator = listObject.list[i];
          indicatorOutputStream.write(
            `${JSON.stringify({
              indicator: indicator.startsWith('.') ? indicator.substring(1).toLowerCase() : indicator.toLowerCase(),
              description: listObject.description,
              name: listObject.name,
              version: listObject.version,
              shortName: fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' '),
              repo: fileName
            })}\n`
          );
        }
      }
    }
  }

  listOutputStream.write(JSON.stringify(warningLists));
  listOutputStream.end();
  indicatorOutputStream.end();
}

async function run() {
  if (!isCloned()) {
    console.info('Cloning MISP warning lists repo');
    const stdout = await cloneRepo();
    console.info(stdout);
  } else {
    console.info('MISP warning lists repo already cloned, updating repo');
    const stdout = await updateRepo();
    console.info(stdout);
    await generateIndicatorFiles();
    console.info('Finished generating indicator files ("indicators.txt" and "warning-lists.txt")');
  }
}

module.exports = {
  run
};
