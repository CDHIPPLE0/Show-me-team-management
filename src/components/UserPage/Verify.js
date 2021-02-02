import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import swal from 'sweetalert';

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
  deleteUser = (id) => () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({
          type: 'DELETE_USER',
          id: id,
        });
        swal('Poof! The user has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Crisis averted!');
      }
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
                        style={{
                          backgroundColor: 'rgba(144, 238, 144, 0.322)',
                        }}
                        onClick={this.verifyUser(item.id, item.registered_as)}
                      >
                        Verify
                      </Button>
                    }
                  </td>
                  <td>
                    {
                      <Button
                        style={{ backgroundColor: 'rgba(255, 0, 0, 0.342)' }}
                        onClick={this.deleteUser(item.id, item.registered_as)}
                      >
                        Reject
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
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr className="inTheRed">
                <th className="welcome">No unverified users in the system</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(Verify);
