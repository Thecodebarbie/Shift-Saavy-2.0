import React from 'react';
import NotificationList from '../components/NotificationList';
import { useNotification } from '../context/NotificationContext';
import Sidebar from '../components/Sidebar';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_CALLOFFS } from '../utils/queries';
function Notifications() {
  //const { notifications } = useNotification();
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading, error, data } = useQuery(QUERY_USER_CALLOFFS, {
    variables: { userId: meData?.me._id },
  });
  const callofflist = data ? data.userCalloffs : [];

    return (
    <>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
       
          <div className='col-9'>
          <NotificationList callofflist={callofflist} /> {/* Render the CalloffList component here */}
          
        </div>
        
      </div>
    </>
  );
}

export default Notifications;
