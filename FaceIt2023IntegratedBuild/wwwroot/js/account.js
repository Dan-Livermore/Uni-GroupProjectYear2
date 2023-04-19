burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel =localStorage.getItem('privilegeLevel');
const forename = localStorage.getItem('forename');
const myID = localStorage.getItem('userID');

//privLevel == 3 means normal user
//privLevel == 2 means health prof
//privLevel == 1 means administrator

function setTitle(privLevel){
  
  let card2_Title = document.getElementById("card2Title");

  if (privLevel==3) {
    card2_Title.textContent = "Your Assigned Health Prof:";
  } else if (privLevel==2){
    card2_Title.textContent = "Your Assigned Users:";
  }
  else if (privLevel==1){
    card2_Title.textContent = "Health Profs:"
  }
  else{
    card2_Title.textContent = "Something Went Wrong regarding account's Privelege Level"
  }
}

//This needs to be edited in future it needs to call the stored procedure to return the health prof allocated to user (i will make this stored proc)
function getMyHealthProf (myID){
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
      localStorage.setItem('loggedIn',true);
    })
    .catch(error => console.error(error));
} 

//Need to also add a function to call stored procedure to return all users by healthProf's ID

function setBody(privLevel){

  if(privLevel==3){
    
    




    const title = "Hello "+forename+" ."
  
  
  }
  if(privLevel==2){
    //fetches the names of all people assigned to the user (healthProf)

    //gives option to add an existing user to your care
    //gives an option to create a user
  }
  if(privLevel==0){
    //show all health profs
    //option to CRUD a health prof
    //option to CRUD an admin
    //option to create a user
  }

  return 0;






}