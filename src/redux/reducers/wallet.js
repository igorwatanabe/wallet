// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  NAME_COIN,
  ADD_EXPENSE,
  DELETE_EDIT_EXPENSE,
  EDIT_EXPENSE,
  ID_TO_EDIT,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NAME_COIN:
    return { ...state, currencies: action.payload };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DELETE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.payload,
    };

  case ID_TO_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
    };

  default:
    return state;
  }
};

export default wallet;
