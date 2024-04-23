const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn =document.getElementById('clear-btn');

// Calculatate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awitingNextValue = false;



function sendNumberValue(number){
  console.log(number);
  // calculatorDisplay.textContent = number;
  // replace current  current value if first value is entered
  if(awitingNextValue){
    calculatorDisplay.textContent = number;
    awitingNextValue = false;
    console.log("awate", awitingNextValue, "calDis.texCon", calculatorDisplay)
  } else{
    // if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if(awitingNextValue){
    return;
  }
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    console.log(".");
  }
}



function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if(operatorValue && awitingNextValue){
    operatorValue = operator;
    return;
  }

  // Assign firstValue if no value
  if(!firstValue){
    firstValue = currentValue;

  }else{
    // console.log('currentValue', currentValue);
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    // displayValue.textContent = calculation;
    console.log('calculation', calculation);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awitingNextValue = true;
  operatorValue = operator;
  // console.log('firstValue', firstValue);
  // console.log('operator', operator);
}

console.log(inputBtns);


// reset display
function resetAll(){
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awitingNextValue = false;
}

// add event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// event listener
clearBtn.addEventListener('click', resetAll);


