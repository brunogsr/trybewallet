import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <WalletForm />
      </div>
    );
  }
}

export default connect()(Wallet);
