const fs = require("fs");
const { mergeSort } = require("./sort.js");

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

const run = async () => {
  const files = await splitByLessFiles(readableStream);

  for (const url of files) {
    const readableStream = fs.createReadStream(url,  {
      encoding: "utf8",
      highWaterMark: MAX_INFLIGH_CHUNKS,
    })

    for await (const chunk of readableStream) {
      const minNumber = chunk.split('\n')[0];
      const writableStream = fs.createWriteStream('result.txt');
      writableStream(minNumber);
    }
  }
};

run();
