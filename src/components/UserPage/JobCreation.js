import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const styles = {
  input: {
    color: ' #fffded',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: ' #fffded  !important',
  },
};

class JobCreation extends Component {
  state = {
    description: '',
    startDate: '',
    jobAddress: '',
    jobCreator: '',
    helpersNeeded: '',
    weldersNeeded: '',
    fittersNeeded: '',
    helperRate: '',
    welderRate: '',
    fitterRate: '',
  };

  createJob = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'CREATE_JOB',
      payload: {
        description: this.state.description,
        startDate: this.state.startDate,
        address: this.state.jobAddress,
        jobCreator: this.props.store.user.id,
        helpersNeeded: this.state.helpersNeeded,
        weldersNeeded: this.state.weldersNeeded,
        fittersNeeded: this.state.fittersNeeded,
        helperRate: this.state.helperRate,
        welderRate: this.state.welderRate,
        fitterRate: this.state.fitterRate,
      },
    });
    this.setState({
      description: '',
      startDate: '',
      jobAddress: '',
      jobCreator: '',
      helpersNeeded: '',
      weldersNeeded: '',
      fittersNeeded: '',
      helperRate: '',
      welderRate: '',
      fitterRate: '',
    });
    if (this.props.store.user.access_level_id === 3) {
      swal(
        'Job Submitted!',
        'You will be contacted by our team as soon as possible',
        'success'
      );
    } else if (this.props.store.user.access_level_id === 4) {
      swal('Job Submitted!', 'Lets get rolling boss', 'success');
    }
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div jobFormWrapper>
        <form className="jobForm-grid-wrapper" onSubmit={this.createJob}>
          <h2>Job Creation</h2>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <br />
          <div className="jobItemDesc">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
              fullWidth={true}
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
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
              id="outlined-basic"
              label="StartDate"
              variant="outlined"
              type="text"
              name="startDate"
              value={this.state.startDate}
              required
              onChange={this.handleInputChangeFor('startDate')}
            />
          </div>
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
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
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
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
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
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
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
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
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
              id="outlined-basic"
              label="Helper Rate"
              variant="outlined"
              type="number"
              name="Helper Rate"
              value={this.state.helperRate}
              required
              onChange={this.handleInputChangeFor('helperRate')}
            />
          </div>
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
              id="outlined-basic"
              label="Welder Rate"
              variant="outlined"
              type="number"
              name="Welder Rate"
              value={this.state.welderRate}
              required
              onChange={this.handleInputChangeFor('welderRate')}
            />
          </div>
          <div className="jobItem">
            <TextField
              InputLabelProps={{
                style: { color: '#fffded' },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
              }}
              autoComplete="off"
              id="outlined-basic"
              label="Fitter Rate"
              variant="outlined"
              type="number"
              name="Fitter Rate"
              value={this.state.fitterRate}
              required
              onChange={this.handleInputChangeFor('fitterRate')}
            />
          </div>
          <div className="jobItem">
            <Button
              variant="contained"
              className="btn"
              type="submit"
              name="submit"
              value="Register"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(withStyles(styles)(JobCreation));
