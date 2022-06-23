export class AppError extends Error {
  /**
   * Defines errror status
   */
  status: string;

  /**
   * Marks whether error is operational or not
   */
  isOperational: boolean;

  constructor(message: string, public statusCode?: number) {
    super(message);

    /// Define status
    this.statusCode = statusCode ? 500 : statusCode;

    this.status = `${this.statusCode}`.startsWith('4') ? 'failed' : 'error';

    this.isOperational = true;

    /// Stop tracing
    Error.captureStackTrace(this, this.constructor);
  }

  throw() {
    throw new AppError(this.message, this.statusCode);
  }
}
