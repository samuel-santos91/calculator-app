class Calculator {
  constructor(displayScreen) {
    this.displayScreen = displayScreen;
    this.clearDisplay();
  }

  changeDisplay() {
    this.displayScreen.innerHTML = this.typedNumber;
    if (this.displayScreen.innerHTML === "") {
      this.displayScreen.innerHTML = "0";
    }
  }

  appendNumbers(number) {
    this.operationSign = "";

    if (number === "." && this.typedNumber.includes(".")) {
      return;
    } else if (
      (number === "." && displayScreen.innerText === "0") ||
      (number === "." && this.typedNumber === "")
    ) {
      this.typedNumber = "0.";
    } else if (displayScreen.innerText === "0") {
      this.typedNumber = number;
    } else {
      this.typedNumber = this.typedNumber + number;
    }
  }

  chooseOperation(sign) {
    this.operationSign = sign;

    if (this.previousOperationSign === "") {
      if (this.operationSign === "=") return;
      this.computation(sign);
    } else if (this.previousOperationSign != sign) {
      if (this.previousOperationSign === "=") {
        this.computation(this.operationSign);
      } else {
        this.computation(this.previousOperationSign);
      }
    } else if (sign === "=") {
      if (this.previousOperationSign === "=") {
      } else {
        this.computation(this.previousOperationSign);
      }
    } else {
      this.computation(sign);
    }
    this.displayScreen.innerHTML = this.previousNumber;
    this.typedNumber = "";
    this.previousOperationSign = this.operationSign;
  }

  computation(sign) {
    let total;

    switch (sign) {
      case "+":
        total = +this.previousNumber + +this.typedNumber;
        break;
      case "−":
        if (this.previousNumber === "") {
          this.typedNumber = -+this.typedNumber;
        }
        total = +this.previousNumber - +this.typedNumber;
        break;
      case "×":
        if (this.previousNumber === "") {
          this.previousNumber = 1;
        } else if (this.typedNumber === "") {
          this.typedNumber = 1;
        }
        total = +this.previousNumber * +this.typedNumber;
        break;
      case "÷":
        if (this.previousNumber === "") {
          this.previousNumber = 1;
          this.typedNumber = 1 / +this.typedNumber;
        } else if (this.typedNumber === "") {
          this.typedNumber = 1;
        }
        total = +this.previousNumber / +this.typedNumber;
        break;
    }
    this.previousNumber = total;
  }

  clearDisplay() {
    this.typedNumber = "";
    this.previousNumber = "";
    this.operationSign = "";
    this.previousOperationSign = "";
  }
}

const displayScreen = document.getElementById("display");
const numbers = document.querySelectorAll(".button");
const operations = document.querySelectorAll(".button-op");
const clear = document.getElementById("clear");

const calculator = new Calculator(displayScreen);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumbers(button.innerHTML);
    calculator.changeDisplay();
  });
});

operations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.changeDisplay(button.innerHTML);
    calculator.chooseOperation(button.innerHTML);
  });
});

clear.addEventListener("click", () => {
  calculator.clearDisplay();
  calculator.changeDisplay();
});



