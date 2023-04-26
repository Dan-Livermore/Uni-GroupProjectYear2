burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel =parseInt(localStorage.getItem('privilegeLevel'));
var my_forename = localStorage.getItem('forename');

// var my_Health_prof_name = " <Name not Found> ";
// var my_Health_prof_email = " <No email address found> ";

async function getMyHealthProf2(myID) {
  const apiUrl = "https://localhost:7200/api/UserAssignedHealthProfInputs?ID=";
  const apiUrl2 = "https://localhost:7200/api/Accounts/"
  var my_Health_prof_id = 999;
  var my_Health_prof_name = " <Name not Found> ";
  var my_Health_prof_email = " <No email address found> ";

  try {
    const response1 = await fetch(apiUrl + myID);
    if (!response1.ok) {
      throw new Error('Network response was not ok');
    }
    const data1 = await response1.json();
    my_Health_prof_id = data1[0].prof_id;
    console.log("healthprof id is "+my_Health_prof_id);

    const response2 = await fetch(apiUrl2 + my_Health_prof_id);
    if (!response2.ok) {
      throw new Error('Network response was not ok');
    }
    const data2 = await response2.json();
    my_Health_prof_name = data2.forename + " " + data2.surname;
    my_Health_prof_email = data2.userEmail;
    console.log(data2);

    console.log("function: getMyHealhProf2 successfully completed and my_healthprof_name is "+my_Health_prof_name);
    return { name: my_Health_prof_name, email: my_Health_prof_email };
  } catch (error) {
    console.error(error);
    return { name: my_Health_prof_name, email: my_Health_prof_email };
  }
}

async function getMyMentees(hpID) {
  const ListMyMentees = [];
  const apiUrl = "https://localhost:7200/api/HealthProfAllocatedInputs?hpID=";

  try {
    const response = await fetch(apiUrl + hpID);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    data.forEach(item => {
      ListMyMentees.push(item.userId);
    });
    console.log(ListMyMentees);
    return ListMyMentees;
  } catch (error) {
    console.error(error);
  }
}

async function getMenteeDetailsAsync(id) {
  const apiUrl = "https://localhost:7200/api/Accounts/";
  console.log("hello")
  try {
    const response = await fetch(apiUrl + id);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const accountDetails = {
      userId: data.userId,
      forename: data.forename,
      surname: data.surname,
      userEmail: data.userEmail,
    };
    console.log(accountDetails);
    return accountDetails;
  } catch (error) {
    console.error(error);
  }
}



//Need to also add a function to call stored procedure to return all users by healthProf's ID

async function setContent(privLevel){

  const myID = localStorage.getItem('userId');
  const forename = localStorage.getItem('forename');  

  if (privLevel === 3) {
    console.log("Priv level was determined to be 3");

    const { name, email } = await getMyHealthProf2(myID);

    console.log("now going to change text on html:");
    document.getElementById("card2Title").innerHTML = "Hi: " + forename + " !";
    document.getElementById("card2Body").innerHTML = "Your Health Prof is: " + name + " You can contact them at: " + email;

    return;
  }
  else if(privLevel==2){


        document.getElementById("card2Title").innerHTML = "Welcome Health Professional!";        

        var myMentees = await getMyMentees(myID); //an array of integers for use in a get by id

        menteeDetails = []; //an empty array for storing mentee string variables 

        console.log(myMentees);
        console.log(myMentees.length);
        console.log(Array.isArray(myMentees));        

        // Loop through the length of the integer array , doing anything.
        for (var i = 0; i < myMentees.length; i++) {
           console.log("hello");
           mentee=myMentees[i];
           var details = await getMenteeDetails(mentee);
             aMentee = [details['forename'], details['surname'], details['userEmail']];
              console.log(mentee['forename']);
              menteeDetails.push(aMentee); 
              console.log("goodbye");
        }
        console.log(menteeDetails);

        
        

        

        // Promise.all(myMentees.map(getMenteeDetails))
        //   .then((detailsArray) => {
        //     var menteeDetails = detailsArray.map((details) => [details.forename, details.surname, details.userEmail]);
        //     console.log(menteeDetails);
        //   })
        //   .catch((error) => console.error(error));




        // menteeDetails = [];
        // myMentees.forEach(async function(mentee) {
        //   console.log("hello");
        //   var details = await getMenteeDetails(mentee);
        //   var aMentee = [details['forename'], details['surname'], details['userEmail']];
        //   menteeDetails.push(aMentee);
        // });
        
        // console.log("menteeDetails:");
        // console.log(menteeDetails);



           

        // async function loopThroughMentees() {
        //   for (const mentee of myMentees) {
        //     const details = await getMenteeDetailsAsync(mentee);
        //     const aMentee = [details.forename, details.surname, details.userEmail];
        //     menteeDetails.push(aMentee);
        //   }
        //   console.log(menteeDetails);
        // }
        
        // loopThroughMentees();

        //     console.error("Before clearing card2Body");
        // const card2Body = document.getElementById("card2Body");
        // card2Body.innerHTML = ""; // Clear any previous content

        // // Create a list element and append it to card2Body
        //     console.error("Before creating and appending menteesList");
        // const menteesList = document.createElement("ul");
        // card2Body.appendChild(menteesList);


        // console.error("Before iterating through myMentees array");
        // // Iterate through the myMentees array and create a list item for each mentee
        // myMentees.forEach((mentee) => {
        //   const listItem = document.createElement("li");
        //   listItem.textContent = mentee.name;
        //   menteesList.appendChild(listItem);
        //   console.log("List item craeted and added.")
        // });

        

        



   
    

    //fetches the names of all people assigned to the user (healthProf)
    //test
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
    document.getElementById("card2Title").innerHTML = "ERROR- NOT LOGGED IN!";
    document.getElementById("card2_Body").innerHTML = "How did you get here? Navigate to Login and sign in!"; 
  }  

  
}

function getMenteeDetails(id) {
  const apiUrl = "https://localhost:7200/api/Accounts/";

  return fetch(apiUrl + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const accountDetails = {
        forename: data.forename,
        surname: data.surname,
        userEmail: data.userEmail,
      };
      console.log(accountDetails);
      return accountDetails;
    })
    
    .catch((error) => console.error(error));
}

function test(){
  console.log("test successfully called from account.js");
}

