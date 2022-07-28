import fs from "fs";
import fetch from "node-fetch";

async function getUrl(url) {
  return await fetch(url)
    .then((resolve) => resolve.json())
    .then((resolve) => resolve.items);
}

/** scrapeLocations
 * This function finds all the borough, london and uk, names and geographical codes used in datasets
 * This allows us to search datasets by the unique geo-code for each location
 */
const scrapeLocations = async () => {
  //scrape for boroughs
  const boroughUrl = `https://api.beta.ons.gov.uk/v1/code-lists/administrative-geography/editions/one-off/codes?limit=33&offset=317`;
  const boroughResponseArray = await getUrl(boroughUrl);

  const locationData = [];

  for (let i = 0; i < boroughResponseArray.length; i++) {
    let code = boroughResponseArray[i].code;
    let label = boroughResponseArray[i].label;
    locationData.push({
      id: code,
      name: label,
    });
  }

  //scrape for London in general
  const londonUrl = `https://api.beta.ons.gov.uk/v1/code-lists/administrative-geography/editions/one-off/codes?limit=1&offset=13`;
  const londonResponseArray = await getUrl(londonUrl);
  locationData.push({
    id: londonResponseArray[0].code,
    name: londonResponseArray[0].label,
  });

  //scrape for UK in general
  const ukUrl = `https://api.beta.ons.gov.uk/v1/code-lists/administrative-geography/editions/one-off/codes?limit=1`;
  const ukResponseArray = await getUrl(ukUrl);
  locationData.push({
    id: ukResponseArray[0].code,
    name: ukResponseArray[0].label,
  });

  let sqlOutput = "BEGIN;\n\nINSERT INTO locations (code, name) VALUES\n";

  locationData.forEach((location) => {
    sqlOutput += `('${location.id}', '${location.name}'), \n`;
  });

  sqlOutput = sqlOutput.substring(0, sqlOutput.length - 3) + ";";

  sqlOutput += "\n\nCOMMIT;";

  fs.writeFile("./database/locations.sql", sqlOutput, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    console.log("Successfully wrote locations.sql");
  });
};

scrapeLocations();
