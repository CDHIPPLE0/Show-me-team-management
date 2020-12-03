import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const AppNav = (props) => {
  const handle = function handleLogout() {
    props.dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="appNav">
      {props.props.store.user.id && (
        <>
          <p>Show Me Stainless Team Management</p>
          <Button onClick={handle} variant="contained">
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default connect()(AppNav);
