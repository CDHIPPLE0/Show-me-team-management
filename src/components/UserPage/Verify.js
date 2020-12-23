import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Verify extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUBCONTRACTORS',
    });
  }
  verifyUser = (id) => () => {
    this.props.dispatch({
      type: 'VERIFY_USER',
      id: id,
    });
  };

  render() {
    if (this.props.store.unverified.length !== 0) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Company</th>
                <th>Registered As</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.unverified.map((item, index) => (
                <tr index={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.vendor_company}</td>
                  <td>
                    {item.registered_as === 2 ? 'Subcontractor' : 'Vendor'}
                  </td>
                  <td>
                    {
                      <Button
                        color="primary"
                        onClick={this.verifyUser(item.id, item.registered_as)}
                      >
                        Verify
                      </Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <center>No unverified users to display...</center>;
    }
  }
}

export default connect(mapStoreToProps)(Verify);
