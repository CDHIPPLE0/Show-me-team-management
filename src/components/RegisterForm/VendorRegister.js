import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
class VendorRegister extends Component {
  render() {
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
      </center>
    );
  }
}

export default connect(mapStoreToProps)(VendorRegister);
