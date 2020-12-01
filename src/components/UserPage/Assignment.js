import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class Assignment extends Component {
  sendToParent = (id) => (event) => {
    this.props.callBack(id);
  };

  selectSubcontractor() {
    console.log('hi');
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_AVAILABLE',
    });
    console.log(this.props.store);
  }
  render() {
    {
      if (this.props.store.availableSubcontractors.length > 0) {
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
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.store.availableSubcontractors.map((item, index) => (
                  <tr index={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.job_title}</td>
                    <td>{item.osha_level}</td>
                    <td>{item.certifications}</td>
                    <td>{item.address}</td>
                    <td>
                      <Button onClick={this.selectSubcontractor(item.id)}>
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return <p>loading..</p>;
      }
    }
  }
}

export default connect(mapStoreToProps)(Assignment);
