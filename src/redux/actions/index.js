// Coloque aqui suas actions
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const UPTATE_ID = 'UPTADE_ID';

// export const updateId = (id) => ({
//   type: UPTATE_ID,
//   id,
// });

export const addExpenses = (newExpense) => ({
  type: ADD_EXPENSES,
  newExpense,
});

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export function requestStarted() {
  return { type: REQUEST_STARTED };
}

export function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    currencies,
  };
}

export function requestFailed() {
  return { type: REQUEST_FAILED };
}

export const fetchCurrenciesAPI = () => (
  async (dispatch) => {
    try {
      const moedas = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await moedas.json();
      // if (newExpense) {
      //   // console.log(newExpense);
      //   newExpense.exchangeRates = data; // criando chave exchangeRates + o valor
      //   dispatch(addExpenses(newExpense, id));
      //   return;
      // }
      const datakeyCurrencies = Object.keys(data).splice('USDT');
      const USDTindex = datakeyCurrencies.findIndex((element) => element === 'USDT');
      if (USDTindex) {
        datakeyCurrencies.splice(USDTindex, 1);
      }
      dispatch(requestSuccessful(datakeyCurrencies));
    } catch (error) {
      dispatch(requestFailed());
    }
  }
);

export const fetchExpensesAPI = (newExpense) => (
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    newExpense.exchangeRates = data; // criando chave exchangeRates + o valor
    dispatch(addExpenses(newExpense));
  }
);
