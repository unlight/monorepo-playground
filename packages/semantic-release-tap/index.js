const path = require('path');
const mapWorkspaces = require('@npmcli/map-workspaces');
const { gitRoot } = require('@antongolub/git-root');
const readPackage = require('read-package-json-fast');

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */
/**
 * @param {Config} pluginConfig -
 * @param {Context} ctx -
 * @returns {*} -
 * @example
 * verifyConditions(pluginConfig, ctx)
 */
async function verifyConditions(pluginConfig, context) {
  const { cwd } = context;
  const root = await gitRoot(cwd);
  const packageJson = await readPackage(path.join(root, 'package.json'));

  const workspaces = await mapWorkspaces({
    cwd: root,
    pkg: {
      workspaces: packageJson.workspaces,
    },
  });

  console.log('workspaces', workspaces);
}

async function analyzeCommits(pluginConfig, context) {
  debugger;
}

async function verifyRelease(pluginConfig, context) {
  debugger;
}

async function generateNotes(pluginConfig, context) {
  debugger;
}

async function prepare(pluginConfig, context) {
  debugger;
}

async function publish(pluginConfig, context) {
  debugger;
}

async function success(pluginConfig, context) {
  debugger;
}

async function fail(pluginConfig, context) {
  debugger;
}

module.exports = {
  verifyConditions,
  analyzeCommits,
  verifyRelease,
  generateNotes,
  prepare,
  publish,
  success,
  fail,
};
