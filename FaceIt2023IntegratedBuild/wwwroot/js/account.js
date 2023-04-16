burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });



const privLevel = parseint(localStorage.getItem('privilegeLevel'));

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

function setBody(privLevel){

  if(privLevel==3){
    // fetches the name of the healthcare prof
  
  
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