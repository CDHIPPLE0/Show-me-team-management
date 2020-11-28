import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { SideBarData } from './SideBarData';

class SideBar extends Component {
  handleSelection = () => {
    console.log('hi');
  };
  render() {
    return (
      <div className="sideBar">
        {SideBarData.map((val, key) => {
          return (
            <ul key={key}>
              <li onClick={this.handleSelection}>{val.Title}</li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SideBar);
