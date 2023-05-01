document.addEventListener('DOMContentLoaded', () => {
  const burgerIcon = document.querySelector('#burger-icon')
  const navbarMenu = document.querySelector('#nav-links')

    burgerIcon.addEventListener("click", (event) => {
      navbarMenu.classList.toggle("is-active");
      event.preventDefault();
    });
});

function getAccountDetails (id,forLogin){
  const apiUrl = "https://localhost:7200/api/Accounts/";  

  fetch(apiUrl + id)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Store the response in the local storage
      //console.log("about to set local storage items ");
      //console.log(data);
      localStorage.setItem('userEmail', data.userEmail);
      localStorage.setItem('privilegeLevel', data.privilegeLevel);
      localStorage.setItem('forename', data.forename);
      localStorage.setItem('surname', data.surname);
      localStorage.setItem('user_id',data.userId);
      localStorage.setItem('pass',data.userPassword);
      //console.log(`Account with ID ${id} is now in local storage.`);
      localStorage.setItem('loggedIn',true);

      if(forLogin){
        window.location.href = "account.html";
        return;
      }
      else{
        return data.forename,data.surname,data.userEmail;
      }
      
    })
    .catch(error => console.error(error));

}