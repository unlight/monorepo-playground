const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const plugin = require('./index.js');

it('smoke', () => {
  assert.ok(1);
});

it.only('verifyConditions', async () => {
  const context = {
    cwd: process.cwd(),
  };

  console.log('context', context);

  await plugin.verifyConditions({}, context);
});

it('semantic-release', async () => {
  const result = await semanticRelease(
    {
      branches: ['master', 'npm8'],
      plugins: [plugin],
    },
    {},
  );
});
