const DynamodDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamodDB.DocumentClient({ region: "us-east-1" });
const { NOTES_TABLE_NAME } = process.env;

const createNote = async (event) => {
  const data = JSON.parse(event.body); // Parsed because event body is stringified
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Item: {
        notesId: data.id,
        tite: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)", // this condition will check before inserting in DB if there is already a note with same id
    };

    await documentClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

module.exports = { handler: createNote };
