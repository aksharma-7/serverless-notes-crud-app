"use strict";

const deleteNote = async (event) => {
  const notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify(`The Note with ${notesId} has been deleted`),
  };
};

module.exports = { handler: deleteNote };
