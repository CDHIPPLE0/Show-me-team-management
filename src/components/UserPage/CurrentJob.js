import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';

class JobSelection extends Component {
  componentDidMount() {
    console.log(this.props.jobSelection);
    this.props.dispatch({
      type: 'GET_JOB',
      payload: this.props.jobSelection,
    });
    this.props.dispatch({
      type: 'GET_CURRENT_JOB_SUB',
      id: this.props.jobSelection,
    });
    console.log(this.props.store.populateCurrentJobContractors);
  }

  render() {
    if (this.props.store.jobs.getDetailJob != 0) {
    }
    return (
      <div className="table">
        <table className="statTable">
          <thead className="tableHead">
            {this.props.store.jobs.getDetailJob.length ? (
              this.props.store.jobs.getDetailJob.map((item, index) => (
                <tr index={index} className="inTheGreen">
                  <th colSpan="9">
                    {'Vendor Company: '}
                    {item.vendor_company}
                    {' | '}
                    {'Vendor Name: '}
                    {item.last_name}
                    {' | '}
                    {'Start Date: '}
                    {item.start_date}
                  </th>
                </tr>
              ))
            ) : (
              <tr className="inTheRed">
                <th colSpan="9">Please Select A Job</th>
              </tr>
            )}
          </thead>
          <thead className="tableHead">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Address</th>
              <th>Osha Level</th>
              <th colSpan="4"></th>
            </tr>
          </thead>
          <tbody>
            {/* {this.props.store.populateCurrentJobContractors.map(
              (item, index) => (
                <tr index={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.job_title}</td>
                  <td>{item.osha_level}</td>
                </tr>
              )
            )} */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JobSelection);
