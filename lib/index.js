/**
 * @fileoverview Rules for valid and readable package.json files
 * @author Magento Commercre
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules')

// import processors
const PackageJsonProcessor = require('./processors/PackageJsonProcessor')
module.exports.processors = {
  // adapted from https://github.com/godaddy/eslint-plugin-i18n-json
  // thank you!
  '.json': PackageJsonProcessor,
  // add your processors here
}
