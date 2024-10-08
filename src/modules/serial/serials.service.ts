import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRandomString } from '../../utils/basic';
import { FilterSerialsDto, UpdateSerialsDto } from './dtos';
import { Serial } from './seral.entity';
import { SerialStatus } from './serial-status.enum';

@Injectable()
export class SerialsService {
  private logger = new Logger(SerialsService.name);

  constructor(
    @InjectRepository(Serial) private repository: Repository<Serial>,
  ) {}

  async getSerials(filterSerialsDto: FilterSerialsDto): Promise<Serial[]> {
    return this.repository.find({ where: filterSerialsDto });
  }

  async generate(count: number): Promise<Serial[]> {
    const serials: Serial[] = [];
    while (serials.length < count) {
      const code = getRandomString(20, 'alphanumeric');
      const exists = await this.repository.findOneBy({ code });
      if (!exists) {
        const serial = new Serial();
        serial.code = code;
        await this.repository.save(serial);
        serials.push(serial);
      }
    }
    this.logger.log(`Generated ${count} serials`);
    return serials;
  }

  async getSerialByCode(code: string): Promise<Serial> {
    return await this.repository.findOneBy({ code });
  }

  async useCode(code: string): Promise<Serial> {
    const serial = await this.repository.findOneBy({
      code,
      status: SerialStatus.active,
    });
    if (!serial) {
      throw new NotFoundException(`Invalid serial code`);
    }
    serial.status = SerialStatus.used;
    return await this.repository.save(serial);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Serial not found`);
    }
  }

  async update(id: number, updateDto: UpdateSerialsDto): Promise<void> {
    const updateResult = await this.repository.update(id, updateDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Serial not found`);
    }
  }
}
