# Students API

This service will be used for a future/possible dashboards of school students, which information will be stored
in a DynamoDB database and served through a serverless API thanks to AWS.

## Technologies

- This API was developed using base features of the NestJS framework
- The database used was DynamoDB
- The flow of deployment was backed up by Github Actions

## Database schema

Here's an example of the data being stored in the database:

```json
{
  "id": "d1a043ed-7891-4a5c-a093-81b3270df86f",
  "address": "123 Maple St, Springfield, IL, 62704, USA",
  "courses": [
    "CSE201",
    "ENG101",
    "HIS202"
  ],
  "createdAt": "2024/08/04 20:38:45",
  "dateOfBirth": "1998-03-22",
  "email": "alice.johnson@example.com",
  "enrollmentDate": "2019-08-20",
  "firstName": "Alice",
  "gender": "Female",
  "isDeleted": false,
  "lastName": "Johnson",
  "phone": "+1234567890",
  "updatedAt": "2024/08/04 20:38:45"
}
```

## API Usage

There are four endpoints available:

- Get student by ID

```bash
curl --location 'http://localhost:3000/student/abc123'
```

- Get students by name/last name match

```bash
curl --location 'http://localhost:3000/student/name/john'
```

- Add new student to database

```bash
curl --location 'http://localhost:3000/student' \
--header 'Content-Type: application/json' \
--data-raw '{
"firstName": "Charlie",
"lastName": "Davis",
"dateOfBirth": "1999-12-10",
"gender": "Non-binary",
"email": "charlie.davis@example.com",
"phone": "+1098765432",
"address": "789 Pine St, Lakeside, TX, 76102, USA",
"enrollmentDate": "2021-01-15",
"courses": ["ART101", "MUS101", "ENG201"]
}'
```

- Delete (soft delete) a student

```bash
curl --location --request DELETE 'http://localhost:3000/student/12345'
```