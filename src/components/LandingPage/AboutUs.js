import React from 'react';
import { Grid } from '@material-ui/core';
import './AboutUs.css';
import image3 from '../../Images/pic3.jpg';
import image4 from '../../Images/pic4.jpeg';
import image7 from '../../Images/pic7.JPG';
function AboutUs(props) {
  return (
    <div className="aboutUsItem">
      <Grid container>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
          className="aboutTitle"
          style={{ textAlign: 'center' }}
        >
          <h2>ABOUT US</h2>
        </Grid>
        <Grid item lg={5} sm={12} xs={12} className="aboutUsGridItem">
          <img src={image7} className="aboutImage" />
          <h1>Ten years of results</h1>
          <p>
            Exercitation labore aliquip id consequat. Aute ipsum eiusmod
            cupidatat occaecat. Aliqua ullamco occaecat dolor ullamco nulla
            voluptate deserunt. Aliquip laboris tempor quis excepteur laborum id
            sint occaecat exercitation ullamco consequat dolor.
          </p>
        </Grid>
        <Grid item lg={2} sm={12} xs={12} className="aboutUsGridItem">
          <img src={image3} className="aboutImage" />
          <h1>Bringing you the best</h1>
          <p>
            Ut aute dolore nisi non consectetur consequat ex proident
            consectetur tempor non sunt duis. Occaecat aliquip tempor pariatur
            dolore reprehenderit qui et. Sit quis irure elit tempor anim anim ex
            ullamco. Nisi laboris officia est voluptate.
          </p>
        </Grid>
        <Grid item lg={5} sm={12} xs={12} className="aboutUsGridItem">
          <img src={image4} className="aboutImage" />
          <h1>From coast to coast</h1>
          <p>
            Et dolore aute culpa quis pariatur elit. Mollit cupidatat velit
            occaecat voluptate cillum sunt sunt magna quis reprehenderit tempor.
            Non voluptate elit minim fugiat non adipisicing cupidatat nisi aute
            sit exercitation. Est reprehenderit id officia proident occaecat id
            ullamco .
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutUs;
