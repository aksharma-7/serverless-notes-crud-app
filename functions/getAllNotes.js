const DynamodDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamodDB.DocumentClient({ region: "us-east-1" });
const { NOTES_TABLE_NAME } = process.env;

const getAllNotes = async (event) => {
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
    };
    const notes = await documentClient.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(notes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

module.exports = { handler: getAllNotes };
