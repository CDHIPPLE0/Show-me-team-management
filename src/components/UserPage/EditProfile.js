import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Select, Button } from '@material-ui/core';

class EditProfile extends Component {
  componentDidMount() {}
  state = {
    address: '',
    email: '',
    phone: '',
    osha: null,
    certifications: '',
    edit: false,
    madeChanges: false,
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleEdit = () => {
    this.setState({
      ...this.state,
      edit: true,
    });
  };

  editOff = () => {
    this.setState({
      ...this.state,
      edit: false,
    });
  };

  emailSubmit = () => {
    this.props.dispatch({
      type: 'EDIT_EMAIL',
      id: this.props.store.user.id,
      payload: { newEmail: this.state.email },
    });
  };

  render() {
    if (this.props.store.user.access_level_id === 3) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>My Email</th>
                <th>My Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tdStyle"></tbody>
            <tr>
              <td>
                {this.state.edit ? (
                  <>
                    <TextField
                      onChange={this.handleInputChangeFor('email')}
                      defaultValue={this.props.store.user.email}
                    />
                    <Button onClick={this.emailSubmit}>Submit</Button>
                  </>
                ) : (
                  this.props.store.user.email
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <TextField
                    type="number"
                    onChange={this.handleInputChangeFor('phone')}
                    defaultValue={this.props.store.user.phone}
                  />
                ) : (
                  this.props.store.user.phone
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <Button onClick={this.editOff}>Done</Button>
                ) : (
                  <Button onClick={this.handleEdit}>Edit</Button>
                )}
              </td>
            </tr>
          </table>
        </div>
      );
    } else {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>My Address</th>
                <th>My Email</th>
                <th>My Phone</th>
                <th>My Osha Level</th>
                <th>My Certifications</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tdStyle"></tbody>
            <tr>
              <td>
                {this.state.edit ? (
                  <TextField
                    onChange={this.handleInputChangeFor('address')}
                    defaultValue={this.props.store.user.address}
                  />
                ) : (
                  this.props.store.user.address
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <TextField
                    onChange={this.handleInputChangeFor('email')}
                    defaultValue={this.props.store.user.email}
                  />
                ) : (
                  this.props.store.user.email
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <TextField
                    type="number"
                    onChange={this.handleInputChangeFor('phone')}
                    defaultValue={this.props.store.user.phone}
                  />
                ) : (
                  this.props.store.user.phone
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <Select
                    native
                    defaultValue={this.props.store.user.osha_level}
                    onChange={this.handleInputChangeFor('osha')}
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
                ) : (
                  this.props.store.user.osha_level
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <TextField
                    onChange={this.handleInputChangeFor('email')}
                    defaultValue={
                      this.props.store.user.subcontractor_certifications
                    }
                  />
                ) : (
                  this.props.store.user.subcontractor_certifications
                )}
              </td>
              <td>
                {this.state.edit ? (
                  <Button onClick={this.handleSubmit}>Submit Changes</Button>
                ) : (
                  <Button onClick={this.handleEdit}>Edit</Button>
                )}
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(EditProfile);
