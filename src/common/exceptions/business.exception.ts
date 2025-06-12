import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, code: number = 4001, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ message, code }, status);
  }
}
