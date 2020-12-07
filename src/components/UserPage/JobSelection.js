import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class JobSelection extends Component {
  sendToParent = (id) => (event) => {
    console.log(event);
    this.props.dispatch({
      type: 'SET_ACTIVE',
      id: id,
    });
    this.props.callBack(id);
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_JOBS',
    });
  }
  render() {
    if (this.props.store.jobs.populateJobs.length > 0) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>Start Date</th>
                <th>Vendor Name</th>
                <th>Vendor Company</th>
                <th>Description</th>
                <th>Location</th>
                <th>Helpers Needed</th>
                <th>Welders Needed</th>
                <th>Fitters Needed</th>
                <th>Date Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.jobs.populateJobs.map((item, index) => (
                <tr key={index}>
                  <td>{item.start_date}</td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.vendor_company}</td>
                  <td>{item.description}</td>
                  <td>{item.job_address}</td>
                  <td>{item.helpers_needed}</td>
                  <td>{item.welders_needed}</td>
                  <td>{item.fitters_needed}</td>
                  <td>{item.date_created.substring(0, 10)}</td>
                  <td>
                    {this.props.jobSelection !== item.id ? (
                      <Button onClick={this.sendToParent(item.id)} key={index}>
                        Select
                      </Button>
                    ) : (
                      <Button key={index}>Currently Selected</Button>
                    )}
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
                <th className="welcome">No Jobs Available</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(JobSelection);
