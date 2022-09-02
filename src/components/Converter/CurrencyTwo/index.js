import React from 'react';

import styles from '../style.module.css';
import { filterNumbers } from '../../../utilities/filterNumbers';
import { selectCurrencyRate } from '../../../utilities/selectCurrencyRate';
import { convert } from '../../../utilities/convert';

function CurrencyTwo({
  currencyRates,
  setSecondCurrency,
  setSelectedCurrencyRate2,
  setFirstCurrencyAmount,
  setSecondCurrencyAmount,
  operation,
  selectedCurrencyRate2,
  selectedCurrencyRate1,
  firstCurrencyAmount,
  secondCurrencyAmount,
}) {
  return (
    <>
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
          return <option key={ccy} value={ccy}>{ccy}</option>;
        })}
        <option key="UAH" value="UAH">UAH</option>
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
    </>
  );
}

export default CurrencyTwo;
