import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IamModule } from '../iam/iam.module';
import { Serial, SerialSchema } from './seral.schema';
import { SerialsController } from './serials.controller';
import { SerialsService } from './serials.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Serial.name, schema: SerialSchema }]),
    forwardRef(() => IamModule),
  ],
  controllers: [SerialsController],
  providers: [SerialsService],
  exports: [SerialsService],
})
export class SerialsModule {}
