import React, { Component } from 'react';
import { SideBarData } from './SideBarData';

const SideBar = (props) => {
  return (
    <div className="sideBar">
      {SideBarData.map((val, key) => {
        return (
          <ul key={key}>
            <li value={val.Selection} onClick={props.handleClick}>
              {val.Title}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default SideBar;
