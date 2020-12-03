import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CreateIcon from '@material-ui/icons/Create';

export const AdminSidebarData = [
  {
    Icon: <CreateIcon />,
    Title: 'Job Creation',
    Selection: 5,
  },
  {
    Icon: <WorkOutlineIcon />,
    Title: 'Current Job',
    Selection: 0,
  },

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
