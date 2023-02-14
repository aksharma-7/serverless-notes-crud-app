"use strict";

const updateNote = async (event) => {
  const notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify(`The Note with ${notesId} has been updated`),
  };
};

module.exports = { handler: updateNote };
