import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { StudentDTO, StudentDTOI } from './dto/student.dto';

const DYNAMODB_TABLE_NAME = 'students';

@Injectable()
export class StudentRepository {
  async findOne(id: string) {
    const dynamoDBClient = new DynamoDBClient({ region: 'us-east-2' });

    try {
      const response = await dynamoDBClient.send(
        new QueryCommand({
          TableName: DYNAMODB_TABLE_NAME,
          KeyConditionExpression: 'id = :id',
          FilterExpression: 'isDeleted <> :isDeleted',
          ExpressionAttributeValues: {
            ':id': { S: id },
            ':isDeleted': { BOOL: true },
          },
        }),
      );

      if (response.Items.length > 0) {
        const unmarshalledResponse = unmarshall(response.Items[0]);

        return new StudentDTO(unmarshalledResponse as StudentDTOI);
      }

      return undefined;
    } catch (e) {
      throw e;
    }
  }

  async findByName(name: string) {
    const dynamoDBClient = new DynamoDBClient({ region: 'us-east-2' });

    const students: StudentDTOI[] = [];

    try {
      const response = await dynamoDBClient.send(
        new ScanCommand({
          TableName: DYNAMODB_TABLE_NAME,
          FilterExpression:
            'isDeleted <> :isDeleted AND ' +
            '(contains (#lastName, :queryInput) OR contains (#firstName, :queryInput))',
          ExpressionAttributeNames: {
            '#lastName': 'lastName',
            '#firstName': 'firstName',
          },
          ExpressionAttributeValues: {
            ':queryInput': { S: name },
            ':isDeleted': { BOOL: true },
          },
        }),
      );

      if (response.Items.length > 0) {
        response.Items.forEach((item) => {
          const unmarshalledResponse = unmarshall(item);

          students.push(unmarshalledResponse as StudentDTOI);
        });
      }

      return students;
    } catch (e) {
      throw e;
    }
  }

  async create(studentDTO: StudentDTO) {
    try {
      const dynamoDBClient = new DynamoDBClient({ region: 'us-east-2' });

      const creationResponse = await dynamoDBClient.send(
        new PutItemCommand({
          TableName: DYNAMODB_TABLE_NAME,
          Item: marshall(studentDTO, { convertClassInstanceToMap: true }),
        }),
      );

      if (creationResponse.$metadata.requestId) {
        return studentDTO;
      }
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string) {
    try {
      const dynamoDBClient = new DynamoDBClient({ region: 'us-east-2' });

      const removeResponse = await dynamoDBClient.send(
        new UpdateItemCommand({
          TableName: DYNAMODB_TABLE_NAME,
          Key: {
            id: { S: id },
          },
          UpdateExpression: 'SET #isDeleted = :nowDeleted',
          ExpressionAttributeNames: {
            '#isDeleted': 'isDeleted',
          },
          ExpressionAttributeValues: {
            ':nowDeleted': { BOOL: true },
          },
        }),
      );

      if (removeResponse.$metadata.requestId) {
        return id;
      }
    } catch (e) {
      throw e;
    }
  }
}
