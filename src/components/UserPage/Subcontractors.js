import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Subcontractors extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUBCONTRACTORS',
    });
  }

  render() {
    if (this.props.store.Subcontractors.allSubcontractors.length !== 0) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Osha Level</th>
                <th>Certifications</th>
                <th>Availability</th>
                <th>Assigned Job ID</th>
              </tr>
            </thead>
            <tbody className="tBody">
              {this.props.store.Subcontractors.allSubcontractors.map(
                (item, index) => (
                  <tr index={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.job_title}</td>
                    <td>{item.osha_level}</td>
                    <td>{item.subcontractor_certifications}</td>
                    <td>{item.job_status ? 'Working' : 'Available'}</td>
                    <td>{item.job_id}</td>
                  </tr>
                )
              )}
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

export default connect(mapStoreToProps)(Subcontractors);
