// src/pages/CallOff.jsx
import React from 'react';
import CalloffForm from '../components/CalloffForm';
import Sidebar from '../components/Sidebar';
import NotificationList from '../components/NotificationList';
import { useNotification } from '../context/NotificationContext';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_CALLOFFS } from '../utils/queries';

function CallOff() {
  const {  addNotification } = useNotification();

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <CalloffForm addNotification={addNotification} />
        </div>
         
      </div>
    </>
  );
}

export default CallOff;
