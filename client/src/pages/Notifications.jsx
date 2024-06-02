import React from 'react';
import NotificationList from '../components/NotificationList';
import { useNotification } from '../context/NotificationContext';
import Sidebar from '../components/Sidebar';
function Notifications() {
  const { notifications } = useNotification();
  console.log("Notifications component received notifications:", notifications);
  return (
    <div className="notification-page">
      <Sidebar/>
      <h2>Notifications</h2>
      <NotificationList notifications={notifications} />
    </div>
  );
}

export default Notifications;
