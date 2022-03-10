import path from 'path';
import fs from 'fs';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const getExpectedResult = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');