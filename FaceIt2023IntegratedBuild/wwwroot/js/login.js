
burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });

function getAccountDetails (id){
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
      localStorage.setItem('userEmail', data.userEmail);
      localStorage.setItem('privilegeLevel', data.privilegeLevel);
      localStorage.setItem('forename', data.forename);
      localStorage.setItem('surname', data.surname);
      console.log(`Account with ID ${id} is now in local storage.`);
    })
    .catch(error => console.error(error));






}