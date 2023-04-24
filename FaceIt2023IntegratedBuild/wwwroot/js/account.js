burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel =parseInt(localStorage.getItem('privilegeLevel'));
var my_forename = localStorage.getItem('forename');

// var my_Health_prof_name = " <Name not Found> ";
// var my_Health_prof_email = " <No email address found> ";

function getMyHealthProf2(myID) {
  const apiUrl = "https://localhost:7200/api/UserAssignedHealthProfInputs?ID=";
  const apiUrl2 = "https://localhost:7200/api/Accounts/"
  var my_Health_prof_id = 999;

  var my_Health_prof_name = " <Name not Found> ";
  var my_Health_prof_email = " <No email address found> ";


  fetch(apiUrl + myID)    
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {      
      //console.log(data);
      //console.log(apiUrl + myID);
      my_Health_prof_id = data[0].prof_id;
      console.log("healthprof id is "+my_Health_prof_id)
      //console.log(data[0].prof_id);
      return fetch(apiUrl2 + my_Health_prof_id);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {      
      my_Health_prof_name = data.forename + " " + data.surname;
      my_Health_prof_email = data.user_email;

    })
    .catch(error => console.error(error))
    .finally(() =>console.log("function: getMyHealhProf2 successfully completed and my_healthprof_name is "+my_Health_prof_name)
    );
    return [my_Health_prof_name,my_Health_prof_email];
}

function getMyMentees(hpID){
  // An API Get that triggers the stored procedure that returns all users linked to the ID given.
  

  const ListMyMentees= [];
  const apiUrl = "https://localhost:7200/api/HealthProfAllocatedInputs?hpID=";

  fetch(apiUrl+hpID)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Store the response in the local storage
      data.forEach(item=>{
        ListMyMentees.push(item.userId);
      })
      
    })
    .catch(error => console.error(error));

    console.log(ListMyMentees);
  
    return ListMyMentees;

}



//Need to also add a function to call stored procedure to return all users by healthProf's ID

async function setContent(privLevel){

  const myID = localStorage.getItem('userId');
  const forename = localStorage.getItem('forename');  

  if(privLevel==3){    
    console.log("Priv level was determined to be 3");
    
     const[str1,str2] = await getMyHealthProf2(myID);

     console.log("now going to change text on html:");
     document.getElementById("card2Title").innerHTML = "Hi: " + forename + " !";
      document.getElementById("card2Body").innerHTML = "Your Health Prof is: " + str1 + " You can contact them at: " + str2;

    return;    
    
    
  }
  else if(privLevel==2){

    document.getElementById("card2Title").innerHTML = "Welcome Health Professional!";
    myMentees=getMyMentees();
    document.getElementById("card2Body").innerHTML = "Your current mentees: ...TODO";  

    //fetches the names of all people assigned to the user (healthProf)

    //gives option to add an existing user to your care
    //gives an option to create a user
  }
  else if(privLevel==1){
    document.getElementById("card2Title").innerHTML = "Welcome Admin";
    document.getElementById("card2Body").innerHTML = "Manage Accounts... TODO";  
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

function test(){
  console.log("test successfully called from account.js");
}