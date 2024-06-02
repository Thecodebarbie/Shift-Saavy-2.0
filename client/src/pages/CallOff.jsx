import React, { useState } from 'react';
import NotificationList from '../components/NotificationList';
import CalloffForm from '../components/CalloffForm';
import Sidebar from '../components/Sidebar';

function CallOff(props) {
    const [notifications, setNotifications] = useState([]);
    const addNotification = (message) => {
      setNotifications([...notifications, message]);
    };

    return (
        <>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <CalloffForm addNotification={addNotification} />
                    <NotificationList notifications={notifications} />
                </div>
            </div>

        </>
    ); 
}

export default CallOff;

