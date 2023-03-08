burgerIcon.addEventListener("click", (event) => {
    navbarMenu.classList.toggle("is-active");
    event.preventDefault();
  });

document.getElementById("save1").addEventListener("saved1", onclick_saved);

function onclick_saved(){
  var answer1 = document.getElementById("session1ActivityAnswer1").value;
  alert(answer1);
}

