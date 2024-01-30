const inputElement = document.getElementById('text-input');
const resultElement = document.getElementById('result');


function clearInput() {
  // Add a click event listener to the document
  document.addEventListener('click', function(event) {
    // Check if the click did not occur inside the input box
    if (event.target !== inputElement) {
        // Clear the input field
        inputElement.value = '';
      }
  });
}
  

function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        
  // Reverse the cleaned string
  const reversedStr = cleanStr.split('').reverse().join('');
        
  // Check if the cleaned string is the same as its reverse
  return cleanStr === reversedStr;
}
  

function checkPalindrome() {
  const inputString = inputElement.value.trim();
  const isPalindromeResult = isPalindrome(inputString);
  if (inputString === '') {
    alert('Please input a value');
  
  } else {
    resultElement.textContent = isPalindromeResult

        ? `${inputString} is a palindrome!`
        : `${inputString} is not a palindrome.`;
  
    clearInput();
    }
}