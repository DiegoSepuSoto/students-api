import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  CreateStudentDTO,
  isCreateStudentDTOValid,
} from './dto/create-student.dto';
import { fromCreateStudentDTO } from './dto/mapper.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get an student based on their unique id (uuid v4)',
  })
  @ApiResponse({ status: 200, description: 'Student found', type: Student })
  @ApiResponse({ status: 204, description: 'Requested student not found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const student = await this.studentService.findOne(id);

      if (student) {
        return response.status(200).send(student);
      }

      return response.status(204);
    } catch (e) {
      return response.status(500).send({
        errorMessage: 'there was a problem with the request',
        errorDescription: e,
      });
    }
  }

  private isFindByNameParamValid(name: string) {
    return name.length >= 3;
  }

  @Get('/name/:name')
  @ApiOperation({
    summary:
      'Get an array of students from a name search (both first and last name)',
  })
  @ApiResponse({
    status: 200,
    description: 'Students found',
    type: Student,
    isArray: true,
  })
  @ApiResponse({ status: 204, description: 'No students found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findByName(@Res() response, @Param('name') name: string) {
    if (!this.isFindByNameParamValid(name)) {
      return response.status(400).send({
        errorMessage: 'the name must have a minimum length of 3 characters',
      });
    }

    try {
      const students = await this.studentService.findByName(name);

      if (students.length > 0) {
        return response.status(200).send(students);
      }

      return response.status(204);
    } catch (e) {
      return response.status(500).send({
        errorMessage: 'there was a problem with the request',
        errorDescription: e,
      });
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Store a new student in the database from the request information',
  })
  @ApiBody({ type: CreateStudentDTO })
  @ApiResponse({
    status: 201,
    description: 'Student stored',
  })
  @ApiBadRequestResponse({
    status: 204,
    description: 'the request must follow the required parameters',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  async create(@Res() response, @Body() createStudentDTO: CreateStudentDTO) {
    if (!isCreateStudentDTOValid(createStudentDTO)) {
      return response.status(400).send({
        errorMessage: 'the request must follow the required parameters',
      });
    }

    try {
      const createdStudentID = await this.studentService.create(
        fromCreateStudentDTO(createStudentDTO),
      );

      return response.status(201).send({
        message: `student with id: ${createdStudentID} created successfully`,
      });
    } catch (e) {
      return response.status(500).send({
        errorMessage: 'there was a problem with the request',
        errorDescription: e,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a student in the database (soft delete)',
  })
  @ApiResponse({
    status: 201,
    description: 'Student removed',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedStudentID = await this.studentService.remove(id);

      return response.status(201).send({
        message: `student with id: ${deletedStudentID} deleted successfully`,
      });
    } catch (e) {
      return response.status(500).send({
        errorMessage: 'there was a problem with the request',
        errorDescription: e,
      });
    }
  }
}
