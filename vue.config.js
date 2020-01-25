module.exports = {
  configureWebpack: {
    resolve: {
      // 给其他文件夹配置别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}

// vue相关的配置都可以在这里进行设置