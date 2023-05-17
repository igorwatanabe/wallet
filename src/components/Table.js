import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  // state = {
  //   expenses: [],
  // };

  // addExpense = () => {
  //   const { id, value, description, currency, method, tag } = this.props;

  //   const newExpense = { id, value, description, currency, method, tag };

  //   this.setState({
  //     expenses: [...expenses, newExpense],
  //   });
  // };

  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((element) => (Number(element.id) !== Number(id)));
    console.log(newExpenses);
    dispatch(deleteExpense(newExpenses));
  };

  render() {
    console.log(this.props);
    // const { id, value, description, currency, method, tag } = this.props;

    const { expenses } = this.props;

    return (
      <main>
        <table border="1" width="500">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Valor</th>
              <th>Descrição</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Tag</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({
              value,
              description,
              exchangeRates,
              currency,
              method,
              tag,
              id,
            }) => (
              <tr key={ id }>
                {/* <td width="auto">{id}</td> */}
                <td width="auto">{parseFloat(value).toFixed(2)}</td>
                <td width="auto">{description}</td>
                <td width="auto">{exchangeRates[currency].name}</td>
                <td width="auto">{method}</td>
                <td width="auto">{tag}</td>
                <td width="auto">
                  {parseFloat(exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td width="auto">
                  {(exchangeRates[currency].ask * value).toFixed(2)}
                </td>
                <td width="auto">Real</td>
                <td width="auto">
                  <button data-testid="edit-btn">Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ id }
                    onClick={ () => this.deleteExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  // console.log(globalState.user.email);
  expenses: globalState.wallet.expenses,

  // id: globalState.wallet.expenses.id,
  // value: globalState.wallet.expenses.value,
  // description: globalState.wallet.expenses.description,
  // currency: globalState.wallet.expenses.currency,
  // method: globalState.wallet.expenses.method,
  // tag: globalState.wallet.expenses.tag,
  // ask: globalState.wallet.exchangeRates,
});

export default connect(mapStateToProps)(Table);
