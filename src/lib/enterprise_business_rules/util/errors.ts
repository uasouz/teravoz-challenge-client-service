export enum ErrorTypes {
    //Signup Errors
    'SGP-001' = "Invalid Email Address",
    'SGP-002' = "This email cannot be used",
    'SGP-003' = "Invalid Phone Number",
    'SGP-004' = "This phone cannot be used",

    //Authentication Errors
    'AUTH-001' = "Ops!Looks like you are not part of our party",
    'AUTH-002' = "Invalid password",
}

export function getError(errorID: any) {
    return `${errorID} - ${ErrorTypes[errorID]}`
}