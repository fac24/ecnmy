import fs from "fs";
import fetch from "node-fetch";

const jsonConverter = async () => {

    async function jsonParser(file) {
        const data = JSON.parse(await fs.readFile(file));
        return data;
    };

    const happiness = jsonParser('../datasets/happiness.json')

    let happinessArray = [];


}