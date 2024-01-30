const convertButton = document.getElementById('convert-btn');
const number = document.getElementById('number');
const output = document.getElementById('output');
const form = document.getElementById('form');

const romanNumeralArr = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
];

function convert() {

    // Clear previous result
    output.innerText = '';

    // Validate input
    if (number.value === '' ) {
        output.innerText = 'Please enter a valid number.';
        return;
    }

    const decimalNumber = parseInt(number.value, 10);

    if (decimalNumber < 1 ) {
        output.innerText = 'Please enter a number greater than or equal to 1.';
        return;
    }

    if (decimalNumber >= 4000 ) {
        output.innerText = 'Please enter a number less than or equal to 3999.';
        return;
    }

    // if (isNaN(decimalNumber) || decimalNumber < 1 || decimalNumber > 3999) {
    //     output.innerText = 'Please enter a valid decimal number (1-3999).';
    //     return;
    
    // }

    // Convert decimal to Roman numeral
    const romanNumeral = decimalToRoman(decimalNumber);

    // Display result
    // output.innerText = `The Roman numeral representation of ${decimalNumber} is ${romanNumeral}`;

    output.innerText = romanNumeral;

}

const clearOutputMessage = () => {
    output.innerText = '';
    output.classList.remove('alert');
  };

function decimalToRoman(num) {

    let result = "";
    for (const numeral of romanNumeralArr) {
        while (num >= numeral.value) {
            result += numeral.symbol;
            num -= numeral.value;
        }
    }

    return result;
}

convertButton.addEventListener('click', () => {
   convert();
});

clearOutputMessage();
