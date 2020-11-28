import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../UserPage/UserPage.css';
import AppNav from '../Nav/AppNav';
import SideBar from './SideBar';

class UserPage extends Component {
  state = {
    access_level: 0,
    selection: 0,
  };

  handleClick = (event) => {
    this.setState({
      ...this.state,
      selection: event.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    return (
      <>
        <AppNav props={this.props} />
        <div className="userPage">
          <SideBar handleClick={this.handleClick} />
          {this.state.access_level === 4 && (
            <div className="table">
              <table className="statTable">
                <thead className="tableHead">
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Jobs Owned</th>
                    <th>Status</th>
                    <th>Comments</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="tdStyle">
                  <tr>
                    <td>Hal Todd</td>
                  </tr>
                  <tr>
                    <td>Bill Ben</td>
                  </tr>
                  <tr>
                    <td>Bill Ben</td>
                  </tr>
                  <tr>
                    <td>Bill Ben</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {this.state.access_level === 3 && (
            <div className="userPage">
              <p>Subcontractor</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
