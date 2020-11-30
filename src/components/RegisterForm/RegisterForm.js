import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Select } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    registeredAs: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: null,
    email: '',
    company: '',
    address: '',
    jobTitle: '',
    osha: '',
    certs: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        registeredAs: this.state.registeredAs,
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        company: this.state.company,
        address: this.state.address,
        jobTitle: this.state.jobTitle,
        osha: this.state.osha,
        certs: this.state.certs,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSelectionButtons = (propertyName) => {
    switch (propertyName) {
      case 'vendor':
        this.setState({
          registeredAs: 3,
        });
        break;
      case 'subcontractor':
        this.setState({
          registeredAs: 2,
        });
        break;
      default:
        this.setState({
          registeredAs: 0,
        });
    }
  };

  handleDropdown = (propertyName) => (event) => {
    switch (propertyName) {
      case 'jobTitle':
        console.log(event.target.value);
        this.setState({
          ...this.state,
          jobTitle: event.target.value,
        });
        break;
      case 'osha':
        console.log(event.target.value);
        this.setState({
          ...this.state,
          osha: event.target.value,
        });
        break;
      default:
        return 0;
    }
  };

  render() {
    switch (this.state.registeredAs) {
      case 3:
        return (
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
                label="Last Name"
                variant="outlined"
                type="text"
                name="Last Name"
                value={this.state.lastName}
                required
                onChange={this.handleInputChangeFor('lastName')}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                type="number"
                name="Phone Number"
                value={this.state.phone}
                required
                onChange={this.handleInputChangeFor('phone')}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                value={this.state.email}
                required
                onChange={this.handleInputChangeFor('email')}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Company"
                variant="outlined"
                type="text"
                name="company"
                value={this.state.company}
                required
                onChange={this.handleInputChangeFor('company')}
              />
            </div>
            <br />
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
        );
      case 2:
        return (
          <form className="form" onSubmit={this.registerUser}>
            <h2>Subcontractor Sign Up</h2>
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
              <span>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  name="Last Name"
                  value={this.state.lastName}
                  required
                  onChange={this.handleInputChangeFor('lastName')}
                />
              </span>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                type="number"
                name="Phone Number"
                value={this.state.phone}
                required
                onChange={this.handleInputChangeFor('phone')}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                value={this.state.email}
                required
                onChange={this.handleInputChangeFor('email')}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="(Address, city, State, zip)"
                variant="outlined"
                type="text"
                name="address"
                value={this.state.address}
                required
                onChange={this.handleInputChangeFor('address')}
              />
            </div>
            <div>
              <label>{'What do you do? :'}</label>
              <Select
                native
                value={this.state.jobTitle}
                onChange={this.handleDropdown('jobTitle')}
                inputProps={{
                  name: 'jobTitle',
                  id: 'filled-jobTitle-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'Helper'}>Helper</option>
                <option value={'Welder'}>Welder</option>
                <option value={'Fitter'}>Fitter</option>
              </Select>
            </div>
            <div>
              <label>{'Osha Certification :'}</label>
              <Select
                native
                value={this.state.osha}
                onChange={this.handleDropdown('osha')}
                inputProps={{
                  name: 'osha',
                  id: 'filled-osha-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </Select>
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Other Certifications"
                multiline
                rows={4}
                variant="outlined"
                type="text"
                name="certifications"
                value={this.state.certifications}
                required
                onChange={this.handleInputChangeFor('certifications')}
              />
            </div>
            <br />
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
        );
      default:
        return (
          <center className="form">
            <div className="loginWrapper">
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
            </div>
          </center>
        );
    }
  }
}

export default connect(mapStoreToProps)(RegisterForm);
