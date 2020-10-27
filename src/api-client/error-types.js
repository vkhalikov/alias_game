export class ConnectionError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ConnectionError';
    this.statusCode = statusCode;
  }
}

export class RequestError extends ConnectionError {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.name = 'RequestError';
  }
}
