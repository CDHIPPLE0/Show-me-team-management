import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';

class JobSelection extends Component {
  sendToParent = (id) => (event) => {
    this.props.dispatch({
      type: 'SET_ACTIVE',
      id: id,
    });
    this.props.callBack(id);
  };

  removeJob = (id) => (event) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this job!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({
          type: 'REMOVE_JOB',
          payload: id,
        });
        swal('Poof! The job has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Crisis averted!');
      }
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
                <th>Description</th>
                <th>Location</th>
                <th>Date Posted</th>
                <th style={{ fontSize: '.8rem' }}>
                  Helpers needed / assigned / rate{' '}
                </th>
                <th style={{ fontSize: '.8rem' }}>
                  Welders needed / assigned / rate{' '}
                </th>
                <th style={{ fontSize: '.8rem' }}>
                  Fitters needed / assigned / rate{' '}
                </th>
                <th style={{ fontSize: '.8rem' }}>
                  Fitter-Welders needed / assigned{' '}
                </th>
                <th style={{ fontSize: '.8rem' }}>Total Assigned</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tBody">
              {this.props.store.jobs.populateJobs.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.start_date}</td>
                  <td>{item.description}</td>
                  <td>{item.job_address}</td>
                  <td>{item.date_created.substring(0, 10)}</td>
                  <td>{`${item.helpers_needed} / ${item.Helpers} / $${item.helper_rate}`}</td>
                  <td>{`${item.welders_needed} / ${item.Welders} / $${item.welder_rate}`}</td>
                  <td>{`${item.fitters_needed} / ${item.Fitters} / $${item.fitter_rate}`}</td>
                  <td>{`${item.welderfitters_needed} / ${item.WelderFitters}`}</td>
                  <td>{item.count}</td>
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
