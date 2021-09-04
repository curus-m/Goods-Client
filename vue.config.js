
module.exports = {
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = "Goods Manager";
            return args;
        })
        config.resolve.alias.set('vue', '@vue/compat')
  
        config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          return {
            ...options,
            compilerOptions: {
              compatConfig: {
                MODE: 2
              }
            }
          }
        })
      }
  }