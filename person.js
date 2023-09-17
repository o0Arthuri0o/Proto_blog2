let menuBtn = document.querySelector('.menu-burger')
let menu = document.querySelector('.menu')
menu.style.display = 'none'

menuBtn.addEventListener('click', (e) => {
	if (menu.dataset.status == 'close') {
		menu.dataset.status = 'open';
		menu.style.display = 'flex';
	} else {
		menu.classList.add('animate-back')
		menu.dataset.status = 'close'
		menu.style.display = 'none';
		menu.classList.remove('animate-back')

	}
})

let signin = document.querySelector('.signin');



