const DynamodDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamodDB.DocumentClient({ region: "us-east-1" });
const { NOTES_TABLE_NAME } = process.env;

const deleteNote = async (event) => {
  const notesId = event.pathParameters.id;
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: { notesId },
      ConditionExpression: "attribute_exists(notesId)",
    };

    await documentClient.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(`The Note with id: ${notesId} has been deleted`),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

module.exports = { handler: deleteNote };
