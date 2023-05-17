// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { NAME_COIN, ADD_EXPENSES, DELETE_EXPENSE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//   editor: false, // valor booleano que indica de uma despesa está sendo editada
//   idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NAME_COIN:
    return { ...state, currencies: action.payload };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };

  default:
    return state;
  }
};

export default wallet;
