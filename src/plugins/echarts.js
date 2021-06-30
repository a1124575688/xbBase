import Vue from 'vue'
let echarts = require('echarts');
let liquidfill = require('echarts-liquidfill');
import ChartInit from '@xbcx/chart';
Vue.prototype.$xb_chartObj = new ChartInit();
export default Vue => {
	// mount the axios to Vue component instance
	Object.defineProperties(Vue.prototype, {
		$echarts: { get: () => echarts }
	});

	// mount the axios to Vue component instance
	Object.defineProperties(Vue.prototype, {
		$liquidfill: { get: () => liquidfill }
	})
}
