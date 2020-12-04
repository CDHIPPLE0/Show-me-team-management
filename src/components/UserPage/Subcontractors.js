import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Subcontractors extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUBCONTRACTORS',
    });
    console.log(this.props.store.Subcontractors.allSubcontractors);
  }

  render() {
    if (this.props.store.Subcontractors.allSubcontractors.length !== 0) {
      return (
        <div className="table">
          <table className="statTable">
            <thead className="tableHead">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Job Title</th>
                <th>Osha Level</th>
                <th>Certifications</th>
                <th>
                  {JSON.stringify(
                    this.props.store.Subcontractors.allSubcontractors
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {this.props.store.Subcontractors.allSubcontractors.map(
                (item, index) => (
                  <tr index={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.company}</td>
                    <td>
                      <Button color="secondary">Remove</Button>
                    </td>
                  </tr>
                )
              )} */}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <center>loading...</center>;
    }
  }
}

export default connect(mapStoreToProps)(Subcontractors);
