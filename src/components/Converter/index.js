import React, { useState, useEffect, useContext } from 'react';
import { SiConvertio } from 'react-icons/si';

import styles from './style.module.css';
import { filterNumbers } from '../../utilities/filterNumbers';
import { selectCurrencyRate } from '../../utilities/selectCurrencyRate';
import { convert } from '../../utilities/convert';
import CurrencyOne from './CurrencyOne';

function Converter({ currencyRates }) {
  const [operation, setOperation] = useState('buy');
  const [firstCurrency, setFirstCurrency] = useState('USD');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState('');
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState('');

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
          <select
            className={styles.currency}
            onChange={(e) => {
              setFirstCurrency(e.target.value);
              setSelectedCurrencyRate1(
                selectCurrencyRate(e.target.value, operation, currencyRates),
              );
              setSecondCurrencyAmount(
                convert(
                  firstCurrencyAmount,
                  selectedCurrencyRate2,
                  selectCurrencyRate(e.target.value, operation, currencyRates),
                ),
              );
            }}
          >
            {currencyRates.map(({ ccy }) => {
              if (ccy === 'BTC') {
                return;
              }
              return <option value={ccy}>{ccy}</option>;
            })}
            <option value="UAH">UAH</option>
          </select>
          <div className={styles['input-wrapper']}>
            <p className={styles['converter-info']}>You will pay</p>
            <input
              className={styles['currency-input']}
              inputMode="numeric"
              onKeyPress={(event) => filterNumbers(event)}
              onChange={(e) => {
                setFirstCurrencyAmount(e.target.value);
                setSecondCurrencyAmount(
                  convert(
                    e.target.value,
                    selectedCurrencyRate2,
                    selectedCurrencyRate1,
                  ),
                );
              }}
              value={firstCurrencyAmount}
            />
          </div>
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
          <select
            className={styles.currency}
            onChange={(e) => {
              setSecondCurrency(e.target.value);
              setSelectedCurrencyRate2(
                selectCurrencyRate(e.target.value, operation, currencyRates),
              );
              setSecondCurrencyAmount(
                convert(
                  firstCurrencyAmount,
                  selectCurrencyRate(e.target.value, operation, currencyRates),
                  selectedCurrencyRate1,
                ),
              );
            }}
          >
            {currencyRates.map(({ ccy }) => {
              if (ccy === 'BTC') {
                return;
              }
              return <option value={ccy}>{ccy}</option>;
            })}
            <option value="UAH">UAH</option>
          </select>
          <div className={styles['input-wrapper']}>
            <p className={styles['converter-info']}>You will receive</p>
            <input
              className={styles['currency-input']}
              inputMode="numeric"
              onKeyPress={(event) => filterNumbers(event)}
              onChange={(e) => {
                setSecondCurrencyAmount(e.target.value);
                setFirstCurrencyAmount(
                  convert(
                    e.target.value,
                    selectedCurrencyRate1,
                    selectedCurrencyRate2,
                  ),
                );
              }}
              value={secondCurrencyAmount}
            />
          </div>
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
