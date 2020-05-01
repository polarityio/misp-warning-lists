const LIST_PATH = './misp-warninglists/lists';
const INDICATOR_FILE = 'indicators.txt';
const WARNING_LIST_FILE = 'warning-lists.txt';
const UNSUPPORTED_LISTS = new Set(['majestic_million', 'tranco']);
const UNSUPPORTED_TYPES = new Set(['cidr', 'regex']);

module.exports = {
  LIST_PATH,
  INDICATOR_FILE,
  WARNING_LIST_FILE,
  UNSUPPORTED_TYPES,
  UNSUPPORTED_LISTS
};