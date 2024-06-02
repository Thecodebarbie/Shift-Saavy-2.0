import React from 'react';

function NotificationList({ notifications }) {
    console.log("NotificationList received notifications:", notifications);

    if (!notifications || !Array.isArray(notifications) || notifications.length === 0) {
        return <p>No notifications available.</p>;
    }

    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index}>
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    );
}

export default NotificationList;
