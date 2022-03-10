import { getExpectedResult } from '../services';

import { showTree } from "../firstTask";

const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }],
    },
    {
      name: 5,
      items: [{ name: 6, items: [{ name: 234 }] }],
    },
  ],
};

test("show tree", () => {
  const expectedResult = getExpectedResult('expectedFirstTask.txt');
  const result = showTree(data);
  expect(result).toBe(expectedResult);
});
