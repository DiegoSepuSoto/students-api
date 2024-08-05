import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDTO {
  @ApiProperty({
    example: 'John',
    description: `Student's name`,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: `Student's last name`,
  })
  lastName: string;

  @ApiProperty({
    example: '2003-01-23',
    description: `Student's date of birth (with format: YYYY-MM-DD):`,
  })
  dateOfBirth: string;

  @ApiProperty({
    example: 'Female',
    description: `Student's gender`,
  })
  gender: string;

  @ApiProperty({
    example: 'john@doe.com',
    description: `Student's email`,
  })
  email: string;

  @ApiProperty({
    example: '+12334567890',
    description: `Student's phone`,
  })
  phone: string;

  @ApiProperty({
    example: '742 Evergreen Terrace, Springfield, IL, 62704, USA',
    description: `Student's address`,
  })
  address: string;

  @ApiProperty({
    example: '2024-08-04',
    description: `Enrollment date of the student in the school/institute (with format: YYYY-MM-DD)`,
  })
  enrollmentDate: string;

  @ApiProperty({
    example: ['MATH101', 'BIOL102'],
    description: `Courses that the student is enrolled`,
  })
  courses: string[];
}

export const isCreateStudentDTOValid = (obj: CreateStudentDTO) => {
  return !(
    obj.firstName === '' ||
    obj.lastName === '' ||
    obj.dateOfBirth === '' ||
    obj.gender === '' ||
    obj.email === '' ||
    obj.phone === '' ||
    obj.address === '' ||
    obj.enrollmentDate === ''
  );
};
