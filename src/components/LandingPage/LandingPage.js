import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Carousel from 'react-material-ui-carousel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Nav from '../Nav/Nav';
import Item from './Carousel';
import image1 from '../../Images/landingPageBackground.png';
import image2 from '../../Images/pic2.jpg';
import image6 from '../../Images/pic6.jpg';
import image7 from '../../Images/pic7.JPG';
import image8 from '../../Images/pic8.jpg';
import AboutUs from './AboutUs';
import ShowYou from './ShowYou';
import ContactUs from './ContactUs';
class LandingPage extends Component {
  render() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let items = [{ image: image2 }, { image: image8 }];
    return (
      <>
        <div className="carouselDiv">
          {!this.props.store.user.id ? <Nav /> : <></>}
          <h1 className="title">Show Up And Show Out</h1>
          <div className="carouselImage">
            <Carousel>
              {items.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </div>
          <ExpandMoreIcon />
        </div>
        <AboutUs />
        <ShowYou />
        <ContactUs />
      </>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
