const path = require('path');
const files = require.context('./', true, /.js$/);
const modules = [];

files.keys().forEach(item => {
	const name = path.basename(item, '.js');
	if (name !== 'index') {
		modules.push({
			name,
			install: files(item).default || files(item)
		})
	}
});

export default {
	install (Vue) {
		modules.forEach(item => item.install(Vue));
	}
}
