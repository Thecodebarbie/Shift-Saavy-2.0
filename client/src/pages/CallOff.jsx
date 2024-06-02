// src/pages/CallOff.jsx
import React from 'react';
import CalloffForm from '../components/CalloffForm';
import Sidebar from '../components/Sidebar';
import NotificationList from '../components/NotificationList';
import { useNotification } from '../context/NotificationContext';
import { useParams } from 'react-router-dom';
import CalloffList from '../components/CalloffList';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_CALLOFFS } from '../utils/queries';

function CallOff() {
  const { notifications, addNotification } = useNotification();
  const { id } = useParams();
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
        { id ?
       (<div className='col-9'>
          <CalloffForm addNotification={addNotification} />
          <NotificationList notifications={notifications} />
        </div>) : (
          <div className='col-9'>
          <CalloffList callofflist={callofflist} /> {/* Render the CalloffList component here */}
          
        </div>
        )}
      </div>
    </>
  );
}

export default CallOff;
