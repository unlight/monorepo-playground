const path = require('path');
const mapWorkspaces = require('@npmcli/map-workspaces');
const { gitRoot } = require('@antongolub/git-root');
const readPackage = require('read-package-json-fast');
const AggregateError = require('aggregate-error');
const SemanticReleaseError = require('@semantic-release/error');

const contextSymbol = (exports.contextSymbol = Symbol('PluginContext'));

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */
/**
 * @param {Config} pluginConfig
 * @param {Context} ctx
 */
exports.verifyConditions = async function verifyConditions(pluginConfig, context) {
  debugger;
  const errors = [];
  const { cwd } = context;
  const root = await gitRoot(cwd).catch(() => '');

  if (!root) {
    errors.push(createError('ENOGITROOT', context));
    maybeThrowErrors(errors);
  }

  const rootPackagePath = path.join(root, 'package.json');
  const rootPackage = await readPackage(rootPackagePath).catch(() => {
    errors.push(createError('EACCESPATH', { path: rootPackagePath }));
  });

  const cwdPackagePath = path.join(cwd, 'package.json');
  const cwdPackage = await readPackage(cwdPackagePath).catch(() => {
    errors.push(createError('EACCESPATH', { path: cwdPackagePath }));
  });

  maybeThrowErrors(errors);

  const workspaces = await mapWorkspaces({
    cwd: root,
    pkg: {
      workspaces: rootPackage.workspaces,
    },
  });

  pluginContext(context, { root, cwdPackage, workspaces });
};

exports.analyzeCommits = async function analyzeCommits(pluginConfig, context) {
  if (process.env.NODE_ENV === 'test') {
    // todo: give name
    context.stdout.emit(contextSymbol, pluginContext(context));
  }
};

function maybeThrowErrors(errors) {
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
}

function createError(code, context) {
  let message = 'Unknown error';
  let details;
  switch (code) {
    case 'ENOGITROOT':
      {
        message = 'Unable to find git root';
        details = `Trying to find git root from ${JSON.stringify(context.cwd)}`;
      }
      break;
    case 'EMISSINGPACKAGE':
      {
        message = 'Missing package.json';
        details = `Could not find package.json in ${JSON.stringify(context.cwd)}`;
      }
      break;
    case 'EACCESPATH':
      {
        message = `Cannot access to file or directory`;
        details = `Unable get access to ${JSON.stringify(context.path)}`;
      }
      break;
  }

  return new SemanticReleaseError(message, code, details);
}

function pluginContext(context, values) {
  context.stdout[contextSymbol] ??= {};

  if (arguments.length > 1) {
    Object.assign(context.stdout[contextSymbol], values);
  }

  return context.stdout[contextSymbol];
}

// exports.verifyRelease = async function verifyRelease(pluginConfig, context) {
//   debugger;
// };

// exports.generateNotes = async function generateNotes(pluginConfig, context) {
//   debugger;
// };

// exports.prepare = async function prepare(pluginConfig, context) {
//   const pluginContext = getPluginContext(context);

//   // console.log('context', context);

//   if (process.env.NODE_ENV === 'test') {
//     context.tapContext = pluginContext;
//   }
// };

// exports.publish = async function publish(pluginConfig, context) {
//   debugger;
// };

// exports.success = async function success(pluginConfig, context) {
//   debugger;
// };

// exports.fail = async function fail(pluginConfig, context) {
//   debugger;
// };
