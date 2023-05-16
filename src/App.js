import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './components/Login';

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
      </Switch>
    );
  }
}

export default App;
