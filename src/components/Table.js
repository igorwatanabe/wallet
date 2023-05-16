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
              <th>ID</th>
              <th>value</th>
              <th>description</th>
              <th>currency</th>
              <th>method</th>
              <th>tag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(expenses).map((element, index) => (
                <td width="auto" key={ index }>{element}</td>
              ))}
            </tr>
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
