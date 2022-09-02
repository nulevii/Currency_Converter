import React, { useState } from 'react';

export const useCurrenciesState = (initialCurrency, initialAmount) => {
  const [firstCurrency, setFirstCurrency] = useState(initialCurrency);
  const [secondCurrency, setSecondCurrency] = useState(initialCurrency);
  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState(initialAmount);
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState(initialAmount);
  return {
    firstCurrency,
    setFirstCurrency,
    secondCurrency,
    setSecondCurrency,
    firstCurrencyAmount,
    setFirstCurrencyAmount,
    secondCurrencyAmount,
    setSecondCurrencyAmount,
  };
};
