import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Vendors extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VENDORS',
    });
  }

  render() {
    if (this.props.store.allVendors.length !== 0) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.allVendors.map((item, index) => (
                <tr index={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.vendor_company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr className="inTheRed">
                <th className="welcome">
                  Check your Verify Menu, there are no verified subcontractors
                  in the system.
                </th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(Vendors);
