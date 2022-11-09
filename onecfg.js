import {
  editorconfig,
  eslint,
  git,
  github,
  ignore,
  node,
  npm,
  prettier,
  snugjs,
  swc,
  typescript,
  vscode,
} from '@onecfg/standard';
import {mergeContent, writeFiles} from 'onecfg';

const target = `es2022`;

writeFiles(
  ...editorconfig(),
  ...eslint(),
  ...git(),
  ...github({additionalCiScripts: [`build`], omitReleaseStep: true}),
  ...ignore(`dist`),
  ...node({nodeVersion: `18`}),
  ...npm(),
  ...prettier(),
  ...snugjs(),
  ...swc({target}),
  ...typescript({target, emit: false}),
  ...vscode({includeFilesInExplorer: false}),

  mergeContent(npm.packageFile, {
    scripts: {
      'prebuild': `rm -rf dist`,
      'build': `webpack --mode production`,
      'postbuild': `size-limit`,
      'build:watch': `webpack --mode development --watch`,
      'start': `aws-simple start`,
    },
  }),
);
