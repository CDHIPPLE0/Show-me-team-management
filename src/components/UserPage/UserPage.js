import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';
import Sidebar from './Sidebar';
import JobSelection from './JobSelection';
import JobCreation from './JobCreation';

class UserPage extends Component {
  state = {
    access_level: null,
    selection: 0,
  };

  handleClick = (id) => {
    console.log('its working');
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
      case 1:
        display = <JobSelection />;
        break;
      case 2:
        display = <p>assignment</p>;
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
        display = <p>edit self</p>;
        break;
    }
    let table = <p>hello</p>;
    return (
      <>
        <AppNav props={this.props} />
        <div className="userPage">
          <Sidebar
            access={this.state.access_level}
            handleClick={this.handleClick}
          />
          {display}
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
