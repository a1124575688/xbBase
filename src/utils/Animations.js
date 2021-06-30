import anime from 'animejs';

function getLeftAnimation (InOut, domElement, extraData) {
	const animation = anime.timeline({
		easing: 'easeInOutQuad',
		autoplay: false
	});
	const option = {
		targets: domElement,
		translateX: ['0%', '-100%'],
		duration: 600,
		// opacity:[1,0]
	}
	if (InOut === 'in') {
		option.translateX.reverse();
		animation.add(option);
	} else {
		animation.add(option);
	}
	return animation;
}
function getRightAnimation (InOut, domElement, extraData) {
	const animation = anime.timeline({
		easing: 'easeInOutQuad',
		autoplay: false
	});
	const option = {
		targets: domElement,
		translateX: ['0%', '100%'],
		duration: 600,
	}
	if (InOut === 'in') {
		option.translateX.reverse();
		animation.add(option);
	} else {
		animation.add(option);
	}
	return animation;
}
function getTopAnimation (InOut, domElement, extraData) {
	const animation = anime.timeline({
		easing: 'easeInOutQuad',
		autoplay: false
	});
	const option = {
		targets: domElement,
		translateY: ['0%', '-100%'],
		duration: 600,
	}
	if (InOut === 'in') {
		option.translateY.reverse();
		animation.add(option);
	} else {
		animation.add(option);
	}
	return animation;
}
function getBottomAnimation (InOut, domElement, extraData) {
	const animation = anime.timeline({
		easing: 'easeInOutQuad',
		autoplay: false
	});
	const option = {
		targets: domElement,
		translateY: ['0%', '100%'],
		duration: 600,
	}
	if (InOut === 'in') {
		option.translateY.reverse();
		animation.add(option);
	} else {
		animation.add(option);
	}
	return animation;
}

function getFadeAnimation (InOut, domElement, extraData) {
	const animation = anime.timeline({
		easing: 'easeInOutQuad',
		autoplay: false
	});
	let option = {
		targets: domElement,
		opacity: [0, 1],
		duration: 600,
	}
	if (InOut === 'in') {
		animation.add(option);
	} else {
		option.opacity.reverse();
		option = { ...option, ...extraData }
		animation.add(option);
	}
	return animation;
}

export default function getAnimations (animationMode, InOut, domElement, extraData = {}) {
	switch (animationMode) {
		case "fade": { return getFadeAnimation(InOut, domElement, extraData); }
		case "left": { return getLeftAnimation(InOut, domElement, extraData); }
		case "right": { return getRightAnimation(InOut, domElement, extraData); }
		case "top": { return getTopAnimation(InOut, domElement, extraData); }
		case "bottom": { return getBottomAnimation(InOut, domElement, extraData); }
	}
}
