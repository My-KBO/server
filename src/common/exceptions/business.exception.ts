export class BusinessException extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
  ) {
    super(message);
  }
}
