import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';

class UserPage extends Component {
  state = {
    access_level: 0,
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
        {this.state.access_level === 4 && (
          <div>
            <p>admin</p>
          </div>
        )}
        {this.state.access_level === 3 && (
          <div className="userPage">
            <p>Subcontractor</p>
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
