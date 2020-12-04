import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';

class Assignment extends Component {
  state = {
    selection: [],
    message: '',
  };
  recordMessage = (event) => {
    console.log(this.state.message);
    this.setState({
      ...this.state,
      message: event.target.value,
    });
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
  };

  sendCustom = () => {
    let message = this.state.message;
    this.setState({
      ...this.state,
      message: '',
    });
    let userArray = this.state.selection;
    this.props.dispatch({
      type: 'SELECT_ALL_FALSE',
    });
    this.setState({
      selection: [],
    });
    this.props.dispatch({
      type: 'SEND_CUSTOM',
      payload: {
        userArray: userArray,
        message: message,
      },
    });
  };

  sendAutomated = () => {
    let userArray = this.state.selection;
    this.props.dispatch({
      type: 'SELECT_ALL_FALSE',
    });
    this.setState({
      selection: [],
    });
    let jobDetails = this.props.store.jobs.getDetailJob[0];
    let startDate = jobDetails.start_date;
    let jobAddress = jobDetails.job_address;
    let jobId = this.props.jobSelection;
    this.props.dispatch({
      type: 'SEND_AUTOMATED',
      payload: {
        jobId: jobId,
        userArray: userArray,
        startDate: startDate,
        jobAddress: jobAddress,
      },
    });
  };

  selectSubcontractor = (id) => (event) => {
    this.props.dispatch({
      type: 'SELECT_TRUE',
      payload: id,
    });
    this.setState({
      ...this.state,
      selection: [...this.state.selection, id],
    });
  };

  deselectSubcontractor = (id) => (event) => {
    let array = this.state.selection;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element === id) {
        array.splice(index, 1);
      }
    }
    console.log('look at me', array);
    this.props.dispatch({
      type: 'SELECT_FALSE',
      payload: id,
    });
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_AVAILABLE',
    });
  }

  render() {
    if (this.props.jobSelection !== 0) {
      if (this.props.store.Subcontractors.availableSubcontractors.length > 0) {
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
                {this.props.store.Subcontractors.availableSubcontractors.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.job_title}</td>
                      <td>{item.osha_level}</td>
                      <td>{item.certifications}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.is_selected === true ? (
                          <Button onClick={this.deselectSubcontractor(item.id)}>
                            Deselect
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            onClick={this.selectSubcontractor(item.id)}
                          >
                            Select
                          </Button>
                        )}
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
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="footStyleDark"></td>
                </tr>
                <tr>
                  <td colSpan="8" className="footStyleWhite">
                    <TextField
                      className="textField"
                      onChange={this.recordMessage}
                      color="primary"
                      variant="outlined"
                      type="text"
                      name="Last Name"
                      placeholder="Enter Custom Message"
                      value={this.state.message}
                      required
                    />
                    <Button color="secondary" onClick={this.sendCustom}>
                      Send Custom
                    </Button>
                    <Button color="primary" onClick={this.sendAutomated}>
                      Send Automated
                    </Button>
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
                  <th className="welcome">No Subcontractors To Assign</th>
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
              <tr className="welcome">
                <th className="inTheRed">
                  Please Select A Job Before Assigning Employees
                </th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStoreToProps)(Assignment);
