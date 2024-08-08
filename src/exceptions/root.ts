// massage the , status , code error code and error message



export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors:ErrorCode;


    constructor(message: string, errorCode: ErrorCode, status: number, errors: any) {
        super(message)
        this.message =message
        this.errorCode = errorCode
        this.statusCode = status
        this.errors = errors
        
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 400,
    USER_ALREADY_EXISTS = 409,
    SERVER_ERROR = 500,
    INCORRECT_PASSWORD = 401,
    UNPROCESSABLE_ENTITY = 403,
    INTERNAL_EXCEPTION = 404, 
    Unauthorize_Exception= 200,
    ProductNotFound= 400,
    ItemNotFound = 400,
    CartNotFound = 400
}