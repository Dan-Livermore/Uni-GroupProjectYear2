document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
});

window.on=function(){
	const burgerIcon = document.querySelector('#burger');
	const navbarMenu = document.querySelector('#nav-links');
}

burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });