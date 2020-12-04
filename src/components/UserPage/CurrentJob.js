import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class JobSelection extends Component {
  removeEmployee = (id) => (event) => {
    this.props.dispatch({
      type: 'DELETE_JOB_CONNECTION',
      id: id,
    });
    this.props.dispatch({
      type: 'STATUS_NOT_WORKING',
      id: id,
    });
    this.props.dispatch({
      type: 'GET_CURRENT_JOB_SUB',
      id: this.props.jobSelection,
    });
  };

  componentDidMount() {
    console.log(this.props.store.userJob.populateCurrentJobSubcontractors);
    this.props.dispatch({
      type: 'GET_JOB',
      payload: this.props.jobSelection,
    });
    this.props.dispatch({
      type: 'GET_CURRENT_JOB_SUB',
      id: this.props.jobSelection,
    });
  }

  render() {
    if (this.props.store.jobs.getDetailJob !== 0) {
    }
    return (
      <div className="table">
        <table className="statTable">
          <thead className="tableHead">
            {this.props.store.jobs.getDetailJob.length ? (
              this.props.store.jobs.getDetailJob.map((item, index) => (
                <tr index={index} className="welcome">
                  <th colSpan="9" className="inTheGreen">
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
              <tr className="welcome">
                <th colSpan="9" className="inTheRed">
                  Please Select A Job
                </th>
              </tr>
            )}
          </thead>
          <thead className="tableHead">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Osha Level</th>
              <th>Certifications</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.userJob.populateCurrentJobSubcontractors.map(
              (item, index) => (
                <tr index={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.job_title}</td>
                  <td>{item.osha_level}</td>
                  <td>{item.subcontractor_certifications}</td>
                  <td>
                    <Button
                      color="secondary"
                      onClick={this.removeEmployee(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JobSelection);
