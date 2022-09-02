import React from 'react';
import {
  RiBitCoinLine,
  RiMoneyDollarCircleLine,
  RiMoneyEuroCircleLine,
} from 'react-icons/ri';
import uniqid from 'uniqid';
import styles from './style.module.css';

function Header({ currencyRates }) {
  const editAmount = (amount) => Number(amount).toFixed(2);
  const currencyLogo = {
    USD: RiMoneyDollarCircleLine,
    EUR: RiMoneyEuroCircleLine,
    BTC: RiBitCoinLine,
  };
  return (
    <header className={styles.header}>
      <section className={styles['header-wrapper']}>
        <h1 className={styles['logo-sign']}>Currency rate</h1>
        <article className={styles['main-currencies']}>
          {currencyRates.map(({
            ccy, base_ccy, buy, sale,
          }) => {
            const CurrencyIcon = currencyLogo[ccy];
            return (
              <div key={uniqid()} className={styles.currency}>
                <CurrencyIcon className={styles['currency-logo']} />
                <h3 className={styles['currency-name']}>
                  {ccy}
                  :
                </h3>
                <p className={styles['currency-value']}>
                  {`${editAmount(buy)}/${editAmount(sale)} ${base_ccy}`}
                </p>
              </div>
            );
          })}
        </article>
      </section>
    </header>
  );
}

export default Header;
