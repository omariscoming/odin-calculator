const numbers = document.querySelectorAll('.key.num');
const display = document.querySelector('.display');
const operator = document.querySelectorAll('.key.operator');
const AC = document.querySelector('.ac-btn');
const backBtn = document.querySelector('.back-btn');
const keyEqual = document.querySelector('.key.equal');
const keyDot = document.querySelector('.key.dot');
display.textContent = `0`;
isResult = false;

const numberOperator = {
    number1: '', number2: '', operator: '',
}

const calculate =async () => {
    if (numberOperator.number1 == '' || numberOperator.number2 == '') return;
    let result;
    let number1 = parseFloat(numberOperator.number1);
    let number2 = parseFloat(numberOperator.number2);

    switch (numberOperator.operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            if (number2 == 0) {
                display.textContent = 'Error, Restarting ...'
                await sleep(500)
                doAc()
                return;
            }
            result = number1 / number2;
            break;
        default:
            return;
    }
    let resultString = parseFloat(result.toFixed(10)).toString();
    numberOperator.number1 = ''
    numberOperator.number2 = resultString
    numberOperator.operator = ''
    display.textContent = `${numberOperator.number2}`;
}
operator.forEach(element => {
    element.addEventListener('click', () => {
        if (numberOperator.number2 == '') return;
        if (numberOperator.number1 != '') {
            calculate()
        }
        numberOperator.operator = element.innerText;
        numberOperator.number1 = numberOperator.number2;
        numberOperator.number2 = '';
        display.textContent = `${numberOperator.number1} ${numberOperator.operator}`;
    })
})

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (isResult){
            doAc()
            isResult = false;
        }
        if (number.innerText == '0' && ((numberOperator.number1 == '' && numberOperator.number2 == '') || numberOperator.number2 == '0')) return;
        if (display.textContent.length > 16 ) return;
        numberOperator.number2 += number.innerText;
        display.textContent = `${numberOperator.number1} ${numberOperator.operator} ${numberOperator.number2}`;
    })
})

const doAc = async ()=>{
    numberOperator.number1 = ''
    numberOperator.number2 = ''
    numberOperator.operator = ''
    display.textContent = `0`;
    display.style.backgroundColor = '#afafaf'
    await sleep(300)
    display.style.backgroundColor = '#EEEEEE'
}

AC.addEventListener('click', async (e) => {
    doAc();
})

backBtn.addEventListener('click',async (e) => {

    backBtn.style.transform = "translateX(-5px)";
    backBtn.style.transition = "transform 0.15s ease";
    await sleep(150)
    backBtn.style.transform = "translateX(0px)";

    if (numberOperator.number2 != ''){
        numberOperator.number2 = numberOperator.number2.slice(0, -1);
        display.textContent = `${numberOperator.number1} ${numberOperator.operator} ${numberOperator.number2}`;
    }if ((numberOperator.number2 == '0' || numberOperator.number2 == '') && numberOperator.number1 == ''){
        display.textContent = '0'
    }
})

keyEqual.addEventListener('click', (e) => {
    isResult = true;
    calculate()
})

keyDot.addEventListener('click', (e) => {
    let dot = '.'
    if (numberOperator.number2.includes('.')) return
    numberOperator.number2 == '' ? dot = '0.' : '.'
    numberOperator.number2 += dot;
    display.textContent = `${numberOperator.number1} ${numberOperator.operator} ${numberOperator.number2}`;

})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
