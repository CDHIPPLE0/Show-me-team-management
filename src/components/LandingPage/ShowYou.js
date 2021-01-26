import React from 'react';
import { Grid } from '@material-ui/core';
import './ShowYou.css';
import image6 from '../../Images/pic6.jpg';

function ShowYou(props) {
  return (
    <div className="showYouItem">
      <Grid container>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
          className="aboutTitle"
          style={{ textAlign: 'center' }}
        >
          <h2>OUR SERVICES</h2>
        </Grid>
        <Grid item lg={6} sm={12} xs={12} className="showMeGridItem">
          <img src={image6} className="showMeImage" />
        </Grid>
        <Grid item lg={6} sm={12} xs={12} className="showMeGridItem">
          <section>
            <h1>Stainless</h1>
            <p>
              Commodo eiusmod nostrud voluptate veniam consectetur nulla officia
              do eiusmod deserunt cillum nostrud. Est magna nisi id nostrud duis
              laborum eu cillum ipsum id deserunt magna. Sit in proident eu
              nulla cupidatat anim consequat qui. Commodo magna nostrud ex sunt
              nulla ea irure aliquip adipisicing. Aliquip labore labore culpa
              nostrud ullamco sint. Qui ipsum reprehenderit cillum enim ipsum.
              Labore do anim magna tempor et commodo.
            </p>
          </section>
          <section>
            <h1>Aluminum</h1>
            <p>
              Mollit mollit enim officia velit. Ex incididunt incididunt irure
              enim mollit. Nostrud cillum voluptate duis adipisicing Lorem
              laborum adipisicing eu id amet consectetur. Dolore exercitation
              dolore veniam commodo sit ex qui ullamco consectetur laborum sint
              nostrud. Reprehenderit sint aute do in labore adipisicing laborum.
              Et sit anim deserunt nostrud laborum cupidatat quis laborum.
            </p>
          </section>
          <section>
            <h1>Industrial</h1>
            <p>
              Magna amet officia nisi minim aliquip officia nisi cillum aliqua
              ad sunt cillum dolor. Occaecat elit duis laboris laborum et elit
              velit ad enim consequat adipisicing. Dolor nostrud nisi nisi
              veniam laborum officia eiusmod excepteur sunt. Labore dolore
              cillum qui exercitation irure et deserunt culpa laborum. Commodo
              eiusmod qui labore velit eu consectetur.
            </p>
          </section>
          <section>
            <h1>Commercial</h1>
            <p>
              Est voluptate nulla qui incididunt aliqua officia deserunt
              cupidatat consequat sit do occaecat labore. Excepteur irure id
              nulla dolor anim. Incididunt nostrud fugiat sit quis veniam et
              duis id ex aliquip sunt elit veniam. Dolor ut in ea proident
              laborum duis.
            </p>
          </section>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShowYou;
