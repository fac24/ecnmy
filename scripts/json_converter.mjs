import fs from "fs";
import fetch from "node-fetch";
import lifeExpectancy from "../utils/lifeExpectancy.mjs";
import wellbeing from "../utils/wellbeing.mjs";

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
  const [happiness, happinessMetadata] = await wellbeing(
    "./datasets/happiness.json",
    ["happiness"]
  );
  const [anxiety, anxietyMetadata] = await wellbeing(
    "./datasets/anxiety.json",
    ["anxiety"]
  );
  const [femaleLifeExpectancy, femaleLifeExpectancyMetadata] =
    await lifeExpectancy("./datasets/female_life_expectancy.json", [
      "life expectancy",
    ]);
  const [maleLifeExpectancy, maleLifeExpectancyMetadata] = await lifeExpectancy(
    "./datasets/male_life_expectancy.json",
    ["life expectancy"]
  );
  const totalClaim = await jsonParser("./datasets/totalClaim.json");

  const totalClaimData = totalClaim.data;

  const tidyClaimData = totalClaimData.flatMap((item) => {
    const Geography = item.Area;
    const [_, ...entries] = Object.entries(item);
    return entries.map((entry) => {
      return {
        Geography: Geography,
        Time: entry[0].substring(4),
        Value: entry[1],
      };
    });
  });

  totalClaim.data = tidyClaimData;
  let totalClaimMetadata = {
    description:
      "This experimental series counts the number of people claiming Jobseeker''s Allowance plus those who claim Universal Credit and are required to seek work and be available for work and replaces the number of people claiming Jobseeker''s Allowance as the headline indicator of the number of people claiming benefits principally for the reason of being unemployed. (summary from NOMIS, using data gathered by the ONS)",
    downloads: null,
    keywords: ["poverty", "universal credit", "jobseekers allowance"],
    methodologies: {
      href: "https://www.nomisweb.co.uk/query/asv2htm",
      title: "Warnings and notes",
    },
    related_datasets: null,
    title: "Claimant count by age and sex",
    release_date: "2022-07-19",
    source: "Nomis",
    sampleSize: null,
    tooltips: ["JSA", "UC"],
  };
  let sqlOutput = /*SQL*/ `BEGIN;\n\nINSERT INTO datasets (indicator, data, metadata) VALUES\n`;

  sqlOutput += `
    ('happiness', '${JSON.stringify(happiness)}', '${JSON.stringify(
    happinessMetadata
  )}'),\n`;
  sqlOutput += `
    ('anxiety', '${JSON.stringify(anxiety)}', '${JSON.stringify(
    anxietyMetadata
  )}'),\n
  `;
  sqlOutput += `
    ('life expectancy (female)', '${JSON.stringify(
    femaleLifeExpectancy
  )}', '${JSON.stringify(femaleLifeExpectancyMetadata)}'),\n
  `;
  sqlOutput += `
    ('life expectancy (male)', '${JSON.stringify(
    maleLifeExpectancy
  )}', '${JSON.stringify(maleLifeExpectancyMetadata)}'),\n
  `;
  sqlOutput += `('total JSA and UC claimants', '${JSON.stringify(
    totalClaim
  )}', '${JSON.stringify(totalClaimMetadata)}'),\n`;
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
