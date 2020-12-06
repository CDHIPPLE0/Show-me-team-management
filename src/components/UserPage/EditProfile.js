import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  state = {};

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
