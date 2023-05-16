import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, fetchApiExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

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

  render() {
    const {
      id,
      value,
      description,
      method,
      tag,
    } = this.state;
    console.log(this.props);
    const { wallet } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label>
            ID:
            { id }
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
              // id={ name }
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
          <button
            type="button"
            // disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
});

export default connect(mapStateToProps)(WalletForm);
