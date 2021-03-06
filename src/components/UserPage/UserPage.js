import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';
import JobSelection from './JobSelection';
import JobCreation from './JobCreation';
import EditProfile from './EditProfile';
import CurrentJob from './CurrentJob';
import Assignment from './Assignment';
import Welcome from './Welcome';
import Subcontractors from './Subcontractors';
import Vendors from './Vendors';
import SideBar from './SideBar';
import Verify from './Verify';

class UserPage extends Component {
  state = {
    access_level: null,
    jobSelection: 0,
    selection: null,
  };

  jobSelection = (selection) => {
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
    this.props.dispatch({
      type: 'GET_USER_DETAILS',
      id: this.props.store.user.id,
    });
    this.props.dispatch({
      type: 'GET_UNVERIFIED_USERS',
    });
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    let display = null;
    let sideBar = null;
    switch (this.state.selection) {
      case 0:
        display = <CurrentJob jobSelection={this.state.jobSelection} />;
        break;
      case 1:
        display = (
          <JobSelection
            jobSelection={this.state.jobSelection}
            callBack={this.jobSelection}
          />
        );
        break;
      case 2:
        display = <Assignment jobSelection={this.state.jobSelection} />;
        break;
      case 3:
        display = <Subcontractors />;
        break;
      case 4:
        display = <Vendors />;
        break;
      case 5:
        display = <JobCreation />;
        break;
      case 6:
        display = <EditProfile />;
        break;
      case 7:
        display = <Verify />;
        break;
      case 12:
        display = (
          <center>
            <h1 style={{ color: 'red' }}>
              Your account is awaiting verification
            </h1>
          </center>
        );
        break;
      default:
        display = <Welcome />;
        break;
    }
    {
      return this.state.access_level ? (
        <>
          <AppNav props={this.props} />
          <div className="userPage">
            {this.state.access_level >= 2 ? (
              <SideBar
                access={this.state.access_level}
                handleSidebar={this.handleSidebar}
              />
            ) : (
              <></>
            )}
            {display}
          </div>
        </>
      ) : (
        <p>...loading</p>
      );
    }
  }
}

export default connect(mapStoreToProps)(UserPage);
