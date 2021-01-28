import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Select } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  input: {
    color: ' #fffded',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: ' #fffded  !important',
  },
  icon: {
    fill: ' #fffded',
  },
};

class RegisterForm extends Component {
  onChange = () => {
    this.setState({
      captchaPassed: true,
    });
  };

  state = {
    captchaPassed: false,
    registeredAs: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    jobTitle: '',
    osha: '',
    certifications: '',
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      registrationStep: 0,
    });
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.captchaPassed) {
      if (this.state.phone.length === 10) {
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
            certs: this.state.certifications,
          },
        });
      } else {
        swal('SORRY!', 'please include your area code', 'error');
      }
    } else {
      setTimeout(() => {
        swal('SORRY!', 'You need to pass the captcha', 'error');
      }, 1000);
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    console.log(event.target.value);
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleNextButton = (buttonName) => (event) => {
    console.log('button clicked');
    this.setState({
      [buttonName]: false,
    });
  };

  handlePhoneChange = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 11) {
      this.setState({ phone: onlyNums });
    } else if (onlyNums.length === 11) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phone: number });
    }
  };

  handleSelectionButtons = (propertyName) => (event) => {
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
        this.setState({
          ...this.state,
          jobTitle: event.target.value,
        });
        break;
      case 'osha':
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
    const { classes } = this.props;
    switch (this.state.registeredAs) {
      case 3:
        return (
          <form
            className="vendorRegistrationForm"
            onSubmit={this.handleNextButton}
          >
            {this.props.store.errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.registrationMessage}
              </h3>
            )}
            <div className="vendorItem1">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="vendorItem2">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="vendorItem3">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
                id="outlined-basic"
                label="Phone (digits only include area code)"
                variant="outlined"
                type="number"
                name="Phone Number"
                value={this.state.phone}
                required
                onChange={this.handlePhoneChange}
              />
            </div>
            <div className="vendorItem4">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="vendorItem5">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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

            <div className="vendorItem6">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="vendorItem7">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="vendorItem8">
              <ReCAPTCHA
                sitekey="6LfTQfsZAAAAAA90RLCOy7FynQ1mJMIf85JYtWpj"
                onChange={this.onChange}
              />
              <Button
                style={{
                  color: 'black',
                  backgroundColor: '#fffded',
                }}
                variant="contained"
                color="primary"
                className="btn"
                type="submit"
                name="submit"
                value="Register"
              >
                Submit
              </Button>
              <div className="vendorItem9"></div>
            </div>
          </form>
        );
      case 2:
        return (
          <form className="subRegistrationForm" onSubmit={this.registerUser}>
            {this.props.store.errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.registrationMessage}
              </h3>
            )}
            <div className="subItem1">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem2">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem3">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
                id="outlined-basic"
                label="Phone (digits only include area code)"
                variant="outlined"
                type="number"
                name="Phone Number"
                value={this.state.phone}
                required
                onChange={this.handlePhoneChange}
              />
            </div>
            <div className="subItem4">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem5">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem6">
              <label style={{ color: '#fffded' }}>{'What do you do? :'}</label>
              <Select
                native
                style={{ border: '1px solid #fffded' }}
                id="outlined-basic"
                variant="outlined"
                fullWidth={true}
                value={this.state.jobTitle}
                onChange={this.handleDropdown('jobTitle')}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                <option aria-label="None" value="" />
                <option value={'Helper'}>Helper</option>
                <option value={'Welder'}>Welder</option>
                <option value={'Fitter'}>Fitter</option>
                <option value={'Welder / Fitter'}>Welder / Fitter</option>
              </Select>
            </div>
            <div className="subItem7">
              <label style={{ color: '#fffded' }}>
                {'Osha Certification :'}
              </label>
              <Select
                native
                style={{ border: '1px solid #fffded' }}
                id="outlined-basic"
                className={classes.outlined}
                variant="outlined"
                fullWidth={true}
                value={this.state.osha}
                onChange={this.handleDropdown('osha')}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                  },
                  name: 'osha',
                  id: 'filled-osha-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={'N/A'}>0</option>
              </Select>
            </div>
            <div className="subItem00">
              <TextField
                className
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem9">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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
            <div className="subItem10">
              <TextField
                InputLabelProps={{
                  style: { color: '#fffded' },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                autoComplete="off"
                fullWidth={true}
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

            <div className="subItem11">
              <ReCAPTCHA
                sitekey="6LfTQfsZAAAAAA90RLCOy7FynQ1mJMIf85JYtWpj"
                onChange={this.onChange}
              />
            </div>
            <div className="subItem12">
              <Button
                style={{
                  backgroundColor: '#fffded',
                }}
                // fullWidth={true}
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
            <div className="selectionButton">
              <br />
              <div>
                <label className="formText">I am registering as a: </label>
              </div>
              <br />
              <Button
                style={{
                  backgroundColor: '#fffded',
                }}
                className="buttonFormButton"
                variant="contained"
                onClick={this.handleSelectionButtons('vendor')}
              >
                Vendor
              </Button>
            </div>
            <div className="selectionButton">
              <Button
                style={{
                  backgroundColor: '#fffded',
                }}
                className="buttonFormButton"
                variant="contained"
                onClick={this.handleSelectionButtons('subcontractor')}
              >
                Subcontractor
              </Button>
            </div>
          </center>
        );
    }
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RegisterForm));
