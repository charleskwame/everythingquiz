// select parent element to display questions and buttons
let parentElement = document.getElementById("output");
// getting results element
let result = document.getElementById("results");

// initializing correct and wrong answer variables
let correctAnswersNum = 0;
let wrongAnswersNum = 0;

// getting encouragement messages
let cheerOn = document.getElementById("cheerOn");

// fetching data from server
let apiLink = "https://opentdb.com/api.php?amount=1";
// creating generate link button
let getQuestions = document.getElementById("getQuestions");
// event listener for generate button
getQuestions.addEventListener("click", getThem);
function getThem() {
	// creating fetch link
	fetch(apiLink)
		.then((response) => {
			// creating response json
			return response.json();
		})
		.then((data) => {
			getQuestions.style.display = "none";
			// getting questions
			let questionsArray = data.results;

			// resetting motivational message
			cheerOn.innerText = "";

			// looping through questions
			for (let i = 0; i < questionsArray.length; i++) {
				// decoding questions to remove html entities
				let decodedQuestion = he.decode(questionsArray[i].question);

				// remove old content
				parentElement.innerHTML = "";

				// styling output container
				parentElement.style.border = "2px #171738 solid";

				// creating question heading and styling it
				let heading = document.createElement("p");
				heading.classList.add("text-[#171738]");
				heading.classList.add("font-bold");
				heading.style.marginBottom = "8px";
				heading.style.textAlign = "center";
				heading.style.textDecoration = "underline 2px #171738";
				heading.style.textUnderlineOffset = "4px";
				heading.innerText = "QUESTION";
				parentElement.appendChild(heading);

				// creating element for questions
				let para = document.createElement("p");
				// adding classes to para to style it
				para.classList.add("text-[#171738]");
				para.classList.add("text-sm");
				para.classList.add("md:text-base");
				para.classList.add("font-bold");
				para.classList.add("text-center");
				para.classList.add("mb-10");
				para.style.marginBottom = "20px";
				// setting paragraph text
				para.innerText = decodedQuestion;
				// appending paragraph to the document
				parentElement.appendChild(para);

				// getting correct answer
				let correctAnswer = data.results[i].correct_answer;
				// decoding correct answer for clear reading
				let correctAnswerDecoded = he.decode(correctAnswer);

				// getting wrong answers
				let wrongAnswer = data.results[i].incorrect_answers;

				// adding correct answer to wrong answers
				wrongAnswer.push(correctAnswer);
				// making a copy of the array to avoid mutations
				let copyOfAnswers = [...wrongAnswer];
				// testing new shuffle method
				function shuffleArray(array) {
					// Loop through the array backwards
					for (let m = array.length - 1; m > 0; m--) {
						// Generate a random index between 0 and i
						const n = Math.floor(Math.random() * (m + 1));
						// Swap the current element with the randomly generated one
						[array[m], array[n]] = [array[n], array[m]];
					}
					// Return the shuffled array
					return array;
				}
				// calling the shuffle function to work on the array
				shuffleArray(copyOfAnswers);
				// creating buttons with answers
				for (let j = 0; j < copyOfAnswers.length; j++) {
					let button = document.createElement("button");
					button.setAttribute("class", "answerBtn");
					button.innerText = he.decode(copyOfAnswers[j]);
					// styling button
					button.style.backgroundColor = "white";
					button.style.border = "2px solid #171738";
					button.classList.add("font-bold");
					button.classList.add("px-5");
					button.style.paddingTop = "12px";
					button.style.paddingBottom = "12px";
					button.style.marginBottom = "8px";
					parentElement.appendChild(button);
					// adding event listener to button
					button.addEventListener("click", () => {
						// checking answer
						if (button.innerText == correctAnswerDecoded) {
							// creating correct button indicator
							button.style.backgroundColor = "#04E824";
							// creating prompt
							let correct = document.createElement("p");
							correct.innerText = "CORRECT ANSWER";
							// styling correct prompt
							correct.style.textAlign = "center";
							correct.style.marginTop = "10px";
							correct.style.color = "#04E824";
							correct.classList.add("font-bold");
							correct.style.fontSize = "20px";
							parentElement.appendChild(correct);
							// updating number of correct answers
							correctAnswersNum++;
							// looping to disable all buttons when an answer is selected
							let answerButtons = document.querySelectorAll(".answerBtn");
							answerButtons.forEach((btn) => {
								btn.setAttribute("disabled", "");
							});
						} else if (button.innerText !== correctAnswerDecoded) {
							// creating wrong button indicator
							button.style.backgroundColor = "red";
							// creating prompt
							let wrong = document.createElement("p");
							wrong.innerText = "WRONG ANSWER";
							// styling correct prompt
							wrong.style.textAlign = "center";
							wrong.style.marginTop = "10px";
							wrong.style.color = "red";
							wrong.classList.add("font-bold");
							wrong.style.fontSize = "20px";
							parentElement.appendChild(wrong);

							// creating element to display correct answer
							let correction = document.createElement("p");
							correction.style.color = "#171738";
							correction.style.textAlign = "center";
							correction.style.marginTop = "4px";
							correction.style.fontStyle = "20px";
							correction.classList.add("font-bold");

							correction.innerText = "The correct answer is: " + correctAnswerDecoded;
							parentElement.appendChild(correction);

							// updating number of wrong answers
							wrongAnswersNum++;
							// looping to disable all buttons when an answer is selected
							let answerButtons = document.querySelectorAll(".answerBtn");
							answerButtons.forEach((btn) => {
								btn.setAttribute("disabled", "");
							});
						}

						// displaying cheer
						if (correctAnswersNum == 5) {
							cheerOn.innerText = "Someone's warming up...";
						} else if (correctAnswersNum == 10) {
							cheerOn.innerText = "Wow look at you go!!!";
						} else if (correctAnswersNum == 15) {
							cheerOn.innerText = "15 correct answers, someone get this person a crown already.";
						} else if (correctAnswersNum == 20) {
							cheerOn.innerText = "Okay, Okay fine. We'll make you president of the knowledge club";
						} else if (correctAnswersNum == 25) {
							cheerOn.innerText = "Hold UP!!! 25 correct answers. Absolutely amazing";
						} else if (correctAnswersNum == 30) {
							cheerOn.innerText = "At this point, I have nothing else to say. You are the smartest of them all";
						}

						// displaying encouragement
						if (wrongAnswersNum == 5) {
							cheerOn.innerText = "Slow start but don't worry. It happens to the best of us";
						} else if (wrongAnswersNum == 10) {
							cheerOn.innerText = "Remember, if we make mistakes it means there is still something to learn. Keep going";
						} else if (wrongAnswersNum == 15) {
							cheerOn.innerText = "Let me tell you a secret, I once got an [F] on a paper. Aced it next time. Don't stop here";
						} else if (wrongAnswersNum == 20) {
							cheerOn.innerText = "One of the beauties of life is the fact that we can always try again and learn from our mistakes. Don't give up";
						} else if (wrongAnswersNum == 25) {
							cheerOn.innerText = "Is that quitting I see in your eyes? Take it from me, hitting roadblocks is a part of life. We can always work around or through them";
						} else if (wrongAnswersNum == 30) {
							cheerOn.innerText = "Just one more, if you still don't get it. Take a break and come back later";
						}

						// updating results display
						result.classList.add("font-semibold");
						result.style.border = "2px solid #171738";
						result.style.textAlign = "center";
						result.innerText = "Correct Answers: " + correctAnswersNum + " | " + "Wrong Answers: " + wrongAnswersNum;
					});
				}
			}

			// creating next button
			let nextButton = document.createElement("button");
			nextButton.innerText = "Next Question";
			nextButton.style.backgroundColor = "";
			nextButton.style.color = "#FFD400";
			nextButton.classList.add("font-bold");
			nextButton.classList.add("px-5");
			nextButton.style.paddingTop = "12px";
			nextButton.style.paddingBottom = "12px";
			nextButton.style.marginTop = "20px";
			nextButton.style.border = "solid 2px";
			nextButton.style.borderColor = "#FFD400";
			nextButton.classList.add("shadow-md");
			nextButton.classList.add("shadow-[#FFD400]");
			nextButton.addEventListener("click", getThem);
			parentElement.appendChild(nextButton);
		});
}

// function to open categories
let dropdown = document.getElementById("thedropdown");
let categories = document.getElementById("dropdownbtn");
categories.addEventListener("click", () => {
	if (dropdown.style.display == "none") {
		dropdown.classList.remove("hidden");
		dropdown.style.display = "block";
	} else {
		dropdown.style.display = "none";
	}
});

// function to open difficulty
let theDropdownDifficulty = document.getElementById("theDropdownDifficulty");
let dropdownDifficultyBtn = document.getElementById("dropdownDifficultyBtn");
dropdownDifficultyBtn.addEventListener("click", () => {
	if (theDropdownDifficulty.style.display == "none") {
		theDropdownDifficulty.style.display = "block";
	} else {
		theDropdownDifficulty.style.display = "none";
	}
});

// function to open type
let theDropdownType = document.getElementById("theDropdownType");
let dropdownTypeBtn = document.getElementById("dropdownTypeBtn");
dropdownTypeBtn.addEventListener("click", () => {
	if (theDropdownType.style.display == "none") {
		theDropdownType.style.display = "block";
	} else {
		theDropdownType.style.display = "none";
	}
});

// function for links to append their category value to the api link
let links = document.querySelectorAll("#link");
// using a forEach to go through the node list
links.forEach((link) => {
	link.addEventListener("click", () => {
		// if(apiLink.includes("&category=9")) {}
		apiLink += link.classList[0];
		categories.innerText = link.innerText;
		dropdown.style.display = "none";
	});
});

// function for difficulty to append their dificulty value to the api link
let difficulty = document.querySelectorAll("#difficulty");
// using a forEach to go through the node list
difficulty.forEach((difficultyLevel) => {
	difficultyLevel.addEventListener("click", () => {
		// if(apiLink.includes("&category=9")) {}
		apiLink += difficultyLevel.classList[0];
		dropdownDifficultyBtn.innerText = difficultyLevel.innerText;
		theDropdownDifficulty.style.display = "none";
	});
});

// function for difficulty to append their question type value to the api link
let type = document.querySelectorAll("#type");
// using a forEach to go through the node list
type.forEach((questionType) => {
	questionType.addEventListener("click", () => {
		apiLink += questionType.classList[0];
		dropdownTypeBtn.innerText = questionType.innerText;
		theDropdownType.style.display = "none";
	});
});
