import {
  ADD_EMAIL,
  NAME_COIN,
  ADD_EXPENSE,
  DELETE_EDIT_EXPENSE,
  EDIT_EXPENSE,
  ID_TO_EDIT,
} from './actionsTypes';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email.email,
});

export const getNameCoin = (data) => ({
  type: NAME_COIN,
  payload: data,
});

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const nameCurrencies = Object.keys(data).filter((usdt) => usdt !== 'USDT');
    dispatch(getNameCoin(nameCurrencies));
  };
}

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export function fetchApiExpenses(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(addExpense({ ...expense, exchangeRates: { ...data } }));
  };
}

export const deleteExpense = (expense) => ({
  type: DELETE_EDIT_EXPENSE,
  payload: expense,
});

export const editExpense = (bool) => ({
  type: EDIT_EXPENSE,
  payload: bool,
});

export const idToEdit = (id) => ({
  type: ID_TO_EDIT,
  payload: id,
});

export const editExpenses = (expenses) => ({
  type: DELETE_EDIT_EXPENSE,
  payload: expenses,
});
