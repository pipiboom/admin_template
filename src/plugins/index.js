// 将当前plugins目录下面到所有插件注册到全局
const requirePlugin = require.context(
  // 当前plugins目录
  '/',
  // 是否查询其子目录
  false,
  // 匹配当前plugins目录下的js文件
  /.+\.js$/
)
requirePlugin.keys().forEach(fileName => {
  requirePlugin(fileName)
})