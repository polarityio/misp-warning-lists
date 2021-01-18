'use strict';
const schedule = require('node-schedule');
const { loadIndicators } = require('./lib/list-loader');
const updateList = require('./lib/update-lists');

const DO_REMOTE_UPDATE = true;
let previousAutoUpdate = null;
let indicators = null;
let Logger;
let updateListJob = null;

function startup(logger) {
  Logger = logger;
}

async function doLookup(entities, options, cb) {
  Logger.trace({ entities }, 'doLookup');

  if (indicators === null) {
    indicators = await loadIndicators(options.enabledLists);
    Logger.info(`Loaded ${Object.keys(indicators).length} malware list indicators`);
  }

  if (previousAutoUpdate === true && options.autoUpdate === false && updateListJob !== null) {
    // User switched from auto updating to turning it off so we need
    // to cancel the `updateListJob` if it has been set
    Logger.info('Cancelling automatic updating of MISP malware list data');
    updateListJob.cancel();
    updateListJob = null;
  }

  if (options.autoUpdate && updateListJob === null) {
    Logger.info('Enabled auto update to run every Sunday at 11:00 PM (server time)');
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0]; // Sunday
    rule.hour = 23; // 11:00 PM
    rule.minute = 0; // 11:00 PM
    updateListJob = schedule.scheduleJob(rule, async () => {
      Logger.info('Running automatic updating of MISP malware list data');
      await updateList.run(DO_REMOTE_UPDATE);
      Logger.info('Reloading updated malware list indicators');
      indicators = await loadIndicators(options.enabledLists);
      Logger.info(`Loaded ${Object.keys(indicators).length} malware list indicators`);
    });
  }

  let lookupResults = [];
  entities.forEach((entity) => {
    const lists = indicators[entity.value.toLowerCase()];
    if (lists) {
      lookupResults.push({
        entity,
        data: {
          summary: lists.map((list) => list.shortName),
          details: lists
        }
      });
    }
  });

  previousAutoUpdate = options.autoUpdate;
  cb(null, lookupResults);
}

module.exports = {
  doLookup,
  startup
};
