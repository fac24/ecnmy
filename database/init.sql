BEGIN;

DROP TABLE IF EXISTS locations, datasets, topics, datasets_topics CASCADE;

CREATE TABLE locations (
    code TEXT NOT NULL, 
    name TEXT NOT NULL
    );

CREATE TABLE datasets (
    id SERIAL PRIMARY KEY, 
    indicator TEXT NOT NULL,
    data JSON,
    metadata JSON 
);
/* 
metadata format = 
    {
        description: text,
	    downloads: {csv, csvw, xls} (could include in page),
	    keywords: array [string],
	    methodologies: {href:, title:},
	    related_datasets: array [{href:, title:}],
	    title: string
	    release_date: time-date-format
    }
*/

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE datasets_topics (
    dataset_id INTEGER REFERENCES datasets(id),
    topic_id INTEGER REFERENCES topics(id)
);

COMMIT;