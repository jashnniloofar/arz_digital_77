import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    const hexadecimalRegex = /^[0-9A-Fa-f]{24}$/;
    if (typeof value !== 'string' || !hexadecimalRegex.test(value)) {
      throw new BadRequestException(
        'id must be string of 24 hexadecimal characters',
      );
    }
    return value.toLowerCase();
  }
}
