
import Sidebar from '../components/Sidebar';
import DashboardTable from '../components/DashboardTable';

function Dashboard() {
  return (
    <div className='row'>
      <div className='col-3'>
      <Sidebar />
      </div>
      <div className='col-9'>
      <DashboardTable/>
      </div>


    </div>
  );
}

export default Dashboard;
