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

    // Loop through the length of the integer array , collecting string about mentees .
    for (var i = 0; i < myMentees.length; i++) {           
      mentee=myMentees[i];
      var details = await getMenteeDetails(mentee);
      aMentee = [details['forename'], details['surname'], details['userEmail']];
      str1 = details['forename'];
      str2 = details['surname'];
      str3 = details['userEmail'];

      listEntry = "Your Mentee: "+str1+ " "+str2+"'s email address is :"+str3+ ". \n"+ " \n"; 
      //listEntry = "Your Mentee: <b>" + str1 + "</b> <b>" + str2 + "</b>'s email address is: <b>" + str3 + "</b><br>";
       

      menteeDetails.push(listEntry);          
          
    }
    console.log("              !           !      "+menteeDetails);
         
    const card2Body = document.getElementById("card2Body");
    card2Body.innerHTML = ""; // Clear any previous content

    //  Create a list element and append it to card2Body             
    const menteesList = document.createElement("ul");
    card2Body.appendChild(menteesList);

    console.log("mdetails lenght is "+menteeDetails.length);

    // for (var i = 0; i < menteeDetails.length; i++) {  
    //   const listItem = document.createElement("li");
    //   listItem.textContent = menteeDetails[i];
    //   menteesList.appendChild(listItem);
    //   console.log("List item craeted and added.")
    // }
    for (var i = 0; i < menteeDetails.length; i++) {  
      const listItem = document.createElement("li");
      const strArray = menteeDetails[i].split(":");
      const formattedStr = "<b>" + strArray[0] + ":</b>" + strArray[1]+": "+strArray[2];
      listItem.innerHTML = formattedStr;
      menteesList.appendChild(listItem);
    }

        // Create the "Add Mentee" button
    const addButton = document.createElement("button");
    addButton.textContent = "Add Mentee";
    addButton.classList.add("button", "is-primary", "mt-6", "mx-auto");    
    // Add event listener to addButton
    addButton.addEventListener("click", function() {
      if (document.getElementById("menteeInput") !== null && document.getElementById("menteeGoButton") !== null) {
        return;
      }
      
      // Create new elements to add mentee
      const newDiv = document.createElement("div");
      const newLabel = document.createElement("label");
      const newInput = document.createElement("input");
      const goAddBtn = document.createElement("button");

      // Set attributes and content of new elements
      newDiv.classList.add("field");
      newLabel.classList.add("label");
      newLabel.textContent = "Input the user's email address to become their assigned health professional: ";
      newInput.classList.add("input");
      newInput.id="menteeInput";
      newInput.setAttribute("type", "text");
      newInput.setAttribute("placeholder", "Email address");
      goAddBtn.textContent = "Go";
      goAddBtn.id="menteeGoButton";      
      goAddBtn.classList.add("button", "is-primary", "mt-3","mx-auto");
      goAddBtn.addEventListener("click", async () => {
        //myID
        const theirEmail = newInput.value;

              // Make the POST request
        //const url = "https://localhost:7200/api/healthProfIDandUserEmails/create";
        const requestBody = {
          prof_id: myID,
          userEmail: theirEmail
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(requestBody).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key])).join('&')
        };
        
        

        const response = await fetch('https://localhost:7200/api/healthProfIDandUserEmails/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
});

        

      });
    

      

      // Append new elements to card body
      newDiv.appendChild(newLabel);
      newDiv.appendChild(newInput);
      newDiv.appendChild(goAddBtn);
      card2Body.appendChild(newDiv);


    });

    // Create a div to hold the buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons", "is-centered");

    // Create the "Remove Mentee" button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Mentee";
    removeButton.classList.add("button", "is-danger", "mt-6", "mx-auto");
    //removeButton.addEventListener("click", removeMentee);

    // Append the buttons to the buttons div
    buttonsDiv.appendChild(addButton);
    buttonsDiv.appendChild(removeButton);

    // Called when add mentee is pressed
    card2Body.appendChild(buttonsDiv);

  


     

    

   
    
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

