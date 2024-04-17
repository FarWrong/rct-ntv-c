/** RegEx Constants */ 
const userRegex:RegExp =/^[A-Za-z0-9_]{3,32}$/;
const passRegex:RegExp = /^(?=.*[\d])(?=.*[!@#$%^&*_])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,32}$/;
const emailRegex:RegExp = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/;


/** Error messages for invalid inputs */
const userInvalid:string = 'Your username must be between 3 ' +
                           'and 32 characters.';
const passInvalid:string = 'Your password must be between 8 ' +
                           'and 32 characters, contain at ' +
                           'least one uppercase and lowercase ' +
                           'letter, a number, and any of the ' +
                           'following: !@#$%^&*_';
const passMatchInvalid:string = 'Both passwords must match.';
const emailInvalid:string = 'Type in a valid email address.';


/** Performs form validation on a given string */
function CheckValue(value:string, form:RegExp) {
    return (value && form.test(value)) ? true : false;
}


/** Determines if the username is valid */
function IsValidUser(username:string) {
    return CheckValue(username, userRegex);
}
/** Returns error message if the username is invalid */
export function ValidateUser(username:string) {
    return !IsValidUser(username) ? userInvalid : ''; 
}


/** Determines if the password is valid */
function IsValidPass(password:string) {
    return CheckValue(password, passRegex);
}
/** Returns error message if the username is invalid */
export function ValidatePass(password:string) {
    return !IsValidPass(password) ? passInvalid : ''; 
}


/** Determines if the password is valid */
function IsValidEmail(email:string) {
    return CheckValue(email, emailRegex);
}
/** Returns error message if the username is invalid */
export function ValidateEmail(email:string) {
    return !IsValidEmail(email) ? emailInvalid : ''; 
}


/** Validates the entire form */
export function ValidateForm(username, password, passConfirm?, email?) {
    if (!IsValidUser(username)) return userInvalid;
    else if (!IsValidPass(password)) return passInvalid;
    else if (passConfirm !== undefined)
        if (password === passConfirm) return passMatchInvalid;
    else if (email !== undefined)
        if (!IsValidEmail(email)) return emailInvalid;
    return '';
}