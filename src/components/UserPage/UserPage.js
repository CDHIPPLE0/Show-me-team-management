import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';
import Sidebar from './Sidebar';

class UserPage extends Component {
  state = {
    access_level: null,
    selection: 0,
  };

  handleClick = (event, id) => {
    console.log('its working');
    this.setState({
      ...this.state,
      selection: event,
    });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    return (
      <>
        <AppNav props={this.props} />
        <div className="userPage">
          <Sidebar
            access={this.state.access_level}
            handleClick={this.handleClick}
          />
          {JSON.stringify(this.state.selection)}
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
