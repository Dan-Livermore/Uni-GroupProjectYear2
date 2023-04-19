burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel =parseInt(localStorage.getItem('privilegeLevel'));
const forename = localStorage.getItem('forename');
const myID = localStorage.getItem('userID');
const my_Health_prof = 999;
const my_Health_prof_name = "Name not Found";



function getMyHealthProf (myID){
  const apiUrl = "https://localhost:7200/api/UserAssignedHealthProfInputs/";
  const apiUrl2 = "https://localhost:7200/api/Accounts/"

  fetch(apiUrl + myID)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      my_Health_prof = data.prof_id;
    })
    .catch(error => console.error(error));

  fetch(apiUrl2+my_Health_prof)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    my_Health_prof_name = data.forename+" "+data.surname;
  })
  .catch(error => console.error(error));
} 

function getMyHealthProf2(myID) {
  const apiUrl = "https://localhost:7200/api/UserAssignedHealthProfInputs/";
  const apiUrl2 = "https://localhost:7200/api/Accounts/"

  fetch(apiUrl + myID)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      my_Health_prof = data.prof_id;
      return fetch(apiUrl2 + my_Health_prof);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      my_Health_prof_name = data.forename + " " + data.surname;
    })
    .catch(error => console.error(error));
}


//Need to also add a function to call stored procedure to return all users by healthProf's ID

function setContent(privLevel){

  if(privLevel==3){
    getMyHealthProf2(myID);    
    document.getElementById("card2Title").innerHTML = "Your Health Prof is: ";
    //card2_Title.textContent = "Your Assigned Health Prof:";
    document.getElementById("card2_Body").innerHTML = "Hi: "+forename+" Your Health Prof is: "+my_Health_prof_name;
  
  
  }
  else if(privLevel==2){
    document.getElementById("card2Title").innerHTML = "Welcome Health Prof";
    document.getElementById("card2_Body").innerHTML = "Your current mentees: ...TODO";  

    //fetches the names of all people assigned to the user (healthProf)

    //gives option to add an existing user to your care
    //gives an option to create a user
  }
  else if(privLevel==1){
    document.getElementById("card2Title").innerHTML = "Welcome Admin";
    document.getElementById("card2_Body").innerHTML = "Manage Accounts... TODO";  
    //show all health profs
    //option to CRUD a health prof
    //option to CRUD an admin
    //option to create a user
  }
  else{
    document.getElementById("card2Title").innerHTML = "ERROR";
    document.getElementById("card2_Body").innerHTML = "Something with the Privilege Level went wrong."; 


  }
}