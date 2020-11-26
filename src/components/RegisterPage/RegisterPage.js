import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />

        <center>
          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
