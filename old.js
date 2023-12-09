document.addEventListener('DOMContentLoaded', () => {
    const resultElement = document.querySelector('.get_number');
    let currentOperation = '';
    let previousNumber = '';
    let currentNumber = '0';

    document.querySelectorAll('.container button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operands')) {
                handleNumber(button.value);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.value);
            } else if (button.classList.contains('clear')) {
                clearResult();
            } else if (button.classList.contains('positiveOrNegative')) {
                toggleSign();
            } else if (button.classList.contains('persentage')) {
                percentage();
            }
        });
    });

    function updateDisplay() {
        resultElement.textContent = currentNumber;
    }

    function handleNumber(number) {
        if (currentNumber === '0') {
            currentNumber = number;
        } else {
            currentNumber += number;
        }
        updateDisplay();
    }

    function handleOperator(operator) {
        if (currentOperation !== '') {
            calculate();
        }
        previousNumber = currentNumber;
        currentNumber = '0';
        currentOperation = operator;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousNumber);
        const current = parseFloat(currentNumber);

        switch (currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentNumber = result.toString();
        currentOperation = '';
        updateDisplay();
    }

    function clearResult() {
        currentNumber = '0';
        previousNumber = '';
        currentOperation = '';
        updateDisplay();
    }

    function toggleSign() {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
        updateDisplay();
    }

    function percentage() {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        updateDisplay();
    }

    function handleEqual() {
        if (currentOperation !== '') {
            calculate();
        }
    }

    document.querySelector('.equal').addEventListener('click', handleEqual);
});
