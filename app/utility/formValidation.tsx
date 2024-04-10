// RegEx Constants
const userRegex:RegExp =/^[A-Za-z0-9_]{3,32}$/;
const passRegex:RegExp = /^(?=.*[\d])(?=.*[!@#$%^&*_])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,32}$/;
const emailRegex:RegExp = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/;

// Error messages for invalid inputs
const userInvalid:string = 'Invalid username!\n' +
    'Make sure your username is between 3 and 32 characters.';
const passInvalid:string = 'Invalid password!\n' +
    'Make sure your password is between 8 and 32 characters and\n' +
    'has at least one uppercase and lowercase letter, a number,\n' +
    'and a special character.';
const passMatchInvalid:string = 'Passwords don\'t match!\n' +
    'Make sure both passwords match.';
const emailInvalid:string = 'Invalid email!\n' + 
    'Make sure that you typed in a valid email address.';


/**
 * Performs form validation on a given string and checks if it's in correct form
 * 
 * @param value The string we are validating
 * @param form  The form the value must follow
 * @returns     Whether or not value is valid
 */
function CheckValue(value:string, form:RegExp) {
    return form.test(value) ? true : false;
}

/**
 * FormValidation for username
 * 
 * @param username The username to validate
 * @returns        Whether or not username is valid
 */
function IsValidUser(username:string) {
    return (username && CheckValue(username, userRegex));
}

/**
 * FormValidation for password
 * 
 * @param password The password to validate
 * @returns        Whether or not password is valid
 */
function IsValidPass(password:string) {
    return (password && CheckValue(password, passRegex));
}

/**
 * FormValidation for email
 * 
 * @param email The email to validate
 * @returns     Whether or not email is valid
 */
function IsValidEmail(email:string) {
    return (email && CheckValue(email, emailRegex));
}

/**
 * Checks if all provided strings have valid fields
 * 
 * @param username    The username to validate
 * @param password    The password to validate
 * @param passConfirm The password to match with "password"
 * @param email       The email to validate
 * @returns           An error message representing the current state of the form
 */
export function ValidateForm(username, password, passConfirm?, email?) {
    if (!IsValidUser(username)) return userInvalid;
    else if (!IsValidPass(password)) return passInvalid;
    else if (passConfirm !== undefined)
        if (password === passConfirm) return passMatchInvalid;
    else if (email !== undefined)
        if (!IsValidEmail(email)) return emailInvalid;
    return '';
}