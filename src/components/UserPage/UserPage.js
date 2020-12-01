import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';
import Sidebar from './Sidebar';
import JobSelection from './JobSelection';
import JobCreation from './JobCreation';
import EditProfile from './EditProfile';
import CurrentJob from './CurrentJob';
import Assignment from './Assignment';

class UserPage extends Component {
  state = {
    access_level: null,
    jobSelection: 0,
    selection: null,
  };

  jobSelection = (selection) => {
    console.log(selection);
    this.setState({
      ...this.state,
      jobSelection: selection,
      selection: 0,
    });
  };

  handleSidebar = (id) => {
    this.setState({
      ...this.state,
      selection: id,
    });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    let display = null;
    switch (this.state.selection) {
      case 0:
        display = <CurrentJob jobSelection={this.state.jobSelection} />;
        break;
      case 1:
        display = <JobSelection callBack={this.jobSelection} />;
        break;
      case 2:
        display = <Assignment />;
        break;
      case 3:
        display = <p>subcontractors</p>;
        break;
      case 4:
        display = <p>vendors</p>;
        break;
      case 5:
        display = <JobCreation />;
        break;
      case 6:
        display = <EditProfile />;
        break;
    }
    return (
      <>
        <AppNav props={this.props} />
        <div className="userPage">
          <Sidebar
            access={this.state.access_level}
            handleSidebar={this.handleSidebar}
          />
          {display}
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
