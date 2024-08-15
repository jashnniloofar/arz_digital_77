import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamModule } from '../iam/iam.module';
import { Serial } from './seral.entity';
import { SerialsController } from './serials.controller';
import { SerialsService } from './serials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Serial]), forwardRef(() => IamModule)],
  controllers: [SerialsController],
  providers: [SerialsService],
  exports: [SerialsService],
})
export class SerialsModule {}
