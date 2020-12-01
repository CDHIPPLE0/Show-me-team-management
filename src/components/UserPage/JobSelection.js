import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class JobSelection extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_JOBS',
    });
  }
  render() {
    return (
      <div className="table">
        <table className="statTable">
          <thead className="tableHead">
            <tr>
              <th>My Email</th>
              <th>My Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tdStyle"></tbody>
          {this.props.store.populateJobs.map((item, index) => (
            <tr>
              <td />
              <td />
              <td />
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JobSelection);
