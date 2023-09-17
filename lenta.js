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
	renderCards(posts)

})
.catch((e) => console.log(e))


function renderCards(posts) {
	let lastPosts = [];
	for (let i = 0; i < 10; i++) {
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

	let cardsWrapper = document.querySelector('.cards-wrapper');
	for (let post of lastPosts) {
		let title = post.title;
		let date = post.date.toLocaleString().slice(0, 5);
		let id = post.id;
		let userId = post.userId;

		cardsWrapper.insertAdjacentHTML('beforeend',
			`<div class="flex-none snap-start bg-black text-white py-5 px-3 rounded-3xl flex flex-col gap-2 w-full  max-sm:justify-between md:justify-between">
				<p class="article-name font-medium">${title}</p>
				<div class="flex justify-between">
					<button data-id = "${id}" data-userId = "${userId}" class="bg-[#FFB951] px-10 py-1.5 rounded-3xl text-black font-bold">К статье</button>
					<p class="date">${date}</p>
				</div>
			</div>`
		)
		
	}
	let btnOpenArticles = Array.from(document.querySelectorAll('button'))
	for (let btn of btnOpenArticles) {
		btn.onclick = redirect;
	}

}

function redirect() {
	let baseURL = window.location.protocol + '//' + window.location.host + '/Proto_blog/page.html';
	let newURL = baseURL + `?id=${this.dataset.id}&userId=${this.dataset.userid}`
	window.location.href = newURL;
	
}

