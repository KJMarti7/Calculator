const readline = require('readline');

// Function to check if a value is numeric
function isNumeric(num) {
  return !isNaN(num);
}

// Function to perform the calculation based on operator
function calculate(num1, op, num2) {
  let result;
  switch (op) {
    case "+":
      result = num1 + num2; // Addition
      break;
    case "-":
      result = num1 - num2; // Subtraction
      break;
    case "*":
      result = num1 * num2; // Multiplication
      break;
    case "/":
      if (num2 !== 0) {
        result = num1 / num2; // Division (checking for division by zero)
      } else {
        throw new Error("Division by zero");
      }
      break;
    case "^":
      result = Math.pow(num1, num2); // Exponentiation
      break;
    case "%":
      result = num1 % num2; // Modulus
      break;
    case "sqrt":
      if (num1 >= 0) {
        result = Math.sqrt(num1); // Square root (checking for negative number)
      } else {
        throw new Error("Cannot calculate square root of a negative number");
      }
      break;
    case "sin":
      result = Math.sin(num1); // Sine function
      break;
    case "cos":
      result = Math.cos(num1); // Cosine function
      break;
    case "tan":
      result = Math.tan(num1); // Tangent function
      break;
    case "log":
      if (num1 > 0) {
        result = Math.log(num1); // Natural logarithm (base e)
      } else {
        throw new Error("Cannot calculate logarithm of a non-positive number");
      }
      break;
    case "fact":
      if (num1 >= 0 && Number.isInteger(num1)) {
        result = factorial(num1); // Factorial function
      } else {
        throw new Error("Cannot calculate factorial of a negative number or non-integer");
      }
      break;
    default:
      throw new Error("Invalid operator");
  }
  return result;
}

// Function to calculate factorial
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

// Function to display error messages with details
function displayError(error) {
  console.error("Error:", error.message);
}

// Function to display usage information
function displayHelp() {
  console.log("JavaScript Calculator");
  console.log("Usage: <number> <operator> <number>");
  console.log("Operators: +, -, *, /, ^ (exponentiation), % (modulus), sqrt, sin, cos, tan, log, fact");
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user if they want to continue
function askToContinue() {
  rl.question("Do you want to continue? (yes/no): ", (answer) => {
    if (answer.trim().toLowerCase() === "yes") {
      calculateUserInput();
    } else if (answer.trim().toLowerCase() === "no") {
      console.log("Exiting calculator. Goodbye!");
      rl.close();
    } else {
      console.log("Invalid input. Please enter 'yes' or 'no'.");
      askToContinue();
    }
  });
}

// Function to get input from the user and perform calculation
function calculateUserInput() {
  rl.question("Enter first number: ", (num1) => {
    rl.question("Enter operator (+, -, *, /, ^ (exponentiation), % (modulus), sqrt, sin, cos, tan, log, fact (factorial)): ", (op) => {
      rl.question("Enter second number (if applicable): ", (num2) => {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        try {
          if (!isNumeric(num1) || (isNaN(num2) && op !== "sqrt" && op !== "sin" && op !== "cos" && op !== "tan" && op !== "log" && op !== "fact")) {
            throw new Error("Invalid input. Please enter valid numbers.");
          }

          // Perform calculation and display result
          const result = calculate(num1, op, num2);
          if (result !== undefined) {
            console.log("Result:", result.toFixed(2)); // Limiting result to 2 decimal places
          }
        } catch (error) {
          displayError(error);
        }

        // Prompt user to continue or exit
        askToContinue();
      });
    });
  });
}

// Start the calculator
console.log("Welcome to the JavaScript Calculator!");
console.log("Type 'exit' anytime to quit the calculator.");
calculateUserInput();
