/**
 * Performs form validation on a given string and checks if it's in correct form
 * 
 * @param value The string we are validating
 * @param form  The form the value must follow
 * @returns     Whether or not value is valid
 */
export function FormValidation(value: string, form: RegExp) {
    return form.test(value) ? true : false;
}