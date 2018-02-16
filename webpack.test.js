
/*
Webpack testing config file not necessary, but runs much faster than without.

webpack-node-externals makes webpack only build the modules required for the test to run, rather than everything in node_modules.
*/
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const nodeExternals = require( 'webpack-node-externals' );

module.exports = {
	target: 'node',
	externals: [ nodeExternals() ],
};
