export const numberToComma = (value) => {
  const result = Number(value.toFixed(0)).toLocaleString().split(/\s/).join(',') + '.' + Number(value.toString().slice(value.toString().indexOf('.')+1)).toLocaleString();
  return result;
};
