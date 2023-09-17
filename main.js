let menuBtn = document.querySelector('.menu-burger')
let menu = document.querySelector('.menu')
menu.style.display = 'none'

menuBtn.addEventListener('click', (e) => {
	if (menu.dataset.status == 'close') {
		menu.classList.remove('animate-[back2_1s_ease-in-out_1]')
		menu.classList.add('animate-show')
		menu.dataset.status = 'open';
		menu.style.display = 'flex';
	} else {
		menu.classList.remove('animate-show')
		menu.classList.add('animate-[back2_1s_ease-in-out_1]')
		menu.dataset.status = 'close'

		setTimeout(() => {
			menu.style.display = 'none';
		}, 1000)
	}
})



fetch('https://jsonplaceholder.typicode.com/posts')
.then((res) => res.json())
.then((data) => {
	data.forEach((obj) => {
		obj.title = obj.title.repeat(2);
		obj.body = obj.body.repeat(30);
		obj.date = new Date(`2023 ${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 13) + 1}`)
	})
	let posts = data;
	renderThreeCards(posts)

})
.catch((e) => console.log(e))


function renderThreeCards(posts) {
	let lastPosts = [];
	for (let i = 0; i < 3; i++) {
		let latestPost;
		let indexOfPost = 0;
		for (let j = 0; j < posts.length; j++) {
			if (j === 0) latestPost = posts[j];
			else if (posts[j].date > latestPost.date) {
				latestPost = posts[j];
				indexOfPost = j
			}
		}
		lastPosts.push(latestPost)
		posts.splice(indexOfPost, 1)
	}
	// console.log(lastPosts)
	let headerOfArticle = Array.from(document.querySelectorAll('.article-name'));
	let dateOfArticle = Array.from(document.querySelectorAll('.date'))
	let btnOpenArticle = Array.from(document.querySelectorAll('button'))

	for (let i = 0; i < 3; i++) {
		headerOfArticle[i].textContent = lastPosts[i].title;
		let date = lastPosts[i].date.toLocaleString().slice(0, 5)
		dateOfArticle[i].textContent = date
		
	
		btnOpenArticle[i].dataset.userId = lastPosts[i].userId;;
		btnOpenArticle[i].dataset.id = lastPosts[i].id;
		btnOpenArticle[i].onclick = redirect
	}


	
}
function redirect() {
	let baseURL = window.location.protocol + '//' + window.location.host + '/Proto_blog/page.html';
	let newURL = baseURL + `?id=${this.dataset.id}&userId=${this.dataset.userId}`
	window.location.href = newURL;
}

