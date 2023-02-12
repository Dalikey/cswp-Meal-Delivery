import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentHouseService } from './studentHouse.service';
import { StudentHouseInfo, ResourceId } from '@md/data';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('studentHouse')
export class StudentHouseController {
  constructor(private readonly studentHouseService: StudentHouseService) {}

  @Post()
  async createStudentHouse(
    @Body() studentHouse: StudentHouseInfo
  ): Promise<ResourceId> {
    try {
      return await this.studentHouseService.createStudentHouse(studentHouse);
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<StudentHouseInfo[]> {
    return this.studentHouseService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<StudentHouseInfo> {
    return this.studentHouseService.getOne(id);
  }

  @Put(':id')
  async updateStudentHouse(
    @InjectToken() token: Token,
    @Param('id') studentHouseId: string,
    @Body() studentHouse: StudentHouseInfo
  ): Promise<StudentHouseInfo> {
    try {
      return this.studentHouseService.updateStudentHouse(
        studentHouseId,
        studentHouse,
        token.id
      );
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteStudentHouse(@Param('id') id: string) {
    await this.studentHouseService.deleteOne(id);
  }
}
