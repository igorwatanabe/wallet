import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  soma = () => {
    const { expenses } = this.props;
    return expenses
      .map(({ value, exchangeRates, currency }) => (
        Number(value) * Number(exchangeRates[currency].ask)))
      .reduce((a, b) => a + b, 0).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{email}</h2>
        <h2 data-testid="total-field">
          {this.soma()}
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
