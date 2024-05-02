import { UserType } from '../../api/User';

/** RegEx Constants */ 
const userRegex:RegExp =/^[A-Za-z0-9_]{3,32}$/;
const passRegex:RegExp = /^(?=.*[\d])(?=.*[!@#$%^&*_])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,32}$/;
const emailRegex:RegExp = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/;
const numberRegex:RegExp = /^\d+$/;
const nameRegex:RegExp = /^[\p{L}]+$/u;
const genderRegex:RegExp = /(?:m|M|male|Male|MALE|f|F|female|Female|FEMALE|o|O|other|Other|OTHER)$/;


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
const numberInvalid:string = 'The following value is not a valid number.';
const nameInvalid:string = 'Please enter a valid name.';
const genderInvalid:string = 'Please enter either a valid gender ' +
                             ' (Male/Female/Other).';


/** Performs form validation on a given string */
function CheckValue(value:string, form:RegExp) { return (value && form.test(value)) ? true : false; }


/** Username */
function IsValidUser(username:string) { return CheckValue(username, userRegex); }
export function ValidateUser(username:string) { return !IsValidUser(username) ? userInvalid : ''; }


/** Password */
function IsValidPass(password:string) { return CheckValue(password, passRegex); }
export function ValidatePass(password:string) { return !IsValidPass(password) ? passInvalid : ''; }


/** Email */
function IsValidEmail(email:string) { return CheckValue(email, emailRegex); }
export function ValidateEmail(email:string) { return !IsValidEmail(email) ? emailInvalid : ''; }


/** Number */
function IsValidNumber(num:string) { return CheckValue(num, numberRegex); }
/** Returns error message if the string isn't a number */
export function ValidateNumber(num:string) { return !IsValidNumber(num) ? numberInvalid : ''; }


/** Name */
function IsValidName(name:string) { return CheckValue(name, nameRegex); }
export function ValidateName(name:string) { return !IsValidName(name) ? nameInvalid : ''; }


/** Gender */
function IsValidGender(gender:string) { return CheckValue(gender, genderRegex); }
export function ValidateGender(gender:string) { return !IsValidGender(gender) ? genderInvalid : ''; }


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

/*
// TODO FIX!!!
function verifyUserData(userData, type) {

}

export function ValidateFirstLogin(userData: UserType) {
    if (!IsValidName(userData.first_name?) || !IsValidName(lname) || !IsValidGender(gender) ||
        !IsValidNumber(weight) || !IsValidNumber(height)) return false;
    else return true;
}
*/