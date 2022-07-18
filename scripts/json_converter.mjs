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
  const totalClaim = await jsonParser("./datasets/totalClaim.json");

  happiness.data.forEach(item => {
    delete Object.assign(item, { ["Value"]: item["V4_3"] })["V4_3"];
    delete item['Data Marking'];
    delete item['yyyy-yy'];
  })

  const totalClaimData = totalClaim.data;

  const tidyClaimData = totalClaimData.flatMap(item => {
    const Geography = item.Area;
    const [_, ...entries] = Object.entries(item);
    return entries.map((entry) => {
      return {
        Geography: Geography,
        Time: entry[0].substring(4),
        Value: entry[1]
      }
    })
  })

  totalClaim.data = tidyClaimData;

  let sqlOutput = /*SQL*/ `BEGIN;\n\nINSERT INTO datasets (indicator, data) VALUES\n`;

  sqlOutput += `
    ('happiness', '${JSON.stringify(happiness)}'),\n`;
  sqlOutput += `('totalClaim', '${JSON.stringify(totalClaim)}'),\n`;
  sqlOutput = sqlOutput.substring(0, sqlOutput.length - 2) + ";";
  sqlOutput += "\n\nCOMMIT;";

  fs.writeFile("./database/datasets.sql", sqlOutput, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Successfully wrote datasets.sql");
  });
};

jsonConverter();

// let sqlOutput =
// "BEGIN;\n\nINSERT INTO locations (code, name) VALUES\n";

// locationData.forEach((location) => {
// sqlOutput += `('${location.id}', '${location.name}'), \n`;
// })

// sqlOutput = sqlOutput.substring(0, sqlOutput.length - 3) + ";";

// sqlOutput += "\n\nCOMMIT;";
