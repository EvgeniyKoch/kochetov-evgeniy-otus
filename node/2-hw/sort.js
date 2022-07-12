const merge = (arrFirst, arrSecond) => {
  const arrSort = [];
  let i = (j = 0);
  while (i < arrFirst.length && j < arrSecond.length) {
    arrSort.push(arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++]);
  }

  return [...arrSort, ...arrFirst.slice(i), ...arrSecond.slice(j)];
};

const mergeSort = (arr) => {
  if (!arr || !arr.length) {
    return null;
  }

  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, middle);
  const arrRight = arr.slice(middle);

  return merge(mergeSort(arrLeft), mergeSort(arrRight));
};

module.exports = { mergeSort };
