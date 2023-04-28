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

      //The onClick that posts the create Pairing Stored Proc Call.
      goAddBtn.addEventListener("click", async () => {
        //myID
        const theirEmail = newInput.value;

              // Make the POST request
        const url = "https://localhost:7200/api/healthProfIDandUserEmails/create";
        const requestBody = {
          prof_id: 9,
          userEmail: theirEmail
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        // Check if the request was successful
        if (response.ok) {
          // Display a success message
          console.log("Mentee added successfully!");
          location.reload();
          
        } else {
          // Display an error message
          console.error("Failed to add mentee.");
        }

        


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

    //This handles the remove button:
    removeButton.addEventListener("click", function() {

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
      newLabel.textContent = "Input the user's email address to Un-assign yourself from them: ";
      newInput.classList.add("input");
      newInput.id="menteeInput";
      newInput.setAttribute("type", "text");
      newInput.setAttribute("placeholder", "Email address");
      goAddBtn.textContent = "Go";
      goAddBtn.id="menteeGoButton";      
      goAddBtn.classList.add("button", "is-primary", "mt-3","mx-auto");

      //The onClick that posts the delete Pairing Stored Proc Call.
      goAddBtn.addEventListener("click", async () => {
        //myID
        const theirEmail = newInput.value;

              // Make the POST request
        const url = 'https://localhost:7200/api/DeletehealthProfbyemails/delete';
        const requestBody = {
          prof_id: 9,
          userEmail: theirEmail
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        // Check if the request was successful
        if (response.ok) {
          // Display a success message
          console.log("Mentee deleted successfully!");
          location.reload();
          
        } else {
          // Display an error message
          console.error("Failed to delete mentee.");
          alert("Failed to delete mentee.");
          //newLabel.textContent="Failed to delete mentee, try again?"
        }       


      });

      

      // Append new elements to card body
      newDiv.appendChild(newLabel);
      newDiv.appendChild(newInput);
      newDiv.appendChild(goAddBtn);
      card2Body.appendChild(newDiv);




    });


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


function clickNameFooter(){
  console.log("pressed name footer");

    // get the nameChanger div element
  var nameChangerDiv = document.getElementById("nameChanger");
  var emailChangerDiv = document.getElementById("emailChanger");
  var passChangerDiv = document.getElementById("passwordChanger");
  var forename = localStorage.getItem("forename");
  var surname = localStorage.getItem("surname");
  var passwordField1 = document.getElementById("enterPass1");

  var textField1 = document.getElementById("forenameField");
  textField1.value= forename;
  var textField2 = document.getElementById("surnameField");
  textField2.value = surname;

  // set its display style property 
  nameChangerDiv.style.display = "block";
  emailChangerDiv.style.display = "none";
  passChangerDiv.style.display = "none";

  submitButton1 = document.getElementById("sub1");
  submitButton1.addEventListener("click", async () => {
    const forenameStr = textField1.value;
    const surnameStr = textField2.value;
    const actualPassword = localStorage.getItem("pass");    
    const passInput = passwordField1.value;
    const emailAddress = localStorage.getItem("userEmail");
    const thisPriv = localStorage.getItem("privilegeLevel");
    const myID = localStorage.getItem("userId")
    console.log(forenameStr);
    console.log(surnameStr);
    console.log(passInput);
    console.log(emailAddress);
    console.log(thisPriv);
    console.log(myID);
    console.log(actualPassword);

    if (actualPassword == passInput) {
      try {
        const url = 'https://localhost:7200/api/Accounts/' + myID;
    
        fetch(url, {
            method: 'PUT',
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: myID,
              userEmail: emailAddress,
              userPassword: actualPassword,
              privilegeLevel: thisPriv,
              forename: forenameStr,
              surname: surnameStr
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text(); // use text() instead of json()
          })
          .then(data => {
            if (data) {
              try {
                const jsonData = JSON.parse(data);
                console.log(jsonData);
              } catch (error) {
                console.log('Response was not valid JSON:', error);
              }
            } else {
              console.log('Response was empty');
            }
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
          alert("Success! You will need to log back in.");
          //signOut();
          //signout() doesnt work
          localStorage.setItem('userEmail', null);
          localStorage.setItem('privilegeLevel', null);
          localStorage.setItem('forename', null);
          localStorage.setItem('surname', null);
          localStorage.setItem('loggedIn',false);
          localStorage.setItem('userId',null);
          localStorage.setItem('user_id',null);
          localStorage.setItem('pass',null);
          window.location.href = "login.html";
    
      } catch {
        console.log("something went wrong trying to PUT");
      }
    } else {
      alert("ERROR passwords incorrect! Try Again!");    }
    

  });  
}

function clickEmailFooter(){  
  console.log("pressed email footer");
   
  // get the nameChanger div element
   var nameChangerDiv = document.getElementById("nameChanger");
   var emailChangerDiv = document.getElementById("emailChanger");
   var passChangerDiv = document.getElementById("passwordChanger");
 
   // set its display style property 
   nameChangerDiv.style.display = "none";
   emailChangerDiv.style.display = "block";
   passChangerDiv.style.display = "none";

   var textField3 = document.getElementById("newEmail");
   var textField4 = document.getElementById("enterPass2");

   submitButton1 = document.getElementById("sub2");
  submitButton1.addEventListener("click", async () => {
    //collect values for the body request
    var newEmail = textField3.value;
    var passChecker = textField4.value;
    var passCompare = localStorage.getItem("pass");   
    const thisPriv = localStorage.getItem("privilegeLevel");
    const myID = localStorage.getItem("userId");
    var forenameStr = localStorage.getItem("forename");
    var surnameStr = localStorage.getItem("surname");
    
    if(passChecker==passCompare){
      try {
        const url = 'https://localhost:7200/api/Accounts/' + myID;
    
        fetch(url, {
            method: 'PUT',
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: myID,
              userEmail: newEmail,
              userPassword: passCompare,
              privilegeLevel: thisPriv,
              forename: forenameStr,
              surname: surnameStr
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text(); // use text() instead of json()
          })
          .then(data => {
            if (data) {
              try {
                const jsonData = JSON.parse(data);
                console.log(jsonData);
              } catch (error) {
                console.log('Response was not valid JSON:', error);
              }
            } else {
              console.log('Response was empty');
            }
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
          alert("Success! You will need to log back in.");
          //signOut();
          localStorage.setItem('userEmail', null);
          localStorage.setItem('privilegeLevel', null);
          localStorage.setItem('forename', null);
          localStorage.setItem('surname', null);
          localStorage.setItem('loggedIn',false);
          localStorage.setItem('userId',null);
          localStorage.setItem('user_id',null);
          localStorage.setItem('pass',null);
          window.location.href = "login.html";
    
      } catch {
        console.log("something went wrong trying to PUT");
      }

    }
    else{
      alert("ERROR passwords incorrect! Try Again!");

    }

  })


}

function clickPasswordFooter(){
  console.log("pressed password footer");

   // get the nameChanger div element
   var nameChangerDiv = document.getElementById("nameChanger");
   var emailChangerDiv = document.getElementById("emailChanger");
   var passChangerDiv = document.getElementById("passwordChanger");
 
   // set its display style property 
   nameChangerDiv.style.display = "none";
   emailChangerDiv.style.display = "none";
   passChangerDiv.style.display = "block";

   var textField5 = document.getElementById("enterOld");
   var textField6 = document.getElementById("enterNew");
   var textField7 = document.getElementById("enterNew2");
   var submitButt = document.getElementById("subPassChange");    

    submitButt.addEventListener("click", async () => {

      var email = localStorage.getItem("userEmail");
      var passChecker = textField5.value;
      var passCompare = localStorage.getItem("pass");   
      const thisPriv = localStorage.getItem("privilegeLevel");
      const myID = localStorage.getItem("userId");
      var forenameStr = localStorage.getItem("forename");
      var surnameStr = localStorage.getItem("surname");

      var passChecker = textField5.value;
      var passCompare = localStorage.getItem("pass");

      var newPass1 = textField6.value;
      var newPass2 = textField7.value;

      if(newPass1 == newPass2){
        if(passChecker==passCompare ){
          try {
            const url = 'https://localhost:7200/api/Accounts/' + myID;
        
            fetch(url, {
                method: 'PUT',
                headers: {
                  'accept': '*/*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: myID,
                  userEmail: email,
                  userPassword: newPass2,
                  privilegeLevel: thisPriv,
                  forename: forenameStr,
                  surname: surnameStr
                })
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text(); // use text() instead of json()
              })
              .then(data => {
                if (data) {
                  try {
                    const jsonData = JSON.parse(data);
                    console.log(jsonData);
                  } catch (error) {
                    console.log('Response was not valid JSON:', error);
                  }
                } else {
                  console.log('Response was empty');
                }
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
              alert("Success! You will need to log back in to use the changes.");
              //signOut();
              localStorage.setItem('userEmail', null);
              localStorage.setItem('privilegeLevel', null);
              localStorage.setItem('forename', null);
              localStorage.setItem('surname', null);
              localStorage.setItem('loggedIn',false);
              localStorage.setItem('userId',null);
              localStorage.setItem('user_id',null);
              localStorage.setItem('pass',null);
              window.location.href = "login.html";
             
        
          } catch {
            console.log("something went wrong trying to PUT");
          }
    
        }
        else{alert("ERROR Your current password was incorrect! Try Again!");}
      }else{alert("ERROR Your new passwords must match!");}

    });

    function signOut(){
      console.log('sign out Button clicked');
        localStorage.setItem('userEmail', null);
        localStorage.setItem('privilegeLevel', null);
        localStorage.setItem('forename', null);
        localStorage.setItem('surname', null);
        localStorage.setItem('loggedIn',false);
        localStorage.setItem('userId',null);
        localStorage.setItem('user_id',null);
        localStorage.setItem('pass',null);
        window.location.href = "login.html";
    }






}




