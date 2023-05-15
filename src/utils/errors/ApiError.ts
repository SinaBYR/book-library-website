export class ApiError extends Error {
  constructor(statusCode: number, message: string, payload?: any, stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    this.payload = payload;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  payload: any;
  statusCode: number;
}