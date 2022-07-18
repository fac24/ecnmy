import fs from "fs";
import fetch from "node-fetch";

async function jsonParser(file) {
  /* const data = await JSON.parse(
    fs.readFile(file, function (err, data) {
      if (err) return console.error(err);
      console.log(data.toString());
    })
  ); */
  const rawdata = fs.readFileSync(file);
  const data = await JSON.parse(rawdata);
  return data;
}

const jsonConverter = async () => {
  const happiness = await jsonParser("./datasets/happiness.json");

  let happinessArray = [];

  let sqlOutput = /*SQL*/ `BEGIN;\n\nINSERT INTO datasets (indicator, data) VALUES\n('happiness', '${JSON.stringify(
    happiness
  )}');\n\nCOMMIT;`;
  fs.writeFile("./database/datasets.sql", sqlOutput, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Successfully wrote datasets.sql");
  });
};

jsonConverter();
