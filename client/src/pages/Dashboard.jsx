
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_SCHEDULES } from '../utils/queries';


import Sidebar from '../components/Sidebar';
import DashboardTable from '../components/DashboardTable';

function Dashboard() {

  // Query to get the current user's information
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);

  // Query to get the schedules for the current user
  const { loading: schedulesLoading, error: schedulesError, data: schedulesData } = useQuery(QUERY_USER_SCHEDULES, {
    variables: { user: meData?.me._id } // Pass the user ID as a variable
  });

  // Handle loading and error states for both queries
  if (meLoading || schedulesLoading) return <p>Loading...</p>;
  if (meError) return <p>Error fetching user data: {meError.message}</p>;
  if (schedulesError) return <p>Error fetching user schedules: {schedulesError.message}</p>;

  // Extract necessary data from the queries
  //const userData = meData.me;
  const userSchedules = schedulesData.userSchedules;
  console.log(userSchedules)


  return (
    <div className='row'>
      <div className='col-3'>
      <Sidebar />
      </div>
      <div className='col-9'>

      <DashboardTable userSchedules={userSchedules}/>
      </div>



    </div>
  );
}

export default Dashboard;
