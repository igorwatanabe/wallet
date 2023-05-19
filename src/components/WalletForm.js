import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, editExpenses, fetchApi, fetchApiExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  // componentDidUpdate() {
  //   const { wallet: {editor} } = this.props;
  //   editor ? this.changeStateEditorOn() : '';

  // }

  // changeStateEditorOn = () => {
  //   const { wallet: { idToEdit, expenses } } = this.props;
  //   const expenseEdit = expenses.filter((expense) => expense.id === idToEdit);

  //   this.setState({
  //     id: idToEdit,
  //     value: expenseEdit.value,
  //     description: expenseEdit.description,
  //     currency: expenseEdit.currency,
  //     method: expenseEdit.method,
  //     tag: expenseEdit.tag,
  //   });
  // }

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { id, value, description, method, tag, currency } = this.state;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(fetchApiExpenses(expenses));
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  saveEdit = () => {
    const { dispatch, wallet: { idToEdit, editor, expenses } } = this.props;
    const { value, description, method, tag, currency } = this.state;

    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    const expenseEdit = expenses.filter((element) => element.id === idToEdit);

    expenseEdit[0].value = expense.value;
    expenseEdit[0].description = expense.description;
    expenseEdit[0].currency = expense.currency;
    expenseEdit[0].method = expense.method;
    expenseEdit[0].tag = expense.tag;

    expenses.splice(Number(idToEdit), 1, expenseEdit[0]);
    dispatch(editExpenses(expenses));
    dispatch(editExpense(!editor));

    this.setState((state) => ({
      id: state.id,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const {
      id,
      value,
      description,
      method,
      tag,
    } = this.state;

    const { wallet } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label>
            ID:
            {id}
          </label>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              id="value"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              id="description"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              required
              onChange={ this.handleChange }
            >
              {
                wallet.currencies.map((option, index) => (
                  <option key={ index } value={ option }>{option}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              required
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              required
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          {!wallet.editor
            ? (
              <button
                type="button"
                onClick={ this.handleSubmit }
              >
                Adicionar despesa
              </button>)
            : (
              <button
                type="button"
                onClick={ () => this.saveEdit() }
              >
                Editar despesa
              </button>)}
        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    editor: PropTypes.bool,
    expenses: PropTypes.arrayOf(PropTypes.objectOf),
    idToEdit: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
});

export default connect(mapStateToProps)(WalletForm);
