document.addEventListener('DOMContentLoaded', function() { 
    let cardToggles = document.getElementsByClassName('card-toggle'); 
    for (let i = 0; i < cardToggles.length; i++) { 
        cardToggles[i].addEventListener('click', e => { 
            e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden'); 
        }); 
    } 

    const burgerIcon = document.querySelector('#burger-icon')
		const navbarMenu = document.querySelector('#nav-links')
	  
		  burgerIcon.addEventListener("click", (event) => {
			navbarMenu.classList.toggle("is-active");
			event.preventDefault();
		  });
});

document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("session1ActivityAnswer1Display");
    textarea.value = localStorage.getItem("session1ActivityAnswer1");

    const textarea2 = document.getElementById("session1ActivityAnswer2Display");
    textarea2.value = localStorage.getItem("session1ActivityAnswer2");

    const textarea3 = document.getElementById("session1ActivityAnswer3Display");
    textarea3.value = localStorage.getItem("session1ActivityAnswer3");
  });