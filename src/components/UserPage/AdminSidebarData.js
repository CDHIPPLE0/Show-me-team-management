import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';

export const AdminSidebarData = [
  {
    Icon: <ListAltIcon />,
    Title: 'Job Selection',
    Selection: 1,
  },
  {
    Icon: <PostAddIcon />,
    Title: 'Assignment',
    Selection: 2,
  },
  {
    Icon: <PeopleIcon />,
    Title: 'Subcontractors',
    Selection: 3,
  },
  {
    Icon: <BusinessIcon />,
    Title: 'Vendors',
    Selection: 4,
  },
];