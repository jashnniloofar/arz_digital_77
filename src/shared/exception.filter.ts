import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // MongoError for duplicate key
    if (exception.hasOwnProperty('code') && exception['code'] === 11000) {
      const key = Object.keys(exception['keyPattern']);
      exception = new ConflictException(`${key} already exists`);
    }
    super.catch(exception, host);
  }
}
