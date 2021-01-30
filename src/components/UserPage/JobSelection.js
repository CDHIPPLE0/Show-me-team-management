import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import Axios from 'axios';

class JobSelection extends Component {
  sendToParent = (id) => (event) => {
    this.props.dispatch({
      type: 'SET_ACTIVE',
      id: id,
    });
    this.props.callBack(id);
  };

  removeJob = (id) => (event) => {
    console.log(id);
    this.props.dispatch({
      type: 'REMOVE_JOB',
      payload: id,
    });
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
                <th>Job ID</th>
                <th>Start Date</th>
                <th>Vendor Name</th>
                <th>Vendor Company</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date Posted</th>
                <th>Helper Rate</th>
                <th>Welder Rate</th>
                <th>Fitter Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.jobs.populateJobs.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.start_date}</td>
                  <td>{item.last_name}</td>
                  <td>{item.vendor_company}</td>
                  <td>{item.description}</td>
                  <td>{item.job_address}</td>
                  <td>{item.date_created.substring(0, 10)}</td>
                  <td>{`$${item.helper_rate}`}</td>
                  <td>{`$${item.welder_rate}`}</td>
                  <td>{`$${item.fitter_rate}`}</td>
                  <td>
                    {this.props.jobSelection !== item.id ? (
                      <Button
                        onClick={this.sendToParent(item.id)}
                        key={index}
                        style={{
                          backgroundColor: 'rgba(144, 238, 144, 0.322)',
                        }}
                      >
                        Select
                      </Button>
                    ) : (
                      <Button key={index}>Currently Selected</Button>
                    )}
                  </td>
                  <td>
                    <Button
                      onClick={this.removeJob(item.id)}
                      key={index}
                      style={{ backgroundColor: 'rgba(255, 0, 0, 0.342)' }}
                    >
                      DELETE
                    </Button>
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
