import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';

class EditProfile extends Component {
  componentDidMount() {
    console.log(this.props.store.user.phone);
  }
  state = {
    address: '',
    email: '',
    phone: '',
  };

  createJob = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'CREATE_JOB',
      payload: {
        address: this.state.address,
        email: this.state.email,
        phone: this.props.phone,
      },
    });
    this.setState({
      address: '',
      email: '',
      phone: '',
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    if (this.props.store.user.access_level_id === 3) {
      return (
        <div class="containerTable">
          <div class="table">
            <table class="statTable">
              <thead class="tableHead">
                <tr>
                  <th>My Company</th>
                  <th>My Email</th>
                  <th>My Phone</th>
                </tr>
              </thead>
              <tbody class="tdStyle"></tbody>
              <tr>
                <td>{this.props.store.user.address}</td>
                <td>{this.props.store.user.email}</td>
                <td>{this.props.store.user.phone}</td>
              </tr>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div class="containerTable">
          <div class="table">
            <table class="statTable">
              <thead class="tableHead">
                <tr>
                  <th>My Address</th>
                  <th>My Email</th>
                  <th>My Phone</th>
                  <th>My Osha Level</th>
                  <th>My Certifications</th>
                </tr>
              </thead>
              <tbody class="tdStyle"></tbody>
              <tr>
                <td>{this.props.store.user.address}</td>
                <td>{this.props.store.user.email}</td>
                <td>{this.props.store.user.phone}</td>
                <td>{this.props.store.user.osha_level}</td>
                <td>{this.props.store.user.subcontractor_certifications}</td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(EditProfile);
