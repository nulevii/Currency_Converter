import Header from './components/Header';
import Converter from './components/Converter';
import Loading from './components/Loading';
import 'normalize.css';

import { useFetch } from './utilities/useFetch';
import './index.css';

const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

function App() {
  const { loading, currencyRates } = useFetch(url);
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Header currencyRates={currencyRates} />
      <Converter currencyRates={currencyRates} />
    </>
  );
}

export default App;
