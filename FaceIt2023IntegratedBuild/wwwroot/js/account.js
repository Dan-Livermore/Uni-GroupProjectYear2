burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel =localStorage.getItem('privilegeLevel');
const forename = localStorage.getItem('forename');
const myID = localStorage.getItem('userID');
const my_Health_prof = 999;
const my_Health_prof_name = "Name not Found";

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

//Need to also add a function to call stored procedure to return all users by healthProf's ID

function setBody(privLevel){

  let card2_Body = document.getElementById("card2Body");

  if(privLevel==3){
     //card2_Body. "Hello "+forename+" ."
  
  
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