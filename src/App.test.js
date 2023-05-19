import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import App from './App';
import mockData from './tests/helpers/mockData';

describe('Testes de itens renderizados na rota /', () => {
  test('Verifica inputs e botão', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
    screen.getByRole('button', { name: /entrar/i });
  });

  test('Verifica se botão está habilitado ou desabilitado', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEntrar).toBeDisabled();

    const email = screen.getByTestId('email-input');
    fireEvent.change(email, { target: { value: 'test@test.com' } });
    expect(buttonEntrar).toBeDisabled();

    const password = screen.getByTestId('password-input');
    fireEvent.change(password, { target: { value: '123456' } });
    expect(password.value).toBe('123456');
    expect(buttonEntrar).not.toBeDisabled();

    userEvent.click(buttonEntrar);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    expect(store.getState().user.email).toBe('test@test.com');
  });
});

describe('Testes de itens renderizados na rota /carteira', () => {
  test('Verifica se itens do Header sao renderizados', () => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'trybe@test.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    screen.getByTestId('email-field');
    screen.getByTestId('total-field');
    screen.getByTestId('header-currency-field');
  });

  test('Verifica se itens do WalletForm sao renderizados', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    screen.getByTestId('value-input');
    screen.getByTestId('description-input');
    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');
    screen.getByRole('button', { name: /adicionar despesa/i });
  });

  test('Verifica se itens da Table sao renderizados', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const numberColumnHeaders = 9;
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(numberColumnHeaders);
  });
});

describe('Testes das funções do Table', () => {
  test('Verifica se a API do iput Moeda esta sendo chamada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    await screen.findByText('CAD');
    await screen.findByText('DOGE');
    const USDT = screen.queryByText('USDT');
    expect(USDT).toBeNull();
  });
});

describe('Testes das funções', () => {
  test('Verifica a função adicionar/editar/deletar e a soma das despesas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const valor = await screen.findByRole('spinbutton', { name: /valor:/i });
    const descricao = await screen.findByRole('textbox', { name: /descrição:/i });
    const moeda = await screen.findByRole('combobox', { name: /moeda:/i });
    const metodo = await screen.findByRole('combobox', { name: /método de pagamento:/i });
    const categoria = await screen.findByTestId('tag-input');
    const botaoAdd = await screen.findByRole('button', { name: /adicionar despesa/i });

    await act(async () => {
      // expense 1 adicionada, conferindo se os values sao alterados
      fireEvent.change(valor, { target: { value: 200.00 } });
      expect(valor.value).toBe('200');

      fireEvent.change(descricao, { target: { value: 'KFC' } });
      expect(descricao.value).toBe('KFC');

      fireEvent.change(moeda, { target: { value: 'ETH' } });
      expect(moeda[12].selected).toBeTruthy();

      fireEvent.change(metodo, { target: { value: 'Cartão de crédito' } });
      expect(metodo[1].selected).toBeTruthy();

      fireEvent.change(categoria, { target: { value: 'Lazer' } });
      expect(categoria[1].selected).toBeTruthy();

      userEvent.click(botaoAdd);

      // expense 2 adicionada, conferindo se os values sao alterados
      fireEvent.change(valor, { target: { value: 400.00 } });
      expect(valor.value).toBe('400');

      fireEvent.change(descricao, { target: { value: 'corrida' } });
      expect(descricao.value).toBe('corrida');

      fireEvent.change(moeda, { target: { value: 'USD' } });
      expect(moeda[0].selected).toBeTruthy();

      fireEvent.change(metodo, { target: { value: 'Dinheiro' } });
      expect(metodo[0].selected).toBeTruthy();

      fireEvent.change(categoria, { target: { value: 'Lazer' } });
      expect(categoria[1].selected).toBeTruthy();

      userEvent.click(botaoAdd);
    });

    // verificando se a tabela foi criada com os dados corretos
    await screen.findByRole('cell', { name: /200\.00/i });
    await screen.findByRole('cell', { name: /kfc/i });
    await screen.findByRole('cell', { name: /ethereum\/real brasileiro/i });
    await screen.findByRole('cell', { name: /cartão de crédito/i });
    const categoriasNaTela = await screen.findAllByRole('cell', { name: /lazer/i });
    await screen.findByRole('cell', { name: /9\.26/i });
    await screen.findByRole('cell', { name: /1852\.42/i });
    const botaoDelete = await screen.findAllByTestId('delete-btn');
    const botaoEditar = await screen.findAllByTestId('edit-btn');

    // verificando id mostrado na tela e a quantidade inserida na tabela
    await screen.findByText(/id:2/i);
    expect(categoriasNaTela).toHaveLength(2);

    // verificando soma dos valores
    const totalNaTela = await screen.findByTestId('total-field');
    const total = 3753.66;
    expect(Number(totalNaTela.textContent)).toBe(total);

    // verificando botao de editar despesa
    await act(async () => {
      userEvent.click(botaoEditar[1]);
    });

    const btnFinalizarEdDespesa = await screen.findByRole('button', { name: /editar despesa/i });

    await act(async () => {
      fireEvent.change(valor, { target: { value: 1000.00 } });
      fireEvent.change(descricao, { target: { value: 'bolsa' } });
      fireEvent.change(moeda, { target: { value: 'USD' } });
      fireEvent.change(metodo, { target: { value: 'Dinheiro' } });
      fireEvent.change(categoria, { target: { value: 'Trabalho' } });
      userEvent.click(btnFinalizarEdDespesa);
    });

    await screen.findByRole('cell', { name: /1000\.00/i });
    await screen.findByRole('cell', { name: /bolsa/i });

    // verificando botao de delete da despesa
    await act(async () => {
      userEvent.click(botaoDelete[0]);
    });
    // await waitFor(() => {
    //   console.log(store.getState().wallet.expenses);
    //   screen.debug();
    // });
    const btnDelete = await screen.findAllByRole('button', { name: /excluir/i });
    expect(btnDelete).toHaveLength(1);
  });
});
