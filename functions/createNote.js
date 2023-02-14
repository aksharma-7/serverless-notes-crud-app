"use strict";

const createNote = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify("A New Note Created"),
  };
};

module.exports = { handler: createNote };
