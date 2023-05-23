import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // componentDidMount() {
  // const { expenses } = this.props;
  // console.log(expenses);
  // }

  render() {
    const { email, expenses } = this.props;
    const initialValue = 0;
    // const sumTotal =
    console.log(expenses);
    return (
      <div data-testid="email-field">
        { email }
        <p data-testid="total-field">
          {/* {expenses.length > initialValue
            ? expenses.reduce((acc, expense) => acc
    + (Number(expense.value)
    * Number(expense.exchangeRates[expense.currency].ask), 0).toFixed(2))
            : initialValue.toFixed(2)} */}
          {expenses.length > 0
            ? expenses
              .reduce((acc, { value, currency, exchangeRates }) => {
                acc += Number(exchangeRates[currency].ask) * Number(value);
                return acc;
              }, 0)
              .toFixed(2)
            : initialValue.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
