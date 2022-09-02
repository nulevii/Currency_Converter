import React, { useState, useEffect } from 'react';
import { SiConvertio } from 'react-icons/si';

import styles from './style.module.css';

import { useCurrenciesState } from '../../utilities/useCurrenciesState';
import { selectCurrencyRate } from '../../utilities/selectCurrencyRate';
import { convert } from '../../utilities/convert';

import CurrencyOne from './CurrencyOne';
import CurrencyTwo from './CurrencyTwo';

function Converter({ currencyRates }) {
  const [operation, setOperation] = useState('buy');

  const {
    firstCurrency, setFirstCurrency,
    secondCurrency, setSecondCurrency,
    firstCurrencyAmount, setFirstCurrencyAmount,
    secondCurrencyAmount, setSecondCurrencyAmount,
  } = useCurrenciesState('USD', 1);

  const [selectedCurrencyRate1, setSelectedCurrencyRate1] = useState(1);
  const [selectedCurrencyRate2, setSelectedCurrencyRate2] = useState(1);

  useEffect(() => {
    const wewSelectedCurrencyRate1 = selectCurrencyRate(
      firstCurrency,
      operation,
      currencyRates,
    );
    const newSelectedCurrencyRate2 = selectCurrencyRate(
      secondCurrency,
      operation,
      currencyRates,
    );

    setSelectedCurrencyRate1(wewSelectedCurrencyRate1);
    setSelectedCurrencyRate2(newSelectedCurrencyRate2);
  }, [firstCurrency, secondCurrency]);

  return (
    <main className={styles.main}>
      <section className={styles['converter-box']}>
        <h2 className={styles['currency-converter-sign']}>
          Currency Converter
        </h2>
        <article className={styles.converter}>
          <CurrencyOne
            currencyRates={currencyRates}
            setFirstCurrency={setFirstCurrency}
            setSelectedCurrencyRate1={setSelectedCurrencyRate1}
            setFirstCurrencyAmount={setFirstCurrencyAmount}
            setSecondCurrencyAmount={setSecondCurrencyAmount}
            operation={operation}
            selectedCurrencyRate2={selectedCurrencyRate2}
            selectedCurrencyRate1={selectedCurrencyRate1}
            firstCurrencyAmount={firstCurrencyAmount}
          />
          <SiConvertio className={styles['convert-logo']} />
          <CurrencyTwo
            currencyRates={currencyRates}
            setSecondCurrency={setSecondCurrency}
            setSelectedCurrencyRate2={setSelectedCurrencyRate2}
            setFirstCurrencyAmount={setFirstCurrencyAmount}
            setSecondCurrencyAmount={setSecondCurrencyAmount}
            operation={operation}
            selectedCurrencyRate2={selectedCurrencyRate2}
            selectedCurrencyRate1={selectedCurrencyRate1}
            firstCurrencyAmount={firstCurrencyAmount}
            secondCurrencyAmount={secondCurrencyAmount}
          />
          <select
            className={styles['operation-selector']}
            onChange={(e) => {
              setOperation(e.target.value);

              setSelectedCurrencyRate1(
                selectCurrencyRate(firstCurrency, e.target.value, currencyRates),
              );
              setSelectedCurrencyRate2(
                selectCurrencyRate(
                  secondCurrency,
                  e.target.value,
                  currencyRates,
                ),
              );
              setSecondCurrencyAmount(
                convert(
                  firstCurrencyAmount,
                  selectCurrencyRate(
                    secondCurrency,
                    e.target.value,
                    currencyRates,
                  ),
                  selectCurrencyRate(
                    firstCurrency,
                    e.target.value,
                    currencyRates,
                  ),
                ),
              );
            }}
          >
            <option value="buy">Buy</option>
            <option value="sale">Sell</option>
          </select>
        </article>
      </section>
    </main>
  );
}

export default Converter;
