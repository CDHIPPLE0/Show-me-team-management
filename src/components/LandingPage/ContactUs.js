import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Select, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './ContactUs.css';
import swal from 'sweetalert';
const styles = {
  input: {
    color: ' #fffded',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: ' #fffded  !important',
  },
  select: {
    '&:before': {
      borderColor: ' #fffded',
    },
    '&:after': {
      borderColor: ' #fffded',
    },
  },
  icon: {
    fill: ' #fffded',
  },
};

class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  sendEmail = (event) => {
    event.preventDefault();
    let payload = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    };
    console.log(payload);
    axios.put('/api/nodeMailer/send', payload);
    swal('Thanks!', 'We will get back to you soon', 'success');
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };
  handleInputChangeFor = (propertyName) => (event) => {
    console.log(event.target.value);
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="formBox">
        <form className="contactForm" onSubmit={this.sendEmail}>
          <h1>CONTACT US</h1>
          <center>
            <Grid container>
              <Grid item container lg={6} sm={12} xs={12} spacing={1}>
                <Grid item lg={12} sm={12} xs={12}>
                  <h3>Reach out to us</h3>
                  <TextField
                    style={{ background: 'white' }}
                    InputLabelProps={{
                      style: { color: '#fffded' },
                    }}
                    InputProps={{
                      classes: {
                        backgroundColor: classes.backgroundColor,
                        notchedOutline: classes.notchedOutline,
                        input: classes.input,
                      },
                    }}
                    autoComplete="off"
                    id="outlined-basic"
                    style={{ width: 300 }}
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="Name"
                    value={this.state.name}
                    required
                    onChange={this.handleInputChangeFor('name')}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <TextField
                    InputLabelProps={{
                      style: { color: '#fffded' },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.input,
                      },
                    }}
                    autoComplete="off"
                    id="outlined-basic"
                    style={{ width: 300 }}
                    label="Email"
                    variant="outlined"
                    type="text"
                    name="Email"
                    value={this.state.email}
                    required
                    onChange={this.handleInputChangeFor('email')}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <TextField
                    InputLabelProps={{
                      style: { color: '#fffded' },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.input,
                      },
                    }}
                    autoComplete="off"
                    id="outlined-basic"
                    style={{ width: 300 }}
                    label="Subject"
                    variant="outlined"
                    type="text"
                    name="Subject"
                    value={this.state.subject}
                    required
                    onChange={this.handleInputChangeFor('subject')}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <TextField
                    InputLabelProps={{
                      style: { color: '#fffded' },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.input,
                      },
                    }}
                    autoComplete="off"
                    id="outlined-basic"
                    style={{ width: 300 }}
                    label="Message"
                    multiline
                    rows={8}
                    variant="outlined"
                    type="text"
                    name="Message"
                    value={this.state.message}
                    required
                    onChange={this.handleInputChangeFor('message')}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <Button
                    style={{ width: '300px' }}
                    className="buttonFormButton"
                    variant="contained"
                    type="submit"
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
              <Grid item container lg={6} sm={12} xs={12} spacing={0}>
                <Grid item lg={12} sm={12} xs={12}>
                  <section>
                    <h2>Our team will be in touch</h2>
                    <br />
                    <p>
                      We want to hear from you. Pariatur adipisicing pariatur
                      eiusmod aliqua ad non consectetur Lorem. Qui sint deserunt
                      exercitation elit fugiat duis. Pariatur veniam dolor
                      consequat nisi incididunt dolore nostrud exercitation
                      eiusmod irure. Magna voluptate ipsum eu aute sit irure
                      irure reprehenderit deserunt elit.
                    </p>
                  </section>
                </Grid>
              </Grid>
            </Grid>
          </center>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(ContactUs));
