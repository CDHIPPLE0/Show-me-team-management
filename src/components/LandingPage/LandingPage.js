import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Carousel from 'react-material-ui-carousel';
import Item from './Carousel';
import image1 from '../../Images/landingPageBackground.png';
import image2 from '../../Images/pic2.jpg';
import AboutUs from './AboutUs';
import ShowYou from './ShowYou';
class LandingPage extends Component {
  render() {
    let items = [{ image: image1 }, { image: image2 }];
    return (
      <div className="landingPageItems">
        <div>
          <h1 className="title">Show Up And Show Out</h1>
          <Carousel>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>
        <AboutUs />
        <ShowYou />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
