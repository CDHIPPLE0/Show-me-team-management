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

  handleClick = (event) => {
    this.setState({
      ...this.state,
      selection: event.target.value,
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
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
