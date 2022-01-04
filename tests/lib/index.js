const assert = require('assert');
const { CLIEngine } = require('eslint');
const path = require('path');

const plugin = require('../../lib');

function execute(scenario, rules, options) {
    const cli = new CLIEngine(
        Object.assign(
            {
                extensions: ['.json'],
                baseConfig: {
                    rules
                },
                ignore: false,
                useEslintrc: false
            },
            options
        )
    );
    cli.addPlugin('eslint-plugin-actano', plugin);
    return cli.executeOnFiles([
        path.join(__dirname, '__fixtures__', scenario, 'package.json')
    ]);
}

describe('plugin exports', () => {
    it('should define json processor', () => {
        const extensions = Object.keys(plugin.processors);
        assert(extensions.includes('.json'));
    });

    describe('should define rules', () => {
        it('catches local yarn3 resolutions', () => {
            const { errorCount, fixableErrorCount, results } = execute(
                'with-local-resolutions',
                {
                    'actano/no-local-resolutions': 'error'
                }
            );
            assert.equal(errorCount, 1, 'one error');
            assert.equal(fixableErrorCount, 0, 'not fixable');
            assert.equal(results.length, 1);
            const { messages } = results[0];
            const [message] = messages;
            assert.equal(
                message.ruleId,
                'actano/no-local-resolutions'
            );
            assert.equal(
                message.message,
                'Found local yarn3 resolutions'
            );
        });
    });
});
