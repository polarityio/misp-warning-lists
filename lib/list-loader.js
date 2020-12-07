const fs = require('fs');
const readline = require('readline');
const { INDICATOR_FILE, WARNING_LIST_FILE } = require('./constants');

/**
 *
 * @param enabledLists, array of option select objects containing information on enabled lists
 * [
 *   {
 *     value: 'listname',
 *     display: 'listname'
 *   }
 * ]
 * @returns {Promise<unknown>}
 */
async function loadIndicators(enabledLists) {
  let indicators = {};
  const enabledListSet = new Set(
    enabledLists.map((list) => {
      return list.value;
    })
  );

  const rl = readline.createInterface({
    input: fs.createReadStream(INDICATOR_FILE)
  });

  rl.on('line', (line) => {
    const indicatorObject = JSON.parse(line);
    if (enabledListSet.has(indicatorObject.repo)) {
      if (!Array.isArray(indicators[indicatorObject.indicator])) {
        indicators[indicatorObject.indicator] = [];
      }
      indicators[indicatorObject.indicator].push(indicatorObject);
    }
  });

  return new Promise((resolve, reject) => {
    rl.on('close', () => {
      resolve(indicators);
    });
  });
}

function loadWarningListAsOptions() {
  const warningListContent = fs.readFileSync(WARNING_LIST_FILE, 'utf8')
  const lists = JSON.parse(warningListContent);

  return lists.map((list) => {
    return {
      display: list,
      value: list
    };
  });
}

module.exports = {
  loadIndicators,
  loadWarningListAsOptions
};
