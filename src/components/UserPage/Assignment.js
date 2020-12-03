import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';

class Assignment extends Component {
  state = {
    selection: [],
  };

  sendToParent = (id) => (event) => {
    this.props.callBack(id);
  };

  forceAssignSubcontractor = (id) => (event) => {
    this.props.dispatch({
      type: 'CREATE_JOB_CONNECTION',
      payload: {
        job: this.props.jobSelection,
        user: id,
      },
    });
    this.props.dispatch({
      type: 'STATUS_WORKING',
      id: id,
    });
    this.props.dispatch({
      type: 'GET_AVAILABLE',
    });
  };

  selectSubcontractor = (id) => (event) => {
    this.setState({
      ...this.state,
      selection: [...this.state.selection, id],
    });
    console.log('---- hello ---- ', this.state.selection);
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_AVAILABLE',
    });
  }

  render() {
    if (this.props.jobSelection !== 0) {
      if (this.props.store.availableSubcontractors.length > 0) {
        return (
          <div className="table">
            <table className="statTable">
              <thead className="tableHead">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Job Title</th>
                  <th>Osha Level</th>
                  <th>Certifications</th>
                  <th>Address</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.store.availableSubcontractors.map((item, index) => (
                  <tr key={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.job_title}</td>
                    <td>{item.osha_level}</td>
                    <td>{item.certifications}</td>
                    <td>{item.address}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={this.selectSubcontractor(item.id)}
                      >
                        Select
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="secondary"
                        onClick={this.forceAssignSubcontractor(item.id)}
                      >
                        Force Assign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="footStyleDark"></td>
                </tr>
                <tr>
                  <td colSpan="8" className="footStyleWhite">
                    <TextField
                      color="primary"
                      variant="outlined"
                      type="text"
                      name="Last Name"
                      placeholder="Enter Custom Message"
                      // value={this.state.lastName}
                      required
                    />
                    <Button color="secondary">Send Custom</Button>
                    <Button color="primary">Send Automated</Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      } else {
        return (
          <div className="table">
            <table className="statTable">
              <thead className="tableHead">
                <tr className="inTheRed">
                  <th>No Subcontractors To Assign</th>
                </tr>
              </thead>
            </table>
          </div>
        );
      }
    } else {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr className="inTheRed">
                <th>Please Select A Job Before Assigning Employees</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(Assignment);
