import React from 'react';
import { AdminSidebarData } from './AdminSidebarData';
import { VendorSidebarData } from './VendorSidebarData';

const Sidebar = (props) => {
  const access = props.access;
  let items = 0;
  switch (access) {
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
              <li
                onClick={() => props.handleClick(val.Selection)}
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
        <p>Loading...</p>
      </div>
    );
  }
};

export default Sidebar;