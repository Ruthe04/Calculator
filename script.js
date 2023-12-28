const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-del]");
const clearOneButton = document.querySelector("[data-clear-one]");
const previousTextElement = document.querySelector("[data-previous-operator]");
const currentTextElement = document.querySelector("[data-current-operator]");

class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  deleteOne() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) {
      alert("Operação inválida, tente novamente!");
      calculator.clear();
      calculator.updateDisplay();
    }

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;

      case "-":
        result = _previousOperand - _currentOperand;
        break;

      case "*":
        result = _previousOperand * _currentOperand;
        break;

      case "/":
        result = _previousOperand / _currentOperand;
        break;

      default:
        return;
    }

    this.currentOperand = result;
    this.previousOperand = "";
    this.operation = "";
  }

  /* método que chama a função calculate ao clicar no botão de operador e coloca o último número digitado no previousOperand e limpa o currentOperand */
  chooseOperation(operation) {
    if (this.currentOperand === "") {
      alert("Operação inválida, tente novamente! chose");
      return;
    }

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /* clear limpa o previous e current, tornando o valor deles vazio */
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = "";
  }

  /* upadateDisplay atualiza o valor de previous e current */
  updateDisplay() {
    this.previousTextElement.innerText = `${this.previousOperand}${this.operation}`;
    this.currentTextElement.innerText = this.currentOperand;
  }

  /* inserir número/operador digitado no display */
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
}

/* intânciar a class */
const calculator = new Calculator(previousTextElement, currentTextElement);

/* for para inserir o número/operador digitado no display */
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

/* for para chamar o método chooseOperation ao clicar no botão de operador */
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

clearOneButton.addEventListener("click", () => {
  calculator.deleteOne();
  calculator.updateDisplay();
});

/* números com 0 no final não estão sendo divididos da maneira certa, aparentemente
  não está "contando" o 0 na operação
  
  números com ponto também está com erro, não está "contando" o número após o ponto

  o segundo numero não está sendo contado

  APARENTEMENTE O PROBLEMA É DA MESMA FONTE!!!!


  (o erro era o espaço entre as concatenações no appendNumber e updateDisplay)
  */
