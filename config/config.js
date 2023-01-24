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
    'The Polarity MISP Warning Lists integration searches MISP hash, domain and IPv4 based warning lists and returns related list information.',
  entityTypes: ['IPv4', 'domain', 'hash'],
  defaultColor: 'light-gray',
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
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: '',
    rejectUnauthorized: true
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
      description:
        'If checked, the integration will automatically update the MISP warning list data from the MISP github repository every Sunday at 11:00 PM (polarity server time).  This setting must be set to "Only admins can view and edit".  The Polarity Server must have the `git` command line tool installed and have connectivity to `https://github.com/MISP/misp-warninglists`',
      default: true,
      type: 'boolean',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'enabledLists',
      name: 'Enabled Lists',
      description:
        'Select one or more MISP Warning Lists for which you would like to return results from.  This setting must be set to "Only admins can view and edit".  Restart the integration after changing this setting or wait for the auto update to run to have this setting take effect.',
      default: [
        { display: 'alexa', value: 'alexa' },
        { display: 'automated-malware-analysis', value: 'automated-malware-analysis' },
        { display: 'bank-website', value: 'bank-website' },
        { display: 'cisco_top1000', value: 'cisco_top1000' },
        { display: 'cisco_top10k', value: 'cisco_top10k' },
        { display: 'cisco_top20k', value: 'cisco_top20k' },
        { display: 'cisco_top5k', value: 'cisco_top5k' },
        { display: 'common-ioc-false-positive', value: 'common-ioc-false-positive' },
        { display: 'covid', value: 'covid' },
        { display: 'covid-19-cyber-threat-coalition-whitelist', value: 'covid-19-cyber-threat-coalition-whitelist' },
        { display: 'covid-19-krassi-whitelist', value: 'covid-19-krassi-whitelist' },
        { display: 'crl-hostname', value: 'crl-hostname' },
        { display: 'dax30', value: 'dax30' },
        { display: 'disposable-email', value: 'disposable-email' },
        { display: 'dynamic-dns', value: 'dynamic-dns' },
        { display: 'eicar.com', value: 'eicar.com' },
        { display: 'empty-hashes', value: 'empty-hashes' },
        { display: 'google', value: 'google' },
        { display: 'google-chrome-crux-1million', value: 'google-chrome-crux-1million' },
        { display: 'microsoft', value: 'microsoft' },
        { display: 'microsoft-attack-simulator', value: 'microsoft-attack-simulator' },
        { display: 'microsoft-azure-appid', value: 'microsoft-azure-appid' },
        { display: 'microsoft-office365', value: 'microsoft-office365' },
        { display: 'microsoft-win10-connection-endpoints', value: 'microsoft-win10-connection-endpoints' },
        { display: 'moz-top500', value: 'moz-top500' },
        { display: 'mozilla-CA', value: 'mozilla-CA' },
        { display: 'mozilla-IntermediateCA', value: 'mozilla-IntermediateCA' },
        { display: 'nioc-filehash', value: 'nioc-filehash' },
        { display: 'parking-domain-ns', value: 'parking-domain-ns' },
        { display: 'public-dns-hostname', value: 'public-dns-hostname' },
        { display: 'public-ipfs-gateways', value: 'public-ipfs-gateways' },
        { display: 'rfc6761', value: 'rfc6761' },
        { display: 'second-level-tlds', value: 'second-level-tlds' },
        { display: 'security-provider-blogpost', value: 'security-provider-blogpost' },
        { display: 'ti-falsepositives', value: 'ti-falsepositives' },
        { display: 'tlds', value: 'tlds' },
        { display: 'tranco10k', value: 'tranco10k' },
        { display: 'university_domains', value: 'university_domains' },
        { display: 'url-shortener', value: 'url-shortener' },
        { display: 'whats-my-ip', value: 'whats-my-ip' }
      ],
      type: 'select',
      options: [
        { display: 'alexa', value: 'alexa' },
        { display: 'automated-malware-analysis', value: 'automated-malware-analysis' },
        { display: 'bank-website', value: 'bank-website' },
        { display: 'cisco_top1000', value: 'cisco_top1000' },
        { display: 'cisco_top10k', value: 'cisco_top10k' },
        { display: 'cisco_top20k', value: 'cisco_top20k' },
        { display: 'cisco_top5k', value: 'cisco_top5k' },
        { display: 'common-ioc-false-positive', value: 'common-ioc-false-positive' },
        { display: 'covid', value: 'covid' },
        { display: 'covid-19-cyber-threat-coalition-whitelist', value: 'covid-19-cyber-threat-coalition-whitelist' },
        { display: 'covid-19-krassi-whitelist', value: 'covid-19-krassi-whitelist' },
        { display: 'crl-hostname', value: 'crl-hostname' },
        { display: 'dax30', value: 'dax30' },
        { display: 'disposable-email', value: 'disposable-email' },
        { display: 'dynamic-dns', value: 'dynamic-dns' },
        { display: 'eicar.com', value: 'eicar.com' },
        { display: 'empty-hashes', value: 'empty-hashes' },
        { display: 'google', value: 'google' },
        { display: 'google-chrome-crux-1million', value: 'google-chrome-crux-1million' },
        { display: 'microsoft', value: 'microsoft' },
        { display: 'microsoft-attack-simulator', value: 'microsoft-attack-simulator' },
        { display: 'microsoft-azure-appid', value: 'microsoft-azure-appid' },
        { display: 'microsoft-office365', value: 'microsoft-office365' },
        { display: 'microsoft-win10-connection-endpoints', value: 'microsoft-win10-connection-endpoints' },
        { display: 'moz-top500', value: 'moz-top500' },
        { display: 'mozilla-CA', value: 'mozilla-CA' },
        { display: 'mozilla-IntermediateCA', value: 'mozilla-IntermediateCA' },
        { display: 'nioc-filehash', value: 'nioc-filehash' },
        { display: 'parking-domain-ns', value: 'parking-domain-ns' },
        { display: 'public-dns-hostname', value: 'public-dns-hostname' },
        { display: 'public-ipfs-gateways', value: 'public-ipfs-gateways' },
        { display: 'rfc6761', value: 'rfc6761' },
        { display: 'second-level-tlds', value: 'second-level-tlds' },
        { display: 'security-provider-blogpost', value: 'security-provider-blogpost' },
        { display: 'ti-falsepositives', value: 'ti-falsepositives' },
        { display: 'tlds', value: 'tlds' },
        { display: 'tranco10k', value: 'tranco10k' },
        { display: 'university_domains', value: 'university_domains' },
        { display: 'url-shortener', value: 'url-shortener' },
        { display: 'whats-my-ip', value: 'whats-my-ip' }
      ],
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
