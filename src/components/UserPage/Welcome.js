import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Welcome extends Component {
  render() {
    {
      return this.props.store.user.access_level_id > 1 ? (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr className="inTheGreen">
                {this.props.store.user.access_level_id <= 2 ? (
                  <th className="welcome">
                    Welcome to Show Me Team Management, you will receive
                    information via text. Feel free to update your information
                    as needed.
                  </th>
                ) : (
                  <th className="welcome">
                    Welcome to Show Me Team Management please select your task
                    from the side menu
                  </th>
                )}
              </tr>
            </thead>
          </table>
        </div>
      ) : (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr className="inTheRed">
                <th className="welcome">
                  Your Account is awaiting verification
                </th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}
export default connect(mapStoreToProps)(Welcome);
