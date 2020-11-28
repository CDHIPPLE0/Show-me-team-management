import React from 'react';
import { AdminSidebarData } from './AdminSidebarData';
import { VendorSidebarData } from './VendorSidebarData';
import { SubcontractorSidebarData } from './SubcontractorSidebarData';

const Sidebar = (props) => {
  const access = props.access;
  let items = 0;
  switch (access) {
    case 2:
      items = SubcontractorSidebarData;
      break;
    case 3:
      items = VendorSidebarData;
      break;
    case 4:
      items = AdminSidebarData;
      break;
  }
  if (items != 0) {
    return (
      <div className="sideBar">
        <h1 className="sideBarHeader">Menu</h1>
        {items.map((val, key) => {
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
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
};

export default Sidebar;
