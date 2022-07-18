const db = require("./connection.js");

const selectAllByServerSideParam = async (table) => {
  const SELECT_ALL = /*SQL*/ `
    SELECT *
    FROM ${table} -- as serverside this is ok to do and allows us to reuse this function
  `;
  return db.query(SELECT_ALL).then((resolve) => resolve.rows);
};

module.exports = { selectAllByServerSideParam };
