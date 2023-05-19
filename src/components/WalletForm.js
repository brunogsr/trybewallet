import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label>
          Valor
          <input
            data-testid="value-input"
          />
        </label>
        <label>
          Descrição
          <textarea
            data-testid="description-input"
          />
        </label>
        <label>
          <select data-testid="currency-input">
            {currencies.map((currency, index) => (
              <option key={ index } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label>
          <select
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   saveCurrencies: () => dispatch(saveCurrencies()),
// });

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
