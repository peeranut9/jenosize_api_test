export default (numbers) => {
  //Optional
  const minimum = 1;
  const maximum = 9;

  //TODO:use yup to validate later
  if (!Array.isArray(numbers)) {
    return { error: "Input is no array." };
  }

  //Optional
  if (numbers.length != 4) {
    return { error: "Input Must be exactly 4 digits." };
  }

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    //Optional
    const number = parseInt(n);
    if (Number.isNaN(number)) {
      return { error: "Input value must be integer." };
    }
    if (number < minimum) {
      return { error: `Input should be at least ${minimum}.` };
    }
    if (number > maximum) {
      return { error: `Input should not exceed ${maximum}.` };
    }
  }

  //Can add more operation.
  const ops = ["+", "-", "*", "/"];
  const opCase = (num1, num2, op) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  };

  const findResultInOneDirection = (arr) => {
    let allResult = [arr[0]];
    for (let i = 0; i < arr.length; i++) {
      if (arr.length === i + 1) {
        break;
      }
      let allResultInJLoop = [];
      for (let j = 0; j < allResult.length; j++) {
        const n = allResult[j];
        const allResultInKLoop = [];
        for (let k = 0; k < ops.length; k++) {
          const op = ops[k];
          const nOparrShipByCurrent = opCase(n, arr[i + 1], op);
          //if allow 0
          if (Number.isFinite(nOparrShipByCurrent)) {
            allResultInKLoop.push(nOparrShipByCurrent);
          }
        }
        allResultInJLoop = allResultInJLoop.concat(allResultInKLoop);
      }
      allResult = allResultInJLoop.filter((f, index) => {
        return allResultInJLoop.indexOf(f) === index;
      });
    }
    return allResult.find((f) => f === 24) ? true : false;
  };

  const allShuffle = (arr) => {
    const result = [];
    if (arr.length === 0) {
      return result;
    }
    if (arr.length === 1) {
      return [arr];
    }
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const arrWithoutCurrent = arr.slice(0, i).concat(arr.slice(i + 1));
      const reCallWithoutCurrent = allShuffle(arrWithoutCurrent);
      for (let j = 0; j < reCallWithoutCurrent.length; j++) {
        result.push([current].concat(reCallWithoutCurrent[j]));
      }
    }
    return result;
  };
  const allShuffleResult = allShuffle(numbers);
  for (let i = 0; i < allShuffleResult.length; i++) {
    const e = allShuffleResult[i];
    if (findResultInOneDirection(e)) {
      return { result: "YES" };
    }
  }
  return { result: "NO" };
};
