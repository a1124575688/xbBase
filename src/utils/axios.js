import axios from 'axios'
import Qs from 'qs'
import store from '../store'
import { Message } from 'view-design'
import { tool } from './tool'

axios.defaults.withCredentials = false;// false：跨域不携带cookies
axios.defaults.crossDomain = true;// true：允许跨域
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const xhrCache = {}
const request = axios.create({
	baseURL: window.phpApi,
	timeout: 30 * 1000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	}
})

request.interceptors.request.use(
	config => {
		// 添加token
		if (localStorage.getItem('hy_access_token') && !config.noAuthorization) {
			config.headers.Authorization = localStorage.getItem('hy_access_token')
		}
		// 格式化
		if (config.method === "post") {
			config.data = Qs.stringify(config.data);
		}
		// 是否缓存xhr
		if (!config.noCache) {
			config.xhrKey = tool.randomId(12)
			config.cancelToken = new axios.CancelToken(function executor (c) {
				xhrCache[config.xhrKey] = c;
			})
		}

		return config
	},
	error => {
		console.log(error)
		Promise.error(error)
	}
)



export default request
