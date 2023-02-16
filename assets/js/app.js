const toggleClass = (hash, className = 'page-menu__link--active') => {
	if (hash) {
		const link = document.querySelector(`a[href="${hash}"]`);

		link && link.classList.toggle(className);
	}
};

const toggleMobileMenu = force => {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.page-menu');

	burger.classList.toggle('burger--opened', force);
	menu.classList.toggle('page-menu--opened', force);
	document.body.classList.toggle('body--menu-opened', force);
};

const init = () => {
	const burger = document.querySelector('.burger');

	burger.addEventListener('click', () => toggleMobileMenu());

	addEventListener('hashchange', event => {
		const oldHash = new URL(event.oldURL).hash;
		const newHash = new URL(event.newURL).hash;

		toggleClass(oldHash);

		toggleClass(newHash);

		toggleMobileMenu(false);
	});

	if (location?.hash) {
		toggleClass(location.hash);
	} else {
		const BASEHASH = '#main';

		history.pushState(null, null, BASEHASH);
		toggleClass(BASEHASH);
	}
};

document.addEventListener('DOMContentLoaded', init);
