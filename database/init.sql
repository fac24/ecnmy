BEGIN;

DROP TABLE IF EXISTS locations, datasets, topics, datasets_topics CASCADE;

CREATE TABLE locations (
    code TEXT NOT NULL, 
    name TEXT NOT NULL
    );

CREATE TABLE datasets (
    id SERIAL PRIMARY KEY, 
    indicator TEXT NOT NULL,
    data JSON  
);

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE datasets_topics (
    dataset_id INTEGER REFERENCES datasets(id),
    topic_id INTEGER REFERENCES topics(id)
);

COMMIT;