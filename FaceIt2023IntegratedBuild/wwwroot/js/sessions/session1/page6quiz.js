let quiz1Answer1;
let quiz1Answer2;
let quiz1Answer3;
let quiz1Answer4;
let quiz1Answer5;
let quiz1Answer6;
let quiz1Answer7;
let quiz1Answer8;


	function setquiz1Answer1(value) {
		return quiz1Answer1 = parseInt(value);
	}

	function setquiz1Answer2(value) {
		return quiz1Answer2 = parseInt(value);
	}

	function setquiz1Answer3(value) {
		return quiz1Answer3 = parseInt(value);
	}

	function setquiz1Answer4(value) {
		return quiz1Answer4 = parseInt(value);
	}

	function setquiz1Answer5(value) {
		return quiz1Answer5 = parseInt(value);
	}

	function setquiz1Answer6(value) {
		return quiz1Answer6 = parseInt(value);
	}

	function setquiz1Answer7(value) {
		return quiz1Answer7 = parseInt(value);
	}

	function setquiz1Answer8(value) {
		return quiz1Answer8 = parseInt(value);
	}

	const createQuizEntry = () => {
		var userID = localStorage.getItem("user_id")

		const url = 'https://localhost:7200/api/Quiz1/';
		const data = {
			userId: userID,
			s1Q1: quiz1Answer1,
			s1Q2: quiz1Answer2,
			s1Q3a: quiz1Answer3,
			s1Q3b: quiz1Answer4,
			s1Q3c: quiz1Answer5,
			s1Q4a: quiz1Answer6,
			s1Q4b: quiz1Answer7,
			s1Q4c: quiz1Answer8
		};
		const options = {
		  method: 'POST',
		  headers: {
			'accept': '*/*',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		};
	  
		return fetch(url, options)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Failed to update quiz data.');
			}
			console.log('Quiz data updated successfully.');
		  })
		  .catch(error => {
			console.error(error);
		  });
	  };
	  
	  

	const updateQuizData = () => {
		var userID = localStorage.getItem("user_id")


		const url = 'https://localhost:7200/api/Quiz1/' + userID;
		const data = {
		  userId: userID,
		  s1Q1: quiz1Answer1,
		  s1Q2: quiz1Answer2,
		  s1Q3a: quiz1Answer3,
		  s1Q3b: quiz1Answer4,
		  s1Q3c: quiz1Answer5,
		  s1Q4a: quiz1Answer6,
		  s1Q4b: quiz1Answer7,
		  s1Q4c: quiz1Answer8
		};
		const options = {
		  method: 'PUT',
		  headers: {
			'accept': '*/*',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		};
	  
		fetch(url, options)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Failed to update quiz data.');
			}
			console.log('Quiz data updated successfully.');
		  })
		  .catch(error => {
			console.error(error);
		  });
	  };
	  
	  
	  
document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
	const burgerIcon = document.querySelector('#burger-icon')
		const navbarMenu = document.querySelector('#nav-links')
	  
		  burgerIcon.addEventListener("click", (event) => {
			navbarMenu.classList.toggle("is-active");
			event.preventDefault();
		  });

		  const updateButton = document.querySelector('#submitQuiz1');
		  updateButton.addEventListener('click', () => {
			createQuizEntry()
			  .then(() => {
				console.log('Quiz entry created successfully.');
				return updateQuizData();
			  })
			  .then(() => {
				console.log('Quiz data updated successfully.');
			  })
			  .catch(error => {
				console.error(error);
			  });
		  });

		  
});
