import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    // console.log(this.props);
    const { email } = this.props;

    return (
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  // console.log(globalState.user.email);
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Wallet);
