import React from 'react';

import styles from '../style.module.css';
import { filterNumbers } from '../../../utilities/filterNumbers';
import { selectCurrencyRate } from '../../../utilities/selectCurrencyRate';
import { convert } from '../../../utilities/convert';

function CurrencyOne({
  currencyRates,
  setFirstCurrency,
  setSelectedCurrencyRate1,
  setFirstCurrencyAmount,
  setSecondCurrencyAmount,
  operation,
  selectedCurrencyRate2,
  selectedCurrencyRate1,
  firstCurrencyAmount,
}) {
  return (
    <>
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
    </>
  );
}

export default CurrencyOne;
