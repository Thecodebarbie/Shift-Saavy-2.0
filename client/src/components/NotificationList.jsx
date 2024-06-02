import React from 'react';

function NotificationList({ notifications }) {
    // Check if notifications is defined and is an array before mapping
    console.log(notifications)
    if (!notifications || !Array.isArray(notifications)) {
        return <p>No notifications available.</p>;
    }

    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index}>
                    {/* Render each notification */}
                    <p>{notification.message}</p> 
                </div>
            ))}
        </div>
    );
}

export default NotificationList;
