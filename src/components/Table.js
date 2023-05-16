import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

            {expenses.map((element, index) => (
              <tr key={ index }>
                {/* <td width="auto">{element.id}</td> */}
                <td width="auto">{element.value}</td>
                <td width="auto">{element.description}</td>
                <td width="auto">{element.currency}</td>
                <td width="auto">{element.method}</td>
                <td width="auto">{element.tag}</td>
                <td width="auto">{element.exchangeRates[element.currency].ask}</td>
                <td width="auto">
                  {element.exchangeRates[element.currency].ask * element.value}
                </td>
                <td width="auto">{element.exchangeRates[element.currency].codein}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
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
