document.addEventListener("DOMContentLoaded", function() {
	const textarea = document.getElementById("session1ActivityAnswer1");
	const button = document.getElementById("save1");

	const textarea1 = document.getElementById("session1ActivityAnswer2");
	const button1 = document.getElementById("save2");

	const textarea2 = document.getElementById("session1ActivityAnswer3");
	const button2 = document.getElementById("save3");

	const textarea3 = document.getElementById("session1ActivityFeedback");
	const button3 = document.getElementById("save4");
    
	button.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer1", textarea.value);
	  });
	  button1.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer2", textarea1.value);
	  });
	  button2.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer3", textarea2.value);
	  });
	  button3.addEventListener("click", function() {
		localStorage.setItem("session1ActivityFeedback", textarea3.value);
	  });
  });
 
  
document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
});

burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
});
