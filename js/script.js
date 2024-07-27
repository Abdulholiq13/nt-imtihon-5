const elCardWrapper = document.querySelector('.products__card-wrapper');
const API = 'https://dummyjson.com';
const elSkeleton = document.querySelector('.skeleton');
const elLoadMoreBtn = document.querySelector('.see-more-btn');
const elLoader = document.querySelector('.loader');

for (let i = 0; i < 8; i++) {
	const elSkeletonItem = document.createElement('div');

	elSkeletonItem.classList.add('skeleton__item');
	elSkeletonItem.innerHTML = `
        <div class="skeleton__img skeleton__anime"></div>
        <div class="skeleton__line skeleton__anime"></div>
		<div class="skeleton__line skeleton__anime"></div>
    `;
	elSkeleton.append(elSkeletonItem);
}

let perPageCount = 8;
let offset = 1;

async function fetchData(api, limit) {
	const response = await fetch(`${api}/products?limit=${limit}`);
	response
		.json()
		.then((res) => createCard(res))
		.catch((err) => console.error(err))
		.finally(() => {
			elSkeleton.style.display = 'none';
			elLoader.style.display = 'none';
			elLoadMoreBtn.innerHTML = `View All Products`;
		});
}

fetchData(API, perPageCount);

function createCard(data) {
	while (elCardWrapper.firstChild) {
		elCardWrapper.firstChild.remove();
	}

	data.products.forEach((product) => {
		const elCard = document.createElement('div');
		elCard.classList.add('products__card');
		elCard.dataset.id = product.id;
		elCard.innerHTML = `
            <div class="products__img-inner">
                    <img class="products__img" src="${product.images[0]}" alt="" width="270" height="250"/>
					<button class="btn-black products__btn">Add To Cart</button>

				<div class="products__card-view">
					<span class="products__small-btn">
					        <img
						        src="./images/svg/heart-small-icon.svg"
						        alt="Heart icon"
						        width="24"
						        height="24"/>
					</span>
					<span class="products__small-btn">
						<img
							src="./images/svg/quick-view.svg"
							alt="Quick view icon"
							width="24"
							height="24"/>
					</span>
				</div>
			</div>
			    <h2 class="products__card-title">${product.title}</h2>
		        <div class="products__star-inner">
				    <p class="products__price">$${product.price}</p>
					<img
	    				class="products__star-img"
						src="./images/svg/three-star.svg"
						alt="Star icon"
						width="100"
			    		height="20"/>
					<p class="products__star-num">(35)</p>
				</div>
        `;

		elCardWrapper.append(elCard);
	});
}

elLoadMoreBtn.addEventListener('click', () => {
	offset++;
	fetchData(API, perPageCount * offset);
});

// Detail page

elCardWrapper.addEventListener('click', (e) => {
	let cardId = e.target.parentElement.dataset.id;
	if (e.target.className.includes('products__img') || e.target.className.includes('products__card-title')) {
		window.open(`/pages/product.html?id=${e.target.closest('.products__card').dataset.id}`, '_self');
	}
});

// Timer of sale

let deadline = '2024-08-01';

function getTimeRemaining(endTime) {
	const time = Date.parse(endTime) - Date.parse(new Date());
	const days = Math.floor(time / (1000 * 60 * 60 * 24));
	const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((time / (1000 * 60)) % 60);
	const seconds = Math.floor((time / 1000) % 60);

	return {
		totalTime: time,
		days,
		hours,
		minutes,
		seconds,
	};
}

function formatClock(number) {
	if (number >= 0 && number < 10) {
		return `0${number}`;
	} else {
		return number;
	}
}

function setClock(selector, endTime) {
	const timer = document.querySelector(selector);
	const days = timer.querySelector('#days');
	const hours = timer.querySelector('#hours');
	const minutes = timer.querySelector('#minutes');
	const seconds = timer.querySelector('#seconds');
	let timeInterval = setInterval(updateClock, 1000);

	function updateClock() {
		const time = getTimeRemaining(endTime);

		days.textContent = formatClock(time.days);
		hours.textContent = formatClock(time.hours);
		minutes.textContent = formatClock(time.minutes);
		seconds.textContent = formatClock(time.seconds);
	}

	if (timer.totalTime <= 0) {
		clearInterval(timeInterval);
	}
}

setClock('.discount__time-wrapper', deadline);
