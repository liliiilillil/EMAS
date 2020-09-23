/* eslint-disable no-console */

module.exports = {
  packLog(err, stats) {
    if (err) {
      console.log('An error occurred while packaging %>_<%   %>_<%  %>_<%');
      console.log(
        stats.toString({
          colors: true,
          assets: true,
          errors: true,
          warnings: true,
        })
      );
      return;
    }
    console.log(
      stats.toString({
        colors: true,
        /** fallback value for stats options when an option is not defined (has precedence over local webpack defaults) */
        all: false,
        /** Add asset Information */
        assets: true,
        errors: true,
        warnings: true,
      })
    );
  },
  logging(compiler, name) {
    console.log(`${name}开始打包代码`);
  },
};
