const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const plugin = require('./index.js');

const { gitRoot } = require('@antongolub/git-root');

let root = gitRoot.sync();

it.only('smoke', () => {
  assert.ok(1);
});

it('verifyConditions', async () => {
  const context = {
    cwd: __dirname,
  };

  await plugin.verifyConditions({}, context);
});

it.only('prepare', async () => {
  // await plugin.prepare({}, context);
});

it('integration semantic-release-tap', async () => {
  const result = await semanticRelease(
    {
      branches: ['master'],
      plugins: [
        plugin,
        [
          '@semantic-release/npm',
          {
            pkgRoot: './dist',
          },
        ],
      ],
    },
    {
      cwd: __dirname,
    },
  );
});

it('integration acme bar', async () => {
  const result = await semanticRelease(
    {
      noCi: false,
      branches: ['master'],
      plugins: [
        plugin,
        [
          '@semantic-release/npm',
          {
            pkgRoot: './dist',
          },
        ],
      ],
    },
    {
      cwd: root + '/packages/bar',
    },
  );
});
