export class Result<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly value?: T,
    private readonly error?: string
  ) {}

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  static failure<T>(error: string): Result<T> {
    return new Result<T>(false, undefined, error);
  }

  getError(): string | undefined {
    return this.error;
  }

  getValue(): T | undefined {
    return this.value;
  }

  isSuccess(): boolean {
    return this._isSuccess;
  }
} 