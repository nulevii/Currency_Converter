export const convert = (ammount, currency1, currency2) => {
  const convertedAmmount = (ammount * (currency2 / currency1)).toFixed(2);
  return convertedAmmount.replace(/\.?0+$/, '');
};
