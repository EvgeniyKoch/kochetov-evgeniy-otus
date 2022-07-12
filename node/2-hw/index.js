const fs = require("fs");
const stream = require('stream');
const util = require('util');

const { mergeSort } = require("./sort.js");
const pipeline = util.promisify(stream.pipeline)

const MAX_INFLIGH_CHUNKS = 10000000;

const readableStream = fs.createReadStream("./randomNumbers.txt", {
  encoding: "utf8",
  highWaterMark: MAX_INFLIGH_CHUNKS,
});

async function splitByLessFiles(readable) {
  let nameAsCount = 0;
  const filesList = [];

  for await (const chunk of readable) {
    nameAsCount += 1;
    const filename = `${nameAsCount}.txt`;
    filesList.push(filename);
    const sortedNumbers = mergeSort(chunk.split(" ")).join("\n");
    const writableStream = fs.createWriteStream(filename);
    writableStream.write(sortedNumbers);
  }

  return filesList;
}

async function run() {
  const files = await splitByLessFiles(readableStream);
  let result = "";

  for (const url of files) {
    await pipeline(
      fs.createReadStream(url, {
        encoding: "utf8",
        highWaterMark: MAX_INFLIGH_CHUNKS,
      }),
      async function* (source) {
        for await (const chunk of source) {
          const minNumber = chunk.split("\n")[0];
          yield (result += minNumber + "\n");
        }
      },
      fs.createWriteStream("result.txt")
    );
  }
  console.log("Pipeline succeeded.");
}

run();
