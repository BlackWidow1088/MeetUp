const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

// If main.js created after building worker has exports keyword, it throws error while doing work
// from webworker. So, this plugin is used to replace the keyword. It is a patch and not permanent
// solution for the problem.
module.exports = {
  'plugins': [
    new ReplaceInFileWebpackPlugin([{
      dir: 'src/assets/workers',
      files: ['main.js'],
      rules: [{
        search: '}(exports,',
        replace: '}('
      }]
    }])
  ]
};
