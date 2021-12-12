import '../css/style.css';
import tickImage from '../images/tick.png';
import crossImage from '../images/cross.png';

const form = document.getElementById('myForm');
const formElements = Array.from(form.elements); //puts all the input element in an array

/* BEGINNING OF FORM CHECK */
formElements.forEach(formElement => {
    formElement.addEventListener('blur', () => {
        validateElement(formElement);
    })
});

function validateElement(element) {
    const rules = element.dataset.validate.split(" ");
    rules.forEach(rule => {
        // validators[rules] return a function
        // input element into the function
        if (validators[rules](element)) {
            return;
        }
        else {
            markElementInvalid(element, rule);
        }
    });
}

// inline validation checking, does not take into account cross-field compatibiltiy (E.g. password and confirm password)
const validators = {
    email: element => element.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),

    // ban Singapore
    country: element => element.value !== 'singapore',

    // at least 8 char; at least 1 special symbol, 1 lowercase letter, 1 uppercase letter, 1 number
    password: element => element.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),

    confirmPassword: element => element.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
}


// tick or cross based on field validity
const tickBox1 = document.getElementById('tickBox1');
const tickBox2 = document.getElementById('tickBox2');
const tickBox3 = document.getElementById('tickBox3');
// tickBox1.src = tickBox2.src = tickBox3.src = crossImage;

function markElementInvalid(element, validatorName) {
    console.log(validatorName); // should be a warning message
}
/* END OF FORM CHECK */


/* BEGINNING OF SAME-PASSWORD CHECK */
// check password and confirm password is same
const tickBox4 = document.getElementById('tickBox4');
tickBox4.src = crossImage; // default is a cross

const confirmPassword = document.getElementById('confirmPassword');
confirmPassword.addEventListener('keyup', boxTick);

function boxTick() {
    const pass1 = document.getElementById('password').value;
    const pass2 = document.getElementById('confirmPassword').value;

    if (checkPassword(pass1, pass2)) {
        tickBox4.src = tickImage;
    }
    else {
        tickBox4.src = crossImage;
    }
}

function checkPassword(pass1, pass2) {
    return pass1 === pass2;
}
/* END OF SAME-PASSWORD CHECK */



