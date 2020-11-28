import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SideBar extends Component {
  render() {
    return <div className="sideBar"></div>;
  }
}

export default connect(mapStoreToProps)(SideBar);
