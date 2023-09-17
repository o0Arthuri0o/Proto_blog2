let pageTitle = document.querySelector('.page-title');
let pageBody = document.querySelector('.page-body');
let userName = document.querySelector('.page-user')


let menuBtn = document.querySelector('.menu-burger')
let menu = document.querySelector('.menu')
menu.style.display = 'none'

menuBtn.addEventListener('click', (e) => {
	if (menu.dataset.status == 'close') {
		menu.classList.remove('animate-[back2_1s_ease-in-out_1]')
		menu.dataset.status = 'open';
		menu.style.display = 'flex';
		menu.classList.add('animate-show')

	} else {
		menu.classList.remove('animate-show')
		menu.classList.add('animate-[back2_1s_ease-in-out_1]')
		menu.dataset.status = 'close'
		setTimeout(() => menu.style.display = 'none', 1000)
		

	}
})

let url = new URL(window.location.href);
let userId = url.searchParams.get('userId');
let id = url.searchParams.get('id')
let isAuth = url.searchParams.get('auth')


fetch('https://jsonplaceholder.typicode.com/posts')
.then((res) => res.json())
.then((data) => {
	data.forEach((obj) => {
		obj.title = obj.title.repeat(2);
		obj.body = obj.body.repeat(30);
		obj.date = new Date(`2023 ${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 13) + 1}`)
	})
	let posts = data;
	fetch('https://jsonplaceholder.typicode.com/users')
	.then((res) => res.json())
	.then((data) => {
		let users = data;
		renderArticle(posts, users)
	})

	

})
.catch((e) => console.log(e))

function renderArticle(posts, users) {
	
	for (let post of posts) {
		if (post.id == id) {
			pageTitle.textContent = post.title;
			pageBody.textContent = post.body;
			break;
		}
	}
	for (let user of users) {
		if (user.id == userId) {
			userName.textContent = user.name;
			break;
		}
	}

}