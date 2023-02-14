"use strict";

const getAllNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Fetched All notes"),
  };
};

module.exports = { handler: getAllNotes };
