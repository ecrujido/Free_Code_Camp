const _roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

function toRoman(number = 0) {
    return Object.keys(_roman).reduce((acc, key) => {
        while (number >= _roman[key]) {
            acc += key;
            number -= _roman[key];
        }
        return acc;
    }, '');
}

function fromRoman(roman = '') {
    return Object.keys(_roman).reduce((acc, key) => {
        while (roman.indexOf(key) === 0) {
            acc += _roman[key];
            roman = roman.substr(key.length);
        }
        return acc;
    }, 0);
}

console.log(toRoman(1966));  // should return 'MCMIII
console.log(fromRoman('MCMLXVI')); // should return 1903
