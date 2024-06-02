import React from 'react';

const CalloffList = ({ callofflist }) => {
    return (
      <div>
        {callofflist.length > 0 ? (
          <div>
            <h2>Calloff List</h2>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Schedule Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {callofflist.map((calloff, index) => (
                  <tr key={index}>
                    <td>{calloff.firstname}</td>
                    <td>{calloff.lastname}</td>
                    <td>{calloff.scheduleDate}</td>
                    <td>{calloff.startTime}</td>
                    <td>{calloff.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Calloff entries available.</p>
        )}
      </div>
    );
  };
  

export default CalloffList;
