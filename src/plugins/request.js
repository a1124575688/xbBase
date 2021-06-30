import request from '@/utils/axios.js'

export default Vue => {
	// mount the axios to Vue
	// Object.defineProperties(Vue, {
	// 	request: { get: () => request }
	// })

	Object.defineProperties(Vue.prototype, {
		$axios: { get: () => request }
	})
	// mount the axios to Vue component instance
	// Object.defineProperties(Vue.prototype, {
	// 	$request: { get: () => request }
	// })
}