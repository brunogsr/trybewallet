// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { REQUEST_STARTED, REQUEST_SUCESSFUL, REQUEST_FAILED } from '../../tests/helpers/RequestAPI';

import {
  ADD_EXPENSES,
  REQUEST_SUCCESSFUL,
  DELETE_EXPENSE,
  // UPTATE_ID,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.newExpense }],
    };
  case REQUEST_SUCCESSFUL:
    return { ...state,
      currencies: action.currencies,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
