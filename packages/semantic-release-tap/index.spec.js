const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const plugin = require('./index.js');

it('smoke', () => {
  assert.ok(1);
});

it('verifyConditions', async () => {
  const context = {
    cwd: __dirname,
  };

  await plugin.verifyConditions({}, context);
});

it.only('semantic-release integration', async () => {
  const result = await semanticRelease(
    {
      branches: ['master'],
      plugins: [plugin],
    },
    {
      cwd: __dirname,
    },
  );
});
