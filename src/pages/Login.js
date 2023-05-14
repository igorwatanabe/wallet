import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState({
      [name]: value,
    }, this.validation);
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    dispatch(addEmail({ ...this.state }));
    history.push('/carteira');
  };

  validation = () => {
    const { email, password } = this.state;

    const num6 = 6;
    const valPassword = password.length >= num6;

    const valCaracters = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const valEmail = valCaracters.test(email);

    this.setState({
      disabled: !(valEmail && valPassword),
    });
  };

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Digite seu email"
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Senha"
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
