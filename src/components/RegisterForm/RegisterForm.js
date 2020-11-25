import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';

// const username = req.body.username;
// const password = encryptLib.encryptPassword(req.body.password);
// const registeredAs = req.body.registeredAs;
// const fName = req.body.firstName;
// const lName = req.body.lastName;
// const phone = req.body.phone;
// const email = req.body.email;
// const address = req.body.address;
// const jobTitle = req.body.jobTitle;
// const oshaLevel = req.body.oshaLevel;
// const certs = req.body.certs;
// const company = req.body.company;

class RegisterForm extends Component {
  state = {
    registrationStep: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      registrationStep: 0,
    });
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSelectionButtons = (propertyName) => (event) => {
    switch (propertyName) {
      case 'vendor':
        this.setState({
          registrationStep: 1,
        });
        break;
      case 'subcontractor':
        this.setState({
          registrationStep: 2,
        });
        break;
      default:
        this.setState({
          registrationStep: 0,
        });
    }
  };

  render() {
    switch (this.state.registrationStep) {
      case 0:
        return (
          <div className="buttonForm">
            <Button
              className="buttonFormButton"
              variant="contained"
              color="primary"
              onClick={this.handleSelectionButtons('vendor')}
            >
              Vendor
            </Button>
            <Button
              className="buttonFormButton"
              variant="contained"
              color="secondary"
              onClick={this.handleSelectionButtons('subcontractor')}
            >
              Subcontractor
            </Button>
          </div>
        );
      case 1:
        return (
          <center>
            <form className="form" onSubmit={this.registerUser}>
              <h2>Vendor Sign Up</h2>
              {this.props.store.errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
                </h3>
              )}
              <div>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  name="First Name"
                  value={this.state.firstName}
                  required
                  onChange={this.handleInputChangeFor('firstName')}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={this.state.username}
                  required
                  onChange={this.handleInputChangeFor('username')}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.state.password}
                  required
                  onChange={this.handleInputChangeFor('password')}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn"
                  type="submit"
                  name="submit"
                  value="Register"
                >
                  Submit
                </Button>
              </div>
            </form>
          </center>
        );
      default:
        return (
          <center>
            <p>LOADING....</p>
          </center>
        );
    }
  }
}

export default connect(mapStoreToProps)(RegisterForm);
