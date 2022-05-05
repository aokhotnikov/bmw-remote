export enum ProblemKind {
  Unauthorized,
  Timeout,
  NotFound,
  ServerError,
  BadRequest,
  Forbidden,
  VehicleUnreachable,
  PermanentlyInvalidCredentials
}

export interface Problem {
  kind: ProblemKind;
  title: string;
  detail: string;
}

abstract class ProblemError extends Error implements Problem {

  abstract kind: ProblemKind;
  abstract title: string;
  abstract detail: string;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends ProblemError {

  kind: ProblemKind;
  title: string;
  detail: string;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.kind = ProblemKind.BadRequest;
    this.title = 'Bad Request';
    this.detail = message;
  }
}

export class UnreachableError extends ProblemError {

  kind: ProblemKind;
  title: string;
  detail: string;

  constructor(message: string) {
    super(message);
    this.name = 'UnreachableError';
    this.kind = ProblemKind.VehicleUnreachable;
    this.title = 'Vehicle unreachable';
    this.detail = message;
  }
}

export class NotFoundError extends ProblemError {

  kind: ProblemKind;
  title: string;
  detail: string;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.kind = ProblemKind.NotFound;
    this.title = 'Vehicle not found';
    this.detail = message;
  }
}

export class InvalidCredentialsError extends ProblemError {

  kind: ProblemKind;
  title: string;
  detail: string;

  constructor(property: string) {
    super('Check the entered ' + property);
    this.name = 'InvalidCredentialsError';
    this.kind = ProblemKind.PermanentlyInvalidCredentials;
    this.title = property + ' invalid';
    this.detail = 'Check the entered ' + property;
  }
}
