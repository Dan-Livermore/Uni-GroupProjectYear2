document.addEventListener('DOMContentLoaded', () => {
  const burgerIcon = document.querySelector('#burger-icon')
  const navbarMenu = document.querySelector('#nav-links')

    burgerIcon.addEventListener("click", (event) => {
      navbarMenu.classList.toggle("is-active");
      event.preventDefault();
    });
});

const privLevel =parseInt(localStorage.getItem('privilegeLevel'));
var my_forename = localStorage.getItem('forename');

async function getMyHealthProf2(myID) {

/* This Function Is for a user to generate text info about their Assigend
* health prof
*/

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

async function deleteAccountById(id) {
  const url = `https://localhost:7200/api/Accounts/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return false;
  }
}


async function getMyMentees(hpID) {

/* This Function Is for a getting mentees for the health prof, (priv 2) 
* 
*/

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

async function setPrivilegeTitle(privilegeLevel) {
  switch (privilegeLevel) {
    case "Admin":
      return 1;
    case "Health":
      return 2;
    case "User":
      return 3;
    default:
      return 999;
  }
}

async function adminGetAccounts(){
  /*  This function generates a html table from the database of all accounts with funcitionality of 
  * deleting and editing accounts. 
  */
  const tableColumns = ["User ID", "Email", "Privilege Level", "Forename", "Surname", "Edit", "Delete"];
  const apiUrl = "https://localhost:7200/api/Accounts";
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const headerRow = document.createElement("tr");
  
      // Add table header columns
      tableColumns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column;
        headerRow.appendChild(th);
      });
  
      // Add header row to table header
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Add table rows with data
      data.forEach((rowData, rowIndex) => {
        const tr = document.createElement("tr");
  
        // Add columns for each value in rowData, except for the "Password" column
        Object.entries(rowData).forEach(([key, value]) => {
          if (key !== "userPassword") {
            const td = document.createElement("td");
            if (key === "privilegeLevel") {
              if (value === 1) {
                td.textContent = "Admin";
              } else if (value === 2) {
                td.textContent = "Health Prof";
              } else {
                td.textContent = "User";
              }
              
              
              
            } else {
              td.textContent = value;
            }
            tr.appendChild(td);
          }
          
        });
  
        // Add "Edit" and "Delete" buttons
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("button", "is-small", "is-primary");
  
        editButton.addEventListener("click", () => {
          // Set variables based on the row data and index
          const userId = rowData.userId;
          const email = rowData.userEmail;
          const password = rowData.userPassword;
          const privilegeLevel = rowData.privilegeLevel;
          const forename = rowData.forename;
          const surname = rowData.surname;
          const rowId = rowIndex + 1;
  
          console.log(`Edit button clicked for row ${rowId}`);
          console.log(`User ID: ${userId}, Email: ${email}, Password: ${password}, Privilege Level: ${privilegeLevel}, Forename: ${forename}, Surname: ${surname}`);
  
          // Display modal with input fields for editing the user data
          const modal = document.getElementById("modal");
          modal.classList.add("is-active");
  
          // Set modal header
          const modalHeader = document.getElementById("modalHeader");
          modalHeader.textContent = "Edit Profile";
          
          //Creates input fields
          const emailInput = document.createElement("input");
          emailInput.classList.add("input", "is-medium");
          emailInput.type = "email";
          emailInput.placeholder = "Email";
          emailInput.value = email;        
  
          //Creates a password input
          const passInput = document.createElement("input");
          passInput.classList.add("input", "is-medium");
          passInput.type = "password";
          passInput.placeholder = "Password";
          passInput.value = password;
  
          const forenameInput = document.createElement("input");
          forenameInput.classList.add("input", "is-medium");
          forenameInput.type = "text";
          forenameInput.placeholder = "Forename";
          forenameInput.value = forename;
  
          const surnameInput = document.createElement("input");
          surnameInput.classList.add("input", "is-medium");
          surnameInput.type = "text";
          surnameInput.placeholder = "Surname";
          surnameInput.value = surname;
          
          //Creates a drio downSelect ----------------------------------
          const privilegeLevelInput = document.createElement("select");
          privilegeLevelInput.classList.add("select", "is-medium");
          privilegeLevelInput.name = "privilege-level";
  
          const optionElement1 = document.createElement("option");
          optionElement1.value = 1;
          optionElement1.textContent = "Admin";
  
          const optionElement2 = document.createElement("option");
          optionElement2.value = 2;
          optionElement2.textContent = "Health Prof";
  
          const optionElement3 = document.createElement("option");
          optionElement3.value = 3;
          optionElement3.textContent = "User";
  
          privilegeLevelInput.appendChild(optionElement1);
          privilegeLevelInput.appendChild(optionElement2);
          privilegeLevelInput.appendChild(optionElement3);
  
          const iconElement = document.createElement("span");
          iconElement.classList.add("icon", "is-small");
          iconElement.innerHTML = '<i class="fas fa-angle-down"></i>';
  
          const modalBody = document.getElementById("modalBody");
          modalBody.innerHTML = "";
          modalBody.appendChild(forenameInput);
          modalBody.appendChild(surnameInput);
          modalBody.appendChild(emailInput);
          modalBody.appendChild(passInput);        
          modalBody.appendChild(privilegeLevelInput);
          modalBody.appendChild(iconElement);   
  
          // Add submit and cancel buttons to modal footer
          const modalFooter = document.getElementById("modalFooter");
          modalFooter.innerHTML = "";
  
          const submitButton = document.createElement("button");
          submitButton.textContent = "Submit";
          submitButton.classList.add("button", "is-primary");
          submitButton.addEventListener("click", () => {
            console.log("Submit button clicked");
  
            // Get updated values from input fields
            const updatedEmail = emailInput.value;
            const updatedPrivilegeLevel = privilegeLevelInput.value;
            const updatedForename = forenameInput.value;
            const updatedSurname = surnameInput.value;
            const updatedPassword = passInput.value;
            console.log("New Values:");
            console.log(updatedEmail);
            console.log(updatedPrivilegeLevel);
            console.log(updatedForename);
            console.log(updatedSurname);
            console.log(updatedPassword);
           
  
            try {
              const url = 'https://localhost:7200/api/Accounts/' + userId;
          
              fetch(url, {
                  method: 'PUT',
                  headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: userId,
                    userEmail: updatedEmail,
                    userPassword: updatedPassword,
                    privilegeLevel: updatedPrivilegeLevel,
                    forename: updatedForename,
                    surname: updatedSurname
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
                alert("Success! Updating Records.");
                location.reload();            
    
               
          
            } catch {
              console.log("something went wrong trying to PUT");
              alert("Something went wrong and Changes couldn't be saved");
              return;
            }
  
             // Close modal
            modal.classList.remove("is-active");
          });
  
          const cancelButton = document.createElement("button");
          cancelButton.textContent = "Cancel";
          cancelButton.classList.add("button");
          cancelButton.addEventListener("click", () => {
            console.log("Cancel button clicked");
  
            // Close modal
            modal.classList.remove("is-active");
          });
  
          modalFooter.appendChild(submitButton);
          modalFooter.appendChild(cancelButton);
        });
  
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("button", "is-small", "is-danger");
  
        // Add click event listener for delete button
        deleteButton.addEventListener("click", () => {
          // Set variables based on the row data and index
          const userId = rowData.userId;
          const email = rowData.userEmail;
          const password = rowData.userPassword;
          const privilegeLevel = rowData.privilegeLevel;
          const forename = rowData.forename;
          const surname = rowData.surname;

          if (window.confirm("Are you sure you want to proceed Deleting Account: "+email+" ?")) {

            try {
              const url = 'https://localhost:7200/api/Accounts/' + userId;
          
              fetch(url, {
                  method: 'DELETE',
                  headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: userId,
                    userEmail: email,
                    userPassword: password,
                    privilegeLevel: privilegeLevel,
                    forename: forename,
                    surname: surname
                  })
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.text(); 
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
                alert("Success! Updating Records.");
                location.reload();            
               
          
            } catch {
              console.log("something went wrong trying to PUT");
              alert("Something went wrong and Changes couldn't be saved");
              return;
            }  
             // Close modal
            modal.classList.remove("is-active");
    
            console.log(`Delete button clicked for row ${rowId}`);
            console.log(`User ID: ${userId}, Email: ${email}`);      


          } else {
            modal.classList.remove("is-active");
          }
          

        });
  
        const editTd = document.createElement("td");
        const deleteTd = document.createElement("td");
        editTd.appendChild(editButton);
        deleteTd.appendChild(deleteButton);
        tr.appendChild(editTd);
        tr.appendChild(deleteTd);
  
        // Add row to table body
        tbody.appendChild(tr);
      });  
  
  
      // Add table body to table
      table.appendChild(tbody);
  
      // Add table to page
      const card2Body = document.getElementById("card2Body");
      card2Body.appendChild(table);

      // Create button that brings up a different modal
      const createButton = document.createElement("button");
      createButton.textContent = "Create a new Account";
      createButton.classList.add("button", "is-small", "is-success", "is-5", "has-text-centered","mt-6", "mx-auto");  
      
      // Add flex container
      const container = document.createElement("div");
      container.classList.add("is-flex", "justify-content-center");
      container.appendChild(createButton);
      
      // Add container to card2Body
      card2Body.appendChild(container); 
      
      /*
      *   CREATE ACCOUNT FEATURE
      */
      createButton.addEventListener("click", () => {       

        // Display modal with input fields for editing the user data
        const modal = document.getElementById("modal");
        modal.classList.add("is-active");

        // Set modal header
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.textContent = "Create a Profile";
        
        //Creates input fields
        const emailInput = document.createElement("input");
        emailInput.classList.add("input", "is-medium");
        emailInput.type = "email";
        emailInput.placeholder = "Email Address";      

        //Creates a password input
        const passInput = document.createElement("input");
        passInput.classList.add("input", "is-medium");
        passInput.type = "password";
        passInput.placeholder = "Password";

        const forenameInput = document.createElement("input");
        forenameInput.classList.add("input", "is-medium");
        forenameInput.type = "text";
        forenameInput.placeholder = "Forename";

        const surnameInput = document.createElement("input");
        surnameInput.classList.add("input", "is-medium");
        surnameInput.type = "text";
        surnameInput.placeholder = "Surname";
        
        //Creates a drio downSelect ----------------------------------
        const privilegeLevelInput = document.createElement("select");
        privilegeLevelInput.classList.add("select", "is-medium");
        privilegeLevelInput.name = "privilege-level";

        const optionElement1 = document.createElement("option");
        optionElement1.value = 1;
        optionElement1.textContent = "Admin";

        const optionElement2 = document.createElement("option");
        optionElement2.value = 2;
        optionElement2.textContent = "Health Prof";

        const optionElement3 = document.createElement("option");
        optionElement3.value = 3;
        optionElement3.textContent = "User";

        privilegeLevelInput.appendChild(optionElement1);
        privilegeLevelInput.appendChild(optionElement2);
        privilegeLevelInput.appendChild(optionElement3);

        const iconElement = document.createElement("span");
        iconElement.classList.add("icon", "is-small");
        iconElement.innerHTML = '<i class="fas fa-angle-down"></i>';

        const modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = "";
        modalBody.appendChild(forenameInput);
        modalBody.appendChild(surnameInput);
        modalBody.appendChild(emailInput);
        modalBody.appendChild(passInput);        
        modalBody.appendChild(privilegeLevelInput);
        modalBody.appendChild(iconElement);   

        // Add submit and cancel buttons to modal footer
        const modalFooter = document.getElementById("modalFooter");
        modalFooter.innerHTML = "";

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.classList.add("button", "is-primary");
        submitButton.addEventListener("click", () => {
          console.log("Submit button clicked");

          // Get updated values from input fields
          const updatedEmail = emailInput.value;
          const updatedPrivilegeLevel = privilegeLevelInput.value;
          const updatedForename = forenameInput.value;
          const updatedSurname = surnameInput.value;
          const updatedPassword = passInput.value;
          console.log("New Values:");
          console.log(updatedEmail);
          console.log(updatedPrivilegeLevel);
          console.log(updatedForename);
          console.log(updatedSurname);
          console.log(updatedPassword);
         

          try {
            const url = 'https://localhost:7200/api/Accounts';
        
            fetch(url, {
                method: 'POST',
                headers: {
                  'accept': '*/*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: 0,
                  userEmail: updatedEmail,
                  userPassword: updatedPassword,
                  privilegeLevel: updatedPrivilegeLevel,
                  forename: updatedForename,
                  surname: updatedSurname
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
              alert("Success! Updating Records.");
              location.reload();            
  
             
        
          } catch {
            console.log("something went wrong trying to PUT");
            alert("Something went wrong and Changes couldn't be saved");
            return;
          }

           // Close modal
          modal.classList.remove("is-active");
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("button");
        cancelButton.addEventListener("click", () => {
          console.log("Cancel button clicked");

          // Close modal
          modal.classList.remove("is-active");
        });

        modalFooter.appendChild(submitButton);
        modalFooter.appendChild(cancelButton);
      });

      });      
        
  
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
        try{
          mentee=myMentees[i];
        var details = await getMenteeDetails(mentee);
        aMentee = [details['forename'], details['surname'], details['userEmail']];
        str1 = details['forename'];
        str2 = details['surname'];
        str3 = details['userEmail'];

        listEntry = "Your Mentee: "+str1+ " "+str2+"'s email address is :"+str3+ ". \n"+ " \n";         

        menteeDetails.push(listEntry);
        }catch(error){
          if (error.status === 404) {
            try{
              const success = await deleteAccountById(myMentees[i]);
                if (success) {
                  console.log('Cleaned a deleted Account');
                } else {
                  console.log('Failed to delete account.');
                  aMentee = ["Deleted Account", "Deleted Account", "Deleted Account"];
                  listEntry = "Error: this Mentee's account details are missing.\n\n";
                  menteeDetails.push(listEntry);
                }
            }catch{console.log("Found a deleted account and could clean it up.")}            
        } else {
            console.error('There was a problem getting the mentee details:', error);
        }
        }
        
        
  }
  console.log("              !           !      "+menteeDetails);
       
  const card2Body = document.getElementById("card2Body");
  card2Body.innerHTML = ""; // Clear any previous content

  //  Create a list element and append it to card2Body             
  const menteesList = document.createElement("ul");
  card2Body.appendChild(menteesList);

  console.log("mdetails lenght is "+menteeDetails.length);

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

}
else if(privLevel==1){
  // THis is the ADMIN Account type.
  //
  document.getElementById("card2Title").innerHTML = "Welcome Admin";
  document.getElementById("card2Body").innerHTML = "";  
  //show all health profs
  //option to CRUD a health prof
  //option to CRUD an admin
  //option to create a user

  await adminGetAccounts();

  

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
var imageCog = document.getElementById("imageCog");
 imageCog.style.display = "none";

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
 var imageCog = document.getElementById("imageCog");
 imageCog.style.display = "none";

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
 var imageCog = document.getElementById("imageCog");
 imageCog.style.display = "none";

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
            //SignOut sometimes work sometimes doesnt so i will hardcode it in
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




