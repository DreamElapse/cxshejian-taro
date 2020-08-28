module.exports = {
  env: {
    NODE_ENV: '"development"',
    API_URL: '"https://cxsj-api-pre.yishizongheng.com"',
    API_VEGA_STATION: '"https://www.cx9z.com"',
    API_ZIWOYOU: '"http://testm.lvyoupdd.com:8510"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
