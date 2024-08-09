import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getRandomString } from '../../utils/basic';
import { Serial, SerialDocument } from './seral.schema';
import { SerialStatus } from './serial-status.enum';

@Injectable()
export class SerialsService {
  private logger = new Logger(SerialsService.name);

  constructor(@InjectModel(Serial.name) private model: Model<SerialDocument>) {}

  async generate(count: number): Promise<Serial[]> {
    const serials: Serial[] = [];
    while (serials.length < count) {
      const code = getRandomString(20, 'alphanumeric');
      const exists = await this.model.findOne({ code });
      if (!exists) {
        const serial = new this.model({ code });
        await serial.save();
        serials.push(serial);
      }
    }
    this.logger.log(`Generated ${count} serials`);
    return serials;
  }

  async getSerialByCode(code: string): Promise<SerialDocument> {
    return await this.model.findOne({ code });
  }

  async useCode(code: string): Promise<SerialDocument> {
    const serial = await this.model.findOne({
      code,
      status: SerialStatus.active,
    });
    if (!serial) {
      throw new NotFoundException(`Invalid serial code`);
    }
    serial.status = SerialStatus.used;
    return await serial.save();
  }
}
