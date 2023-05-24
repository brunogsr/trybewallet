import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCurrenciesAPI, fetchExpensesAPI,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAPI());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpensesButton = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const newExpense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(fetchExpensesAPI(newExpense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }); // const values = Number(newExpense.value);
    // const exchangeData = expenses.exchangeRates[currency].ask;
    // const teste = exchangeData.ask;
    // console.log(values * exchangeData);
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.addExpensesButton }>
        <label>
          Valor
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.onInputChange }
          />
        </label>
        <label>
          Descrição
          <textarea
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            {currencies.map((currencyMapped, index) => (
              <option key={ index } value={ currencyMapped }>
                {currencyMapped}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   saveCurrencies: () => dispatch(saveCurrencies()),
// });

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
