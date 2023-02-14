const DynamodDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamodDB.DocumentClient({ region: "us-east-1" });
const { NOTES_TABLE_NAME } = process.env;

const updateNote = async (event) => {
  const notesId = event.pathParameters.id;
  const data = JSON.parse(event.body);
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: { notesId },
      UpdateExpression: "set #title = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(notesId)",
    };

    await documentClient.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

module.exports = { handler: updateNote };
