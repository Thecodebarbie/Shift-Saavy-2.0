import React from 'react';
import NotificationList from '../components/NotificationList';


function Notifications ({ notifications }) {
  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Notifications;
