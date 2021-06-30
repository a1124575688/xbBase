const path = require('path');
module.exports = {
	lintOnSave: false,
	publicPath: '/',
	css: {
		loaderOptions: {
			// 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
			// 因为 `scss` 语法在内部也是由 sass-loader 处理的
			// 但是在配置 `prependData` 选项的时候
			// `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
			// 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
			scss: {
				prependData: `@import "~@/assets/common/css/common.scss";`
			}
		}
	},
	chainWebpack: config => {
		config.module
			.rule('svg')
			.exclude.add(path.resolve(__dirname, './src/svg-icons'))
			.end()

		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, { limit: 20000 }));

		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(path.resolve(__dirname, './src/svg-icons'))
			.end()
			.use('svg-sprite-loader')

			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
		config.resolve.alias
			.set('@', path.resolve(__dirname, './src'))
			.set('@c', path.resolve(__dirname, './src/components'))
			.set('@cc', path.resolve(__dirname, './src/components/common'))
			.set('@cp', path.resolve(__dirname, './src/components/pages'))
			.set('@cm', path.resolve(__dirname, './src/components/Marker'))
			.set('@image', path.resolve(__dirname, './src/assets/common/images'))
			.set('@v', path.resolve(__dirname, './src/views'))
			.set('vue$', 'vue/dist/vue.esm.js');
	},
	// productionSourceMap: scriptName !== 'build',
	devServer: {
		hot: true, //热更新配置一
		contentBase: './public', //本
		proxy: {
			"/phpApi": {
				target: 'http://jstztc.bddeve.xbcx.com.cn/dsj_jstztc_api',
				changeOrigin: true,
				pathRewrite: {
					'^/phpApi': "/"
				}
			}
		}
	}
};
