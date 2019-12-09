const { override, addBabelPlugins } = require( 'customize-cra' );

const rootImport = [
  'babel-plugin-root-import',
  {
    rootPathPrefix: '~',
    rootPathSuffix: 'src'
  }
];

module.exports = override( ...addBabelPlugins( rootImport ));