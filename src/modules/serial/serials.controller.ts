import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../iam/auth.guard';
import { Roles } from '../iam/role.decorator';
import { FilterSerialsDto, GenerateSerialsDto, UpdateSerialsDto } from './dtos';
import { Serial } from './seral.entity';
import { SerialsService } from './serials.service';

@Controller('serials')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Serials')
export class SerialsController {
  constructor(private service: SerialsService) {}

  @Roles('admin')
  @Get('')
  @ApiOkResponse({
    description: 'List of Serials, can filtered by status',
    type: [Serial],
  })
  async getFilteredUsers(
    @Query() filterUsersDto: FilterSerialsDto,
  ): Promise<Serial[]> {
    return await this.service.getSerials(filterUsersDto);
  }

  @Roles('admin')
  @Post('')
  @ApiOperation({ summary: 'generate new serials' })
  @ApiBody({ type: GenerateSerialsDto })
  @ApiCreatedResponse({ description: 'Generated serials', type: [Serial] })
  async generate(@Body() dto: GenerateSerialsDto): Promise<Serial[]> {
    return await this.service.generate(dto.count);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'delete serial' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.delete(id);
  }

  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'update serial status' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSerialsDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }
}
