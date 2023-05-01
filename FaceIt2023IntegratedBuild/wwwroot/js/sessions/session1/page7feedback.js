let feedback1Answer1;
let feedbackAnswer2;
let feedback1Answer3;
let feedback1Answer4;

function setFeedback1Answer1(value) {
	return feedback1Answer1 = parseInt(value);
}

function setFeedback1Answer2(value) {
	return feedback1Answer2 = parseInt(value);
}

function setFeedback1Answer3(value) {
	return feedback1Answer3 = parseInt(value);
}

function setFeedback1Answer4(value) {
	return feedback1Answer4 = parseInt(value);
}




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
		  
		  const createFeedbackEntry = () => {
			var userID = localStorage.getItem("user_id")
			const feedbackText = document.getElementById("Feedback1AnswerText").value
		
			const url = 'https://localhost:7200/api/FeedbackForms';
			const data = {
				userId: userID,
				  sessionNumber: 1,
				  q1: feedback1Answer1,
				  q2: feedback1Answer2,
				  q3: feedback1Answer3,
				  q4: feedback1Answer4,
				  q5: null,
				  textEntry: feedbackText
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
				  throw new Error('Failed to update Feedback data.');
				}
				console.log('Feedback data updated successfully.');
			  })
			  .catch(error => {
				console.error(error);
			  });
		  };
		
		const updateFeedbackData = () => {
			var userID = localStorage.getItem("user_id")
			const feedbackText = document.getElementById("Feedback1AnswerText").value
		
			const url = 'https://localhost:7200/api/FeedbackForms' + userID;
			const data = {
				userId: userID,
				  sessionNumber: 1,
				  q1: feedback1Answer1,
				  q2: feedback1Answer2,
				  q3: feedback1Answer3,
				  q4: feedback1Answer4,
				  q5: null,
				  textEntry: feedbackText
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
				  throw new Error('Failed to update Feedback data.');
				}
				console.log('Feedback data updated successfully.');
			  })
			  .catch(error => {
				console.error(error);
			  });
		  };





		  const updateButton = document.querySelector('#submitFeedback');
		  updateButton.addEventListener('click', () => {
			createFeedbackEntry()
			  .then(() => {
				console.log('Feedback entry created successfully.');
				return updateFeedbackData();
			  })
			  .then(() => {
				console.log('Feedback data updated successfully.');
			  })
			  .catch(error => {
				console.error(error);
			  });
		  });
});
