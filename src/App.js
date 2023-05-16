import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      // BrowserRouter <- tudo que tiver dentro pode ser acessado por uma rota
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/carteira"
          render={ (props) => <Wallet { ...props } /> }
        />
      </Switch>
    );
  }
}

export default App;
