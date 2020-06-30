const { loadWarningListAsOptions } = require('../lib/list-loader');
const allEnabledWarningLists = loadWarningListAsOptions();

module.exports = {
  /**
   * Name of the integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @required
   */
  name: 'MISP Warning lists',
  /**
   * The acronym that appears in the notification window when information from this integration
   * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
   * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
   * here will be carried forward into the notification window.
   *
   * @type String
   * @required
   */
  acronym: 'MISP-W',
  /**
   * Description for this integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @optional
   */
  description:
    "The Polarity MISP Warning Lists integration searches MISP hash, domain and IPv4 based warning lists and returns related list information.",
  entityTypes: ['IPv4', 'domain', 'hash'],
  /**
   * Provide custom component logic and template for rendering the integration details block.  If you do not
   * provide a custom template and/or component then the integration will display data as a table of key value
   * pairs.
   *
   * @type Object
   * @optional
   */
  styles: ['./styles/style.less'],
  block: {
    component: {
      file: './components/block.js'
    },
    template: {
      file: './templates/block.hbs'
    }
  },
  logging: {
    level: 'trace' //trace, debug, info, warn, error, fatal
  },
  /**
   * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
   * as an array of option objects.
   *
   * @type Array
   * @optional
   */
  options: [
    {
      key: 'autoUpdate',
      name: 'Enable Auto Update',
      description: 'If checked, the integration will automatically update the MISP warning list data from the MISP github repository every Sunday at 11:00 PM (polarity server time).  This setting must be set to "Only admins can view and edit".  The Polarity Server must have the `git` command line tool installed and have connectivity to `https://github.com/MISP/misp-warninglists`',
      default: true,
      type: 'boolean',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'enabledLists',
      name: 'Enabled Lists',
      description: 'Select one or more MISP Warning Lists for which you would like to return results from.  This setting must be set to "Only admins can view and edit".  Restart the integration after changing this setting or wait for the auto update to run to have this setting take effect.',
      default: allEnabledWarningLists,
      type: 'select',
      options: allEnabledWarningLists,
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
