import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class JobSelection extends Component {
  componentDidMount() {
    console.log(this.props.jobSelection);
    this.props.dispatch({
      type: 'GET_JOB',
      payload: this.props.jobSelection,
    });
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
                <tr index={index}>
                  <th colSpan="9">
                    {item.start_date}
                    {' | '}
                    {item.vendor_company}
                    {' | '}
                    {item.last_name}
                  </th>
                </tr>
              ))
            ) : (
              <tr>
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
              <th colSpan="4">Certifications</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.jobs.getDetailJob.map((item, index) => (
              <tr index={index}></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JobSelection);
