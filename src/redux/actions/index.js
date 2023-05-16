import { ADD_EMAIL, NAME_COIN, ADD_EXPENSES } from './actionsTypes';

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

export const getExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export function fetchApiExpenses(expenses) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getExpenses({ ...expenses, exchangeRates: { ...data } }));
  };
}
