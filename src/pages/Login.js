import React from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../components/LoginComponent';

class Login extends React.Component {
  render() {
    return <div><LoginComponent /></div>;
  }
}

export default connect()(Login);
