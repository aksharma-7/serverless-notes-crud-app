"use strict";

const createNote = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("A New Note Created"),
  };
};

module.exports = { handler: createNote };
