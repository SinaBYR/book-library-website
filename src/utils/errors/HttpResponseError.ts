import { Response } from "node-fetch";

export class HttpResponseError extends Error {
  response: Response;
  statusCode: number;

	constructor(statusCode: number, message: string, response: Response, stack: string = '') {
		super(message);
		this.response = response;
    this.statusCode = statusCode;
    this.name = 'HttpResponseError';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
	}
}

export class ApiError extends Error {
  constructor(statusCode: number, message: string, payload?: any, stack: string = '') {
    super(message);
    this.name = 'ApiError';
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