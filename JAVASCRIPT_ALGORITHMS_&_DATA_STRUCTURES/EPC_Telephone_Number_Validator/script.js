const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

const checkInput = input => {
  if (input === '') {
    alert('Please provide a phone number');
    return;
  }
}

function validatePhoneNumber() {

    var phoneRegex = /^(1\s?)?(\([\d]{3}\)|[\d]{3})[\s\-]?[\d]{3}[\s\-]?[\d]{4}$/;

    if (phoneRegex.test(userInput.value)) {
      resultsDiv.innerHTML = `Valid US number:  ${userInput.value}`;
      resultsDiv.style.color = "green";
    } else {
      resultsDiv.innerHTML = `Invalid US number:  ${userInput.value}`;
      resultsDiv.style.color = "red";
    }
  }

checkBtn.addEventListener('click', () => {
  checkInput(userInput.value);
  validatePhoneNumber();
});


clearBtn.addEventListener('click', () => {
  resultsDiv.innerHTML = "";
  userInput.value = '';
});
