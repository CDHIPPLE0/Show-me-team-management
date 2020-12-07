import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const styles = {
  input: {
    color: ' #fffded',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: ' #fffded  !important',
  },
  select: {
    '&:before': {
      borderColor: ' #fffded',
    },
    '&:after': {
      borderColor: ' #fffded',
    },
  },
  icon: {
    fill: '#fffded',
  },
};

class EditProfile extends Component {
  state = {
    phone: '',
    email: '',
    company: '',
    address: '',
    jobTitle: '',
    osha: null,
    certs: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_USER_DETAILS',
      id: this.props.store.user.id,
    });
  }

  registerUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'EDIT',
      id: this.props.store.user.id,
      payload: {
        phone: this.state.phone,
        email: this.state.email,
        company: this.state.company,
        address: this.state.address,
        jobTitle: this.state.jobTitle,
        osha: this.state.osha,
        certs: this.state.certifications,
      },
    });
    swal(
      'Changes Submitted!',
      'Thank you for using the team management system',
      'success'
    );
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
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
    const { classes } = this.props;
    if (this.props.store.userDetails.length > 0) {
      console.log('------', this.props.store.userDetails[0]);
      switch (this.props.store.user.access_level_id) {
        case 3:
          return (
            <div className="editWrapper">
              <form className="VendorEditForm" onSubmit={this.registerUser}>
                <div className="vendorItem0">
                  <h2>Edit User Information</h2>
                </div>
                {this.props.store.errors.registrationMessage && (
                  <h3 className="alert" role="alert">
                    {this.props.store.errors.registrationMessage}
                  </h3>
                )}
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
                    fullWidth="true"
                    id="outlined-basic"
                    label="Phone (xxx-xxx-xxxx)"
                    variant="outlined"
                    type="number"
                    name="Phone Number"
                    value={this.props.store.userDetails[0].phone}
                    required
                    onChange={this.handleInputChangeFor('phone')}
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
                    fullWidth="true"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={this.props.store.userDetails[0].email}
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
                    fullWidth="true"
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    type="text"
                    name="company"
                    value={this.props.store.userDetails[0].company}
                    required
                    onChange={this.handleInputChangeFor('company')}
                  />
                </div>
                <div className="vendorItem8">
                  <Button
                    style={{
                      backgroundColor: '#77818c',
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
                </div>
              </form>
            </div>
          );
        default:
          return (
            <div className="editWrapper">
              <form
                className="editSubcontractorForm"
                onSubmit={this.registerUser}
              >
                <div className="subItem0">
                  <h2>Edit User Information</h2>
                </div>
                {this.props.store.errors.registrationMessage && (
                  <h3 className="alert" role="alert">
                    {this.props.store.errors.registrationMessage}
                  </h3>
                )}
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
                    label="Phone (xxx-xxx-xxxx)"
                    variant="outlined"
                    type="number"
                    name="Phone Number"
                    value={this.props.store.userDetails[0].phone}
                    required
                    onChange={this.handleInputChangeFor('phone')}
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
                    value={this.props.store.userDetails[0].email}
                    required
                    onChange={this.handleInputChangeFor('email')}
                  />
                </div>
                <div className="subItemEdit5">
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
                    value={this.props.store.userDetails[0].address}
                    required
                    onChange={this.handleInputChangeFor('address')}
                  />
                </div>
                <div className="subItemEdit6">
                  <label>{'What do you do? :'}</label>
                  <Select
                    native
                    value={this.props.store.userDetails[0].job_title}
                    onChange={this.handleDropdown('jobTitle')}
                    className={classes.select}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                      name: 'osha',
                      id: 'filled-osha-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={'Helper'}>Helper</option>
                    <option value={'Welder'}>Welder</option>
                    <option value={'Fitter'}>Fitter</option>
                    <option value={'Welder / Fitter'}>Welder / Fitter</option>
                  </Select>
                  <label>{'Osha Certification :'}</label>
                  <Select
                    native
                    value={this.props.store.userDetails[0].osha_level}
                    onChange={this.handleDropdown('osha')}
                    className={classes.select}
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
                    value={
                      this.props.store.userDetails[0]
                        .subcontractor_certifications
                    }
                    required
                    onChange={this.handleInputChangeFor('certifications')}
                  />
                </div>
                <div className="subItem12">
                  <Button
                    style={{
                      backgroundColor: '#77818c',
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
                </div>
              </form>
            </div>
          );
      }
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(EditProfile));
