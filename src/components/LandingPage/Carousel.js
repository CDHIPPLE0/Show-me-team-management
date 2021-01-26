import React from 'react';
import { Paper, Button } from '@material-ui/core';

function Item(props) {
  return (
    <div className="carousel">
      <div>
        <h2 className="headtext1">
          We connect high quality subcontractors with vendors all across the
          country. Whatever your needs may be, we will assemble a team you can
          count on.
        </h2>
      </div>
      <img src={props.item.image} />
    </div>
  );
}

export default Item;
