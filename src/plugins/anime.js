import anime from 'animejs';

export default Vue => {
	// mount the axios to Vue component instance
	Object.defineProperties(Vue.prototype, {
		$anime: { get: () => anime }
	})
}