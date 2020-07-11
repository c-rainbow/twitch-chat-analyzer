import { AndFilter } from "../filter"
import * as path from "path";
import * as fs from "fs"; 

//const AndFilter = require("../filter.ts");
const baseDir = "src/__tests__/data";
const smallJsonPath = path.resolve(baseDir, "small.json");

describe("First Test", () => {
    test("Sample test", () =>{
        const a = new AndFilter();
        const data = fs.readFileSync(smallJsonPath, "utf8");
        const jsonData = JSON.parse(data);
        console.log("jsonData:");
        console.log(jsonData);
    });




});