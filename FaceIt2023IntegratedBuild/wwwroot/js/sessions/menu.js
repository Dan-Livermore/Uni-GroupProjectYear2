document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('#burger-icon')
    const navbarMenu = document.querySelector('#nav-links')
  
      burgerIcon.addEventListener("click", (event) => {
        navbarMenu.classList.toggle("is-active");
        event.preventDefault();
      });
  });