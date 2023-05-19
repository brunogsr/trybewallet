// Coloque aqui suas actions
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCESSFUL = 'REQUEST_SUCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_LOGIN = 'SAVE_LOGIN';

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  email,
});

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export function requestStarted() {
  return { type: REQUEST_STARTED };
}

export function requestSucessful(currencies) {
  return {
    type: REQUEST_SUCESSFUL,
    currencies,
  };
}

export function requestFailed() {
  return { type: REQUEST_FAILED };
}

export const requestAPI = () => (
  async (dispatch) => {
    dispatch(requestStarted());
    try {
      const moedas = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await moedas.json();
      const datakeyCurrencies = Object.keys(data).splice('USDT');
      const USDTindex = datakeyCurrencies.findIndex((element) => element === 'USDT');
      if (USDTindex) {
        datakeyCurrencies.splice(USDTindex, 1);
      }
      dispatch(requestSucessful(datakeyCurrencies));
    } catch (error) {
      dispatch(requestFailed());
    }
  }
);
