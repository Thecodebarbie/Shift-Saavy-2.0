import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_CALLOFFS } from '../utils/queries';
import NotificationList from '../components/NotificationList';
import Sidebar from '../components/Sidebar';

function Notifications() {
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading, error, data, refetch } = useQuery(QUERY_USER_CALLOFFS, {
    variables: { userId: meData?.me?._id },
  });

  const [callofflist, setCalloffList] = useState([]);

  useEffect(() => {
    if (data && data.userCalloffs) {
      setCalloffList(data.userCalloffs);
    }
  }, [data]);

  if (loading || meLoading) return <p>Loading...</p>;
  if (error || meError) return <p>Error: {error ? error.message : meError.message}</p>;

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <NotificationList callofflist={callofflist} setCalloffList={setCalloffList} />
        </div>
      </div>
    </>
  );
}

export default Notifications;
