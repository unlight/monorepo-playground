const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const { gitRoot } = require('@antongolub/git-root');
const plugin = require('./index.js');
const { contextSymbol } = plugin;

let root;

before(() => {
  process.env.NODE_ENV = 'test';
  root = gitRoot.sync();
});

it('smoke', () => {
  assert.ok(plugin);
});

it.skip('semver playground', () => {
  const semver = require('semver');
  const semverMaxSatisfying = require('semver/ranges/max-satisfying');
  console.log('semverMaxSatisfying', semverMaxSatisfying(['1.2.3', '2.0.0'], '*'));
});

it.skip('verifyConditions', async () => {
  const context = {
    cwd: __dirname,
    stdout: process.stdout,
  };

  await plugin.verifyConditions({}, context);
});

// it.only('prepare', async () => {
//   await plugin.prepare({}, context);
// });

it('integration keep context between steps', async () => {
  let pluginContext;
  process.stdout.on(contextSymbol, data => {
    pluginContext = data;
  });

  await semanticRelease({
    dryRun: true,
    branches: ['master'],
    plugins: [plugin],
  });

  assert.ok(pluginContext);
  assert.ok(pluginContext.root);
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

it.skip('integration acme bar', async () => {
  const result = await semanticRelease(
    {
      dryRun: true,
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
