import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { mongo } from 'mongoose';

@Catch(mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: mongo.MongoServerError, host: ArgumentsHost) {
    console.log(exception);
    switch (exception.code) {
      case 11000:
        throw new ConflictException(
          `Duplicate unique key '${Object.keys(exception.keyValue)}`,
        );
    }
  }
}
