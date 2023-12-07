let firstValue = "";
let secondValue = "";
let currentOperator = "";
let readingFirstValue = true;
var operands_count = 0;

let numbers = document.querySelectorAll(".operands");
let operator_ = document.querySelectorAll(".operator");
let result = document.querySelector(".result");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let PorN = document.querySelector(".positiveOrNegative");
let dot = document.querySelector(".dot");
let percentage = document.querySelector(".percentage");

clear.addEventListener("click", function (e) {
    toggleNumbersColor();
    toggleOperandsColor();
    clear.innerHTML = "AC";
    result.innerHTML = "0";
    firstValue = "";
    secondValue = "";
    currentOperator = "";
    readingFirstValue = true;
});

equal.onclick = function () {
    calculate();
};

for (var i = 0; i < numbers.length; i++) {
    var str = "";
    numbers[i].addEventListener("click", function (e) {
        toggleOperandsColor();
        var target_ = e.target.style;
        for (var j = 0; j < numbers.length; j++) {
            numbers[j].style.backgroundColor = "#505050";
        }
        target_.backgroundColor = "#868686";
        let value_ = e.target.getAttribute("value");
        if (readingFirstValue == true) {
            clear.innerHTML = "C";
            addFirstValue(value_);
            PorN.onclick = () => {
                isFirstPositive();
            };
            dot.onclick = function () {
                firstDotValue();
            };
            percentage.onclick = function () {
                firstValuePercentage();
            };
        } else {
            addSecondValue(value_);
            PorN.onclick = () => {
                isSecondPositive();
            };
            dot.onclick = function () {
                SecondDotValue();
            };
            percentage.onclick = function () {
                SecondValuePercentage();
            };
        }
    });
}
for (var i = 0; i < operator_.length; i++) {
    operator_[i].addEventListener("click", function (e) {
        toggleNumbersColor();
        var target_ = e.target.style;
        for (var j = 0; j < operator_.length; j++) {
            operator_[j].style.backgroundColor = "#ff9500";
            operator_[j].style.color = "white";
        }
        target_.backgroundColor = "white";
        target_.color = "#ff9500";
        if (firstValue != "") {
            let new_operator = e.target.getAttribute("value");
            currentOperator = new_operator;
            if (secondValue == "") readingFirstValue = false;
            if (operands_count > 0) {
                calculate();
                readingFirstValue = false;
            }
            operands_count++;
        }
    });
}

function addFirstValue(value_) {
    result.innerHTML = "";
    firstValue += value_;
    result.innerHTML = firstValue;
}

function addSecondValue(value_) {
    result.innerHTML = "";
    secondValue += value_;
    result.innerHTML = secondValue;
}

function calculate() {
    if (firstValue != "" && secondValue != "" && operator_ != "") {
        let ans;
        let firstVal = parseFloat(firstValue);
        let secondVal = parseFloat(secondValue);
        switch (currentOperator) {
            case "/":
                ans = firstVal / secondVal;
                break;
            case "*":
                ans = firstVal * secondVal;
                break;
            case "+":
                ans = firstVal + secondVal;
                break;
            case "-":
                ans = firstVal - secondVal;
                break;
        }
        result.innerHTML = ans;
        readingFirstValue = true;
        firstValue = ans;
        secondValue = "";
        currentOperator = "";
    }
}
function isFirstPositive() {
    var str = document.querySelector(".result");
    var change = parseFloat(str.innerHTML);
    if (change > 0) {
        str.innerHTML = "-" + str.innerHTML;
    } else if (str.innerHTML != "0") {
        str.innerHTML = str.innerHTML.slice(1);
    }
    firstValue = str.innerHTML;
}
function isSecondPositive() {
    var str = document.querySelector(".result");
    var change = parseFloat(str.innerHTML);
    if (change > 0) {
        str.innerHTML = "-" + str.innerHTML;
    } else if (str.innerHTML != "0") {
        str.innerHTML = str.innerHTML.slice(1);
    }
    secondValue = str.innerHTML;
}
function firstDotValue() {
    var hasDot = false;
    for (var i = 0; i < result.innerHTML.length; i++) {
        if (result.innerHTML[i] == ".") hasDot = true;
    }
    if (hasDot == false) {
        result.innerHTML = result.innerHTML + ".";
        firstValue = result.innerHTML;
    }
}
function SecondDotValue() {
    var hasDot = false;
    for (var i = 0; i < result.innerHTML.length; i++) {
        if (result.innerHTML[i] == ".") hasDot = true;
    }
    if (hasDot == false) {
        result.innerHTML = result.innerHTML + ".";
        secondValue = result.innerHTML;
    }
}
function firstValuePercentage() {
    toggleOperandsColor();
    toggleNumbersColor();
    var val = parseFloat(firstValue);
    val = val / 100;
    result.innerHTML = val;
    firstValue = val;
}
function SecondValuePercentage() {
    toggleOperandsColor();
    toggleNumbersColor();
    var val = parseFloat(firstValue);
    val = val / 100;
    result.innerHTML = val;
    secondValue = val;
}
function toggleOperandsColor() {
    for (var j = 0; j < operator_.length; j++) {
        operator_[j].style.backgroundColor = "#ff9500";
        operator_[j].style.color = "white";
    }
}
function toggleNumbersColor() {
    for (var j = 0; j < operator_.length; j++) {
        numbers[j].style.backgroundColor = "#505050";
    }
}
