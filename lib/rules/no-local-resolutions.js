/**
 * @fileoverview Disallow yarn3 local resolutions
 * @author Dagmar Timmreck
 */
'use strict';
const { isPackageJson } = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        docs: {
            description:
                'Disallow yarn3 local resolutions',
            category: 'Best Practices',
        },
        schema: [
            {
                type: 'array',
                items: {
                    type: 'string'
                },
            },
        ],
    },

    create: function(context) {
        return {
            'Property:exit': node => {
                if (!isPackageJson(context.getFilename())) {
                    return
                }
                const sourceCode = context.getSourceCode()
                if (node.key.value === 'resolutions') {
                    const resolutions = sourceCode.getText(node)
                    if (resolutions.includes('portal:')) {
                        context.report({
                            node,
                            loc: node.value.loc,
                            message: 'Found local yarn3 resolutions',
                            data: {
                                key: node.key.value,
                            },
                        })
                    }
                }
            }
        }
    }
}
