const db = require("./connection.js");

const selectAllByServerSideParam = async (table) => {
  const SELECT_ALL = /*SQL*/ `
    SELECT *
    FROM ${table} -- as serverside this is ok to do and allows us to reuse this function
  `;
  return await db.query(SELECT_ALL).then((resolve) => resolve.rows);
};

const selectTopicsWithLinkedData = async () => {
  const SELECT_TOPICS = /*SQL*/ `
  SELECT topics.name, datasets.indicator
  FROM topics
    INNER JOIN datasets_topics ON topics.id = datasets_topics.topic_id
    INNER JOIN datasets ON datasets_topics.dataset_id = datasets.id
    WHERE datasets.data IS NOT NULL
  `;
  return await db.query(SELECT_TOPICS).then((resolve) => resolve.rows);
};

const selectDataByTopicName = async (topic) => {
  const SELECT_DATA = /*SQL*/ `
    SELECT datasets.data, datasets.indicator, datasets.metadata
    FROM datasets
      JOIN datasets_topics ON datasets.id = datasets_topics.dataset_id
      JOIN topics ON topics.id = datasets_topics.topic_id
    WHERE topics.name = $1
  `;
  return await db.query(SELECT_DATA, [topic]).then((resolve) => resolve.rows);
};

const selectDatasetByIndicator = async (indicator) => {
  const SELECT_DATASET = /*SQL*/ `
    SELECT *
    FROM datasets
    WHERE indicator = $1
  `;
  return await db
    .query(SELECT_DATASET, [indicator])
    .then((resolve) => resolve.rows[0]);
};

module.exports = {
  selectAllByServerSideParam,
  selectTopicsWithLinkedData,
  selectDataByTopicName,
  selectDatasetByIndicator,
};
