/**
 * @fileoverview Disallow yarn3 local resolutions
 * @author Dagmar Timmreck
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-local-resolutions'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Valid test cases
//------------------------------------------------------------------------------

const valid = [
    {
        code: `module.exports = {
  "name": "treat-yo-self",
  "version": "1.1.1",
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
}`,
        filename: 'package.json'
    },
    {
        code: `module.exports = {
  "name": "treat-yo-self",
  "version": "0.1.0",
  "private": true,
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
}
`,
        filename: '/path/to/package.json'
    },
    {
        code: `doStuff({ "not-a-package-json": "so who cares" })`,
        filename: 'package-lock.json'
    },
    {
        code: `module.exports = {
  "version": "1.1.1",
  "name": "treat-yo-self",
  "keywords": [
    "modern",
    "master"
  ],
  "description": "Once a year.",
  "resolutions": {
    "some-package": "1.2.3"
  }
}
`,
        filename: 'package.json',
    }
];

//------------------------------------------------------------------------------
// Invalid test cases
//------------------------------------------------------------------------------

const invalid = [
    {
        code: `module.exports = {
  "name": "invalid-top-level-property-order",
  "version": "1.0.0",
  "scripts": {
    "test": "tape"
  },
  "description": "npm made me this way",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  },
  "resolutions": {
    "some-package": "portal:/to/some/file"
  }
}`,
        filename: 'path/to/some/package.json',
        errors: [
            {
                message: 'Found local yarn3 resolutions',
            },
        ],
    },
];

//------------------------------------------------------------------------------
// Run tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('order-properties', rule, { valid, invalid });
