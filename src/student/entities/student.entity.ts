import es from 'date-and-time/locale/es';
import { locale, parse, format } from 'date-and-time';

import { StudentDTO } from '../dto/student.dto';
import { ApiProperty } from '@nestjs/swagger';

locale(es);

export class Student {
  @ApiProperty({
    example: 'b4c565c2-4646-4400-8ab5-f007684c51b4',
    description: `Student's unique id`,
  })
  private id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'First name and last name of the student',
  })
  private fullName: string;

  @ApiProperty({
    example: '1 de enero',
    description: `Student's birthday (spanish readable)`,
  })
  private birthday: string;

  @ApiProperty({ example: 'john@doe.com', description: `Student's email` })
  private email: string;

  @ApiProperty({
    example: 'https://wa.me/+1234567890',
    description: 'Link for direct message through whatsapp to student',
  })
  private whatsappLink: string;

  @ApiProperty({
    example: '742 Evergreen Terrace, Springfield, IL, 62704, USA',
    description: `Student's full address`,
  })
  private address: string;

  @ApiProperty({
    example: 4,
    description: `Student's number of enrolled courses`,
  })
  private numberOfCourses: number;

  constructor(studentDTO: StudentDTO) {
    const dateOfBirthParsed = parse(studentDTO.dateOfBirth, 'YYYY-MM-DD');

    this.id = studentDTO.id;
    this.fullName = `${studentDTO.firstName} ${studentDTO.lastName}`;
    this.birthday = `${format(dateOfBirthParsed, 'D de MMMM')}`;
    this.email = studentDTO.email;
    this.whatsappLink = `https://wa.me/${studentDTO.phone}`;
    this.address = studentDTO.address;
    this.numberOfCourses = studentDTO.courses.length;
  }
}
