const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
// 动态配置系统title
let systemName = require(resolve('src/utils/const')).SYSTEM_NAME;
// node的环境变量
let env = process.env.NODE_ENV;
// 默认插件配置
let defalutPlugin = [];
// 打包生成zip文件
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')
// 避免在开发环境执行文件打包插件报错
if (env === 'production') {
    defalutPlugin.push(new FileManagerWebpackPlugin({  // 需要在 plugins 数组里添加
        onEnd: {
            delete: [
                './dist/dist.zip', // 删除之前已经存在的压缩包
            ],
            archive: [
                { source: './dist', destination: './dist/dist.zip' },
            ]
        }
    }))
}
// config主要配置
module.exports = {
    // 关闭eslint方式（或者直接删除packjson.json里面的eslintConfig对象也可达到效果）
    lintOnSave: false, // 代码保存后eslint执行
    devServer: {
        overlay: { // 警告信息/错误信息不在浏览器中显示
            warnings: false,
            errors: false
        },
        proxy: null
    },
    configureWebpack: {
        plugins: defalutPlugin
    },
    // webpack主要配置
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = systemName;
            return args;
        });
        // 使用svg-sprite-loader对assets/icon里面对svg图片处理
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        // 排除assets/icons之外对svg仍然使用vuecli自带对loader处理
        config.module
            .rule('svg')
            .exclude
            .add(resolve('src/icons/svg'))
            .end()
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
    }
}