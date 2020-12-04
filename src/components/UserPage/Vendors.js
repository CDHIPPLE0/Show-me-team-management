import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Vendors extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VENDORS',
    });
    console.log(this.props.store.allVendors);
  }

  render() {
    if (this.props.store.allVendors.length !== 0) {
      console.log(this.props.store.allVendors);
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
                <th>Account Status</th>
                <th></th>
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
                  <td>
                    {item.access_level_id === item.registered_as
                      ? 'Verified'
                      : 'Pending Approval'}
                  </td>
                  <td>
                    <Button color="secondary">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <center>loading...</center>;
    }
  }
}

export default connect(mapStoreToProps)(Vendors);
