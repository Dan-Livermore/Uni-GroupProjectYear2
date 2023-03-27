document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
});

const myTextarea = document.getElementById("session1ActivityAnswer1");
const myButton = document.getElementById("saved1");

function saveTextareaValue() {
  const textareaValue = myTextarea.value;
  localStorage.setItem('savedSession1ActivityAnswer1', textareaValue);
}

myButton.addEventListener('click', saveTextareaValue);

burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



