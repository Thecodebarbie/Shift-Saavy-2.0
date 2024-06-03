import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_CALLOFF } from '../utils/mutations';
import { QUERY_ME, QUERY_USER_CALLOFFS } from '../utils/queries';
import NotificationList from '../components/NotificationList';
import Sidebar from '../components/Sidebar';

function Notifications() {
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading, error, data, refetch } = useQuery(QUERY_USER_CALLOFFS, {
    variables: { userId: meData?.me._id },
  });
  const [callofflist, setCalloffList] = useState([]);

  useEffect(() => {
    if (data) {
      setCalloffList(data.userCalloffs);
    }
  }, [data]);

  const [deleteCalloff] = useMutation(REMOVE_CALLOFF);

  const handleDeleteCalloff = async (calloffId) => {
    try {
      await deleteCalloff({ variables: { removeCalloffId: calloffId } });
      console.log("Successfully removed the calloff with ID:", calloffId);
      // Remove the deleted calloff from the list
      setCalloffList(callofflist.filter(calloff => calloff._id !== calloffId));
    } catch (error) {
      console.error('Failed to delete calloff:', error);
    }
  };

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <NotificationList callofflist={callofflist} onUpdateCalloffList={handleDeleteCalloff} />
        </div>
      </div>
    </>
  );
}

export default Notifications;
