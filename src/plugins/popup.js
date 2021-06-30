import popup from '@jspatrick/tooltip';
import '@jspatrick/tooltip/dist/popup.css'
import router from '../router'
import store from '../store'

export default Vue => {
	Vue.use(popup, { //注册全局的弹窗插件
		store, router
	});
}