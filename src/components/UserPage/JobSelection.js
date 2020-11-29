import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class JobSelection extends Component {
  componentDidMount() {}
  render() {
    return <di>hi</di>;
  }
}

export default connect(mapStoreToProps)(JobSelection);
