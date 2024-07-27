const API = 'https://dummyjson.com';
const contentContainer = document.querySelector('.content__container');

async function fetchSingleData(api) {
	let query = new URLSearchParams(window.location.search);
	let id = query.get('id');

	let response = await fetch(`${api}/products/${id}`);

	response
		.json()
		.then((res) => createContent(res))
		.catch((err) => console.log(err));
}

fetchSingleData(API);

function createContent(data) {
	contentContainer.innerHTML = `
    <div class="content__image-wrapper">
		<div class="content__image-thumb">
			${data.images.map((img) => `<img class="content__image-small" width="121" height="114" src=${img} />`)}
		</div>
        <div class="content__img-wrapper">
            <img class="content__img" src=${data.images[0]} alt="${data.title}" width="446" height="316" />
        </div>
	</div>
	<div class="content__text-wrapper">
		<h2 class="content__title">${data.title}</h2>
		<div class="star__wrapper">
			<img src="../images/svg/three-star.svg" alt="" />
            <p class="content__review">(11 Review) |</p>
            <p class="content__stock">In Stock</p>
		</div>

		<p class="content__price">$${data.price}</p>

		<p class="content__desc">
			${data.description}
		</p>

		<hr class="content__line" />

        <div class="content__color-wrapper">
            <p class="content__color-text">Colours:</p>
			<img class="content__color" src="../images/svg/blue-round.svg" alt="" width="20" height="20" />
			<img class="content__color" src="../images/svg/red-round.svg" alt="" width="20" height="20" />
		</div>
		<div class="content__sizes">
			<p class="content__size-text">Size:</p>
			<span class="content__size">XS</span>
			<span class="content__size">S</span>
			<span class="content__size">M</span>
			<span class="content__size">L</span>
			<span class="content__size">XL</span>
		</div>
		<div class="content__count-wrapper">
		    <div class="content__count-inner">
			    <button class="content__count-inner-btn">-</button>
					<span class="content__count-text">0</span>
				<button class="content__count-inner-btn plus">+</button>
			</div>
			    <button class="btn-secondary">Buy Now</button>
				<button class="content__count-heart">
				    <img src="../images/svg/heart-small-icon.svg" alt="" width="32" height="32"/>
				</button>
			</div>
	</div>
    `;
}
