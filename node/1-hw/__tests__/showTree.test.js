import { getExpectedResult } from '../services/index';
import showTree from '../src';

test('should', () => {
    expect(showTree('src', 2)).toBe(getExpectedResult('showTreeExpectedData.txt'));
});
