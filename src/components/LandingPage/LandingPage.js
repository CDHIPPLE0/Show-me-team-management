import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class LandingPage extends Component {
  render() {
    return (
      <div className="landingWrapper">
        <div class="content1">
          <p class="headtext1">Bringing the best, Show up and Show out!</p>
          <p class="bodytext1">
            We connect high quality subcontractors with vendors all across the
            country. Whatever your needs may be, we will assemble a team you can
            count on.
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
