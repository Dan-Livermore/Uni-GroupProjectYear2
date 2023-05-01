document.addEventListener("DOMContentLoaded", () => {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}

	const burgerIcon = document.querySelector('#burger-icon');
	const navbarMenu = document.querySelector('#nav-links');
	
	burgerIcon.addEventListener("click", (event) => {
		navbarMenu.classList.toggle("is-active");
		event.preventDefault();
	});
	

	const textarea = document.getElementById("session1ActivityAnswer1");
	const button = document.getElementById("save1");

	const textarea1 = document.getElementById("session1ActivityAnswer2");
	const button1 = document.getElementById("save2");

	const textarea2 = document.getElementById("session1ActivityAnswer3");
	const button2 = document.getElementById("save3");
    
	button.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer1", textarea.value);
	  });
	  button1.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer2", textarea1.value);
	  });
	  button2.addEventListener("click", function() {
		localStorage.setItem("session1ActivityAnswer3", textarea2.value);
	  });

	  const createJournalEntry = () => {
		var userID = localStorage.getItem("user_id");
		const feedbackText = document.getElementById("session1ActivityFeedback").value;
		const currentDate = new Date();
		const dateOnly = currentDate.toDateString();
		const url = 'https://localhost:7200/api/Journals';
		const data = {
		  userId: userID,
		  journalEntry: feedbackText,
		  entryDate: dateOnly
		};
		const options = {
		  method: 'POST',
		  headers: {
			'accept': 'text/plain',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		};
		
		return fetch(url, options)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Failed to create Journal entry.');
			}
			console.log('Journal entry created successfully.');
		  })
		  .catch(error => {
			console.error(error);
		  });
	  };

	  
	
	const updateJournalData = () => {
		var userID = localStorage.getItem("user_id")
		const feedbackText = document.getElementById("session1ActivityFeedback").value
		const currentDate = new Date();
		const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
		const formattedDate = currentDate.toLocaleDateString('en-GB', dateOptions);
		console.log(formattedDate)
	
		const url = 'https://localhost:7200/api/Journals/' + userID;
		const data = {
			userId: userID,
  			journalEntry: feedbackText,
  			entryDate: "string"
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
			  throw new Error('Failed to update Journal data.');
			}
			console.log('Journal data updated successfully.');
		  })
		  .catch(error => {
			console.error(error);
		  });
	  };

	  const updateButton = document.querySelector('#save4');
	  updateButton.addEventListener('click', () => {
		createJournalEntry()
		  .then(() => {
			console.log('Journal entry created successfully.');
			return updateJournalData();
		  })
		  .then(() => {
			console.log('Journal data updated successfully.');
		  })
		  .catch(error => {
			console.error(error);
		  });
	  });

	  
  });

