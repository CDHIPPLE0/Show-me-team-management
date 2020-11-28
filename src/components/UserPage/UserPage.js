import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
    return <div className="userPage"></div>;
  }
}

export default connect(mapStoreToProps)(UserPage);
