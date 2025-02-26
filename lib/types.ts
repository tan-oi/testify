export interface FormInputTypes{
    header:string;
    description : string;
    type : string;
}

export interface FormCredTypes {
    email: string;
    password: string;
    type : string;

}

export interface UserError{
    success: boolean;
    message : string;
    errorType : string;
}