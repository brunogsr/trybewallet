// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { REQUEST_STARTED, REQUEST_SUCESSFUL, REQUEST_FAILED } from '../../tests/helpers/RequestAPI';

import {
  // REQUEST_STARTED,
  REQUEST_SUCESSFUL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  // isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case REQUEST_STARTED:
  //   return { ...state,
  //     isLoading: true,
  //   };
  case REQUEST_SUCESSFUL:
    return { ...state,
      currencies: action.currencies,
      // isLoading: false,
    };
  default:
    return state;
  }
};

export default wallet;
