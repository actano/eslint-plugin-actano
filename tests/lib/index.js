const assert = require('assert')
const { ESLint } = require('eslint')
const path = require('path')

const plugin = require('../../lib')

async function execute(scenario, rules) {
  const eslint = new ESLint({
    plugins: {'eslint-plugin-actano': plugin},
    baseConfig: {
      plugins: ['actano'],
      rules,
    },
    ignore: false,
    useEslintrc: false,
  })
  return await eslint.lintFiles([
    path.join(__dirname, '__fixtures__', scenario, 'package.json'),
  ])
}

describe('plugin exports', () => {
  it('should define json processor', () => {
    const extensions = Object.keys(plugin.processors)
    assert(extensions.includes('.json'))
  })

  describe('should define rules', () => {
    it('catches local yarn3 resolutions', async () => {
      const ruleId = 'actano/no-local-resolutions'
      const results = await execute(
        'with-local-resolutions',
        { [ruleId]: 'error' },
      )
      assert.equal(results.length, 1)
      const { errorCount, fixableErrorCount, messages } = results[0]
      console.log(messages)
      assert.equal(errorCount, 1, 'error count one')
      assert.equal(fixableErrorCount, 0, 'no fixable errors')
      const [message] = messages
      assert.equal(
        message.ruleId,
        ruleId,
        `wrong rule ${message.ruleId}`,
      )
      assert.equal(
        message.message,
        'Found local yarn3 resolutions',
        `wrong message ${message.message}`,
      )
    })
  })
})
