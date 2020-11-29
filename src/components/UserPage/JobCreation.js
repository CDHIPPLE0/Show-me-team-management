import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Select } from '@material-ui/core';

class JobCreation extends Component {
  componentDidMount() {}
  render() {
    return <di>hi</di>;
  }
}

export default connect(mapStoreToProps)(JobCreation);
