import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';

class JobCreation extends Component {
  state = {
    description: '',
    jobAddress: '',
    jobCreator: '',
    helpersNeeded: '',
    weldersNeeded: '',
    fittersNeeded: '',
  };

  createJob = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'CREATE_JOB',
      payload: {
        description: this.state.description,
        address: this.state.jobAddress,
        jobCreator: this.props.store.user.id,
        helpersNeeded: this.state.helpersNeeded,
        weldersNeeded: this.state.weldersNeeded,
        fittersNeeded: this.state.fittersNeeded,
      },
    });
    this.setState({
      description: '',
      jobAddress: '',
      jobCreator: '',
      helpersNeeded: '',
      weldersNeeded: '',
      fittersNeeded: '',
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.createJob}>
        <h2>Job Creation</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type="text"
            name="Description"
            value={this.state.description}
            required
            onChange={this.handleInputChangeFor('description')}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Job Address"
            variant="outlined"
            type="text"
            name="Job Address"
            value={this.state.jobAddress}
            required
            onChange={this.handleInputChangeFor('jobAddress')}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Helpers Needed"
            variant="outlined"
            type="number"
            name="Helpers Needed"
            value={this.state.helpersNeeded}
            required
            onChange={this.handleInputChangeFor('helpersNeeded')}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Welders Needed"
            variant="outlined"
            type="number"
            name="Welders Needed"
            value={this.state.weldersNeeded}
            required
            onChange={this.handleInputChangeFor('weldersNeeded')}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Fitters Needed"
            variant="outlined"
            type="number"
            name="Fitters Needed"
            value={this.state.fittersNeeded}
            required
            onChange={this.handleInputChangeFor('fittersNeeded')}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className="btn"
          type="submit"
          name="submit"
          value="Register"
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(JobCreation);
