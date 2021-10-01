const answerOutput = document.querySelector('.console');
const historyOutput = document.querySelector('.history');
const buttons = document.querySelectorAll('.btn');
const history = []
const numbers = ['0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '×', '÷'];
let pointPerNumber = false;

let result = '';

function convertEquation(eq) {
    eq = eq.split('')
    eq.forEach((char, index) => {
        if (char == '×') {
            eq[index] = '*'
        }
        else if (char == '÷') {
            eq[index] = '/'
        }
    })
    return eq.join('')
}

function containsOperation(eq) {
    for (let op of operators) {
        for (let char of eq) {
            if (op == char) {
                return true
            }
        }
    }
    return false
}

function addSpaces(eq) {
    newResult = '';
    for (let char of eq) {
        if (operators.includes(char)) {
            newResult += ` ${char} `
        }
        else {
            newResult += `${char}`
        }
    }
    return newResult
}

for (let btn of buttons) {
    btn.addEventListener('click', e => {
        if (addSpaces(result).split(' ')[addSpaces(result).split(' ').length - 1].includes('.')) {
            pointPerNumber = true;
        }
        else {
            pointPerNumber = false;
        }
        if (btn.innerHTML === '=') {
            if (operators.includes(result[result.length - 1])) {
                result = result.slice(0, -1);
                answerOutput.innerHTML = result;
            }
            if (containsOperation(result)) {
                historyOutput.innerHTML = `${result} =`;
                answer = eval(convertEquation(result));
                answerOutput.innerHTML = parseFloat(answer);
                history.push(parseFloat(answer));
                result = answerOutput.innerHTML;
            }
        }
        else {
            if (history.length >= 1) {
                historyOutput.innerHTML = `Ans = ${history[history.length - 1]}`
            }
            lastNum = result[result.length - 1]
            lastNum2 = addSpaces(result).split(' ')[addSpaces(result).split(' ').length - 1]
            if ((operators.includes(lastNum) && operators.includes(btn.innerHTML)) || (lastNum2 === '0' && !['+', '-', '×', '÷', '.', 'C', 'AC'].includes(btn.innerHTML))) {
                result = result.slice(0, -1);
                result += `${btn.innerHTML}`
                answerOutput.innerHTML = result;
            }
            else if (btn.innerHTML === 'AC' || (btn.innerHTML === 'C' && result.length == 1)) {
                answerOutput.innerHTML = '&nbsp;';
                result = '';
            }
            else if (btn.innerHTML === 'C') {
                result = result.slice(0, -1);
                answerOutput.innerHTML = result;
            }
            else if ((operators.includes(lastNum) || result === '') && btn.innerHTML === '.') {
                result += `0${btn.innerHTML}`
                answerOutput.innerHTML = result;
            }
            else {
                if (btn.innerHTML === '.' && !pointPerNumber) {
                    pointPerNumber = true;
                    result += `${btn.innerHTML}`
                }
                else if (btn.innerHTML === '.' && pointPerNumber) {
                }
                else if (operators.includes(btn.innerHTML)) {
                    if (lastNum === '.') {
                        result = result.slice(0, -1);
                    }

                    if (result.slice(-2) === '.0') {
                        result = result.slice(0, -2);
                    }

                    pointPerNumber = false;
                    result += `${btn.innerHTML}`
                }
                else {
                    result += `${btn.innerHTML}`
                }
                answerOutput.innerHTML = result;
            }
        }
    })
}
