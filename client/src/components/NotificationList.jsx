import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_CALLOFF } from '../utils/mutations';

const NotificationList = ({ callofflist, setCalloffList }) => {
  const [removeCalloff] = useMutation(REMOVE_CALLOFF);

  const handleDelete = async (calloffId) => {
    try {
      await removeCalloff({ variables: { removeCalloffId: calloffId } });
      console.log("Successfully removed the calloff with ID:", calloffId);
      // Update calloff list by filtering out the deleted calloff
      const updatedCalloffList = callofflist.filter(calloff => calloff._id !== calloffId);
      setCalloffList(updatedCalloffList);
    } catch (error) {
      console.error('Failed to delete calloff:', error);
    }
  };

  return (
    <div class="containers">
      {callofflist.length > 0 ? (
        <div>
          <h2 class="notif-heading">Notifications</h2>
          <table >
            <tbody class="notif">
              {callofflist.map((calloff, index) => (
                <tr key={index}>
                  <td class="notif-txt">Calloff has been created for schedule (ID: {calloff.scheduleId})</td>
                  <td class="notif-delete">
                    <button class="glass-button" onClick={() => handleDelete(calloff._id)}>Delete</button>
                  </td>
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
