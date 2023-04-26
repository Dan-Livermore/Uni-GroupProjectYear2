document.addEventListener('DOMContentLoaded', function() {
    let cardToggles = document.getElementsByClassName('card-toggle');
    for (let i = 0; i < cardToggles.length; i++) {
      cardToggles[i].addEventListener('click', e => {
        e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('#burger-icon')
    const navbarMenu = document.querySelector('#nav-links')
  
      burgerIcon.addEventListener("click", (event) => {
        navbarMenu.classList.toggle("is-active");
        event.preventDefault();
      });
  });

//   Gets data from database and creates a list of each stored journal
//
//   1. connects db 
//   2. gets username
//   3. finds all journals
//   4. iterates through journals (list view)
//   4.1. displays date as title
//   4.2. display content in card
//   4.3. update crud buttons in footer
  