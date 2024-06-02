import React from 'react';

const NotificationList = ({ callofflist }) => {
    console.log(callofflist)
    return (
      <div>
        {callofflist.length > 0 ? (
          <div>
            <h2>Notifications</h2>
            <table>
              
              <tbody>
                {callofflist.map((calloff, index) => (
                  <tr key={index}>
                    <td>Calloff has been created for schedule (ID: {calloff.scheduleId})</td>
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
  

export default NotificationList;
