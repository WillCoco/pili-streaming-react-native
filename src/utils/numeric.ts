
/**
 * 1000 => 1k
 * 10000 => 1w
 * @param number 
 */
export const shortNum = (number: number) => {
  if (!number) {
    return number;
  };

  const configs = [
    [10000000, 'kw'],
    [10000, 'w'],
    [1000, 'k'],
  ]

  let newNumber;
  for (let i = 0; i < configs.length; i ++) {
    let [value, unit]: Array<any> = configs[i];
    if (number >= value) {
      newNumber = `${parseFloat((number / value).toFixed(1))}${unit}`;
      console.log(value, '-')
      console.log(unit, '-')
      console.log(newNumber, '-')
      break;
    }
  }
  return newNumber || number;
}