import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  validationEmailAndPassword = () => {
    const {
      email,
      password,
    } = this.state;
    const minCharacter = 6;
    const valPassword = password.length >= minCharacter;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const valEmail = emailRegex.test(email);

    this.setState({
      isButtonDisabled: !(valPassword && valEmail),
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationEmailAndPassword);
  };

  onLoginButtonClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(saveLogin(email));
  };

  render() {
    const {
      email,
      password,
      isButtonDisabled,
    } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="email-input">
            e-mail
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email-input"
              onChange={ this.onInputChange }
              value={ email }
            />
          </label>
          <label htmlFor="password-input">
            password
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              onChange={ this.onInputChange }
              value={ password }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.onLoginButtonClick }
            disabled={ isButtonDisabled }
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
  }),
  dispatch: PropTypes.func,
}.isRequired;

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// export default connect(mapStateToProps)(Login);

export default connect()(Login);
