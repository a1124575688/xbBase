import moment from 'moment'

export default Vue => {
	Vue.filter('date', (value, fot = 'YYYY-MM-DD') => {
		return moment(value).format(fot)
	})
	// mount the axios to Vue
	// Object.defineProperties(Vue, {
	// 	dayjs: { get: () => moment }
	// })

	// mount the axios to Vue
	Object.defineProperties(Vue.prototype, {
		$moment: { get: () => moment }
	})
	
	// mount the axios to Vue component instance
	// Object.defineProperties(Vue.prototype, {
	// 	$dayjs: { get: () => moment }
	// })
}