function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

// PHASES 3 & 4 shifted to top:

// Learn more about associative arrays in JS: https://www.xul.fr/javascript/associative.php
const letterVals = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "M": 1000
};

// Function (romanToInt) that takes romanString as a parameter and returns int from roman value, ex. XXVII: 27, XIV: 14
function romanToInt(romanString) {
    if (romanString === "") {
        return 0;
    }
    romanArr = romanString.split("");

    len = romanArr.length
    value = 0;
    romanArr.forEach((item, index) => {
        if (item === "I" && index + 1 < len &&
            (romanArr[index + 1] === "V" || romanArr[index + 1] === "X")) {
        // I can be placed before V (5) and X (10) to make 4 and 9
        value -= 2 * letterVals[item];
        } else if (item === "X" && index + 1 < len &&
            (romanArr[index + 1] === "L" || romanArr[index + 1] === "C")) {
            // X can be placed before L (50) and C (100) to make 40 and 90.
            value -= 2 * letterVals[item];
        } else if (item === "C" && index + 1 < len &&
            (romanArr[index + 1] === "D" || romanArr[index + 1] === "M")) {
        // C can be placed before D (500) and M (1000) to make 400 and 900
        value -= 2 * letterVals[item];
        }

        value += letterVals[item];
    });

    return value;
}

// https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function intToRoman(input) {
    if (isNaN(input))
        return NaN;
    var digits = String(+input).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

//PHASE 1 & PHASE 5:

// Initialize an array that will hold the values to be calculated (from the command line)
function get_args() {
    if (!isNumber(process.argv[2])) {
        var operand1 = romanToInt(process.argv[2]);
    } else {
        var operand1 = process.argv[2];
    }
    
    if(!isNumber(process.argv[4])) {
        var operand2 = romanToInt(process.argv[4]);
    } else {
        var operand2 = process.argv[4];
    }

    var operator = process.argv[3];
    let op = [operand1, operator, operand2];
    return op;
}

// PHASE 2:

function calculate() {
    // Use previously built get_args function to get operators and operand
    let op = get_args();
    var a = Number(op[0]);
    var operator = op[1];
    var b = Number(op[2]);

    // Initialize variable to hold result of operations
    var result = 0;

    // Use conditions to determine what the operation is from the user input and calculate the result
    if(operator == '+') {
        result = a + b;
    } else if(operator == '-') {
        result = a - b;
    } else if(operator == 'x') {
        result = a * b;
    } else if(operator == '/') {
        result = a / b;
    } else if(operator == '^') {
        result = a ** b;
    } else if(operator == '%') {
        result = a % b;
    }

    return result;
}

var result = calculate();
op = get_args();
  
console.log("Results:");
console.log(result);
console.log(intToRoman(result));