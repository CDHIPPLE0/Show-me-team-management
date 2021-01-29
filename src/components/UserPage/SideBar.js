import React from 'react';
import { AdminSidebarData } from './AdminSidebarData';
import { UnverifiedSidebarData } from './UnverifiedSidebarData';
import { VendorSidebarData } from './VendorSidebarData';
import { SubcontractorSidebarData } from './SubcontractorSidebarData';

const SideBar = (props) => {
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
    default:
      items = UnverifiedSidebarData;
      break;
  }
  if (items !== 0) {
    return (
      <div className="sideBar">
        <h1 className="sideBarHeader">Menu</h1>
        {items.map((val, key) => {
          return (
            <ul key={key}>
              <li
                onClick={() => props.handleSidebar(val.Selection)}
                value={val.Selection}
              >
                <div className="icon">{val.Icon}</div>
                <div className="listTitle">{val.Title}</div>
              </li>
            </ul>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <center>Your Account Is Awaiting Approval</center>
      </div>
    );
  }
};

export default SideBar;
