const init = () => {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.page-menu');

	burger.addEventListener('click', () => {
		burger.classList.toggle('burger--opened');
		menu.classList.toggle('page-menu--opened');
		document.body.classList.toggle('body--menu-opened');
	});

	console.log(burger);
};

document.addEventListener('DOMContentLoaded', init);
