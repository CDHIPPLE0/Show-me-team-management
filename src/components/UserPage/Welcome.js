import React from 'react';

export default function Welcome(props) {
  return (
    <div className="table">
      <table className="statTable">
        <thead className="tableHead">
          <tr className="inTheGreen">
            {props.accessLevel == 2 || 1 ? (
              <th className="welcome">
                Welcome to Show Me Team Management please select your task from
                the side menu.
              </th>
            ) : (
              <th className="welcome">
                Welcome to Show Me Team Management, you will receive job offers
                via text. Feel free to edit your profile as needed.
              </th>
            )}
          </tr>
        </thead>
      </table>
    </div>
  );
}
