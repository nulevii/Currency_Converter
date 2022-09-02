export const selectCurrencyRate = (currency, operation, currencyRates) => {
  const selectedCurrency = currencyRates.reduce((acc, { buy, sale, ccy }) => {
    if (operation === 'buy') {
      if (ccy === currency) {
        acc = sale;
      }
    }
    if (operation === 'sale') {
      if (ccy === currency) {
        acc = buy;
      }
    }
    return acc;
  }, 1);
  return selectedCurrency;
};
