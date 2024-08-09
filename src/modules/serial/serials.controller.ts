import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../iam/auth.guard';
import { Roles } from '../iam/role.decorator';
import { GenerateSerialsDto } from './dtos';
import { Serial } from './seral.schema';
import { SerialsService } from './serials.service';

@Controller('serials')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Serials')
export class SerialsController {
  constructor(private service: SerialsService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Get('')
  // @ApiOperation({
  //   summary: 'search users',
  //   description: 'users can filtered by part of username',
  // })
  // @ApiOkResponse({
  //   description: 'Paginate List of Users, can filtered by username',
  //   type: SearchUsersDto,
  // })
  // async getFilteredUsers(
  //   @Query() filterUsersDto: FilterUsersDto,
  // ): Promise<SearchUsersDto> {
  //   return await this.usersService.getFilteredUsers(filterUsersDto);
  // }

  @Roles('admin')
  @Post('')
  @ApiOperation({ summary: 'generate new serials' })
  @ApiBody({ type: GenerateSerialsDto })
  @ApiCreatedResponse({ description: 'Generated serials', type: [Serial] })
  async signUp(@Body() dto: GenerateSerialsDto): Promise<Serial[]> {
    return await this.service.generate(dto.count);
  }
}
