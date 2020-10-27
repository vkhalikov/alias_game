export class ConnectionError extends Error {
  constructor(message) {
    super(message);
  }
}

export class RequestError extends Error {
  constructor(message) {
    super(message);
  }
}

export default ConnectionError;
