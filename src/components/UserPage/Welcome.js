import React from 'react';

export default function Welcome(props) {
  return (
    <div className="table">
      <table className="statTable">
        <thead className="tableHead">
          <tr className="inTheGreen">
            {props.accessLevel === 2 ? (
              <th className="welcome">
                Welcome to Show Me Team Management, you will receive information
                via text. Feel free to update your information as needed.
              </th>
            ) : (
              <th className="welcome">
                Welcome to Show Me Team Management please select your task from
                the side menu
              </th>
            )}
          </tr>
        </thead>
      </table>
    </div>
  );
}
