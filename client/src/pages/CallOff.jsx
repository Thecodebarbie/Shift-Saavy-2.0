import React from 'react';
import CalloffForm from '../components/CalloffForm';
import Sidebar from '../components/Sidebar';
function CallOff(props) {
    return (
        <>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <CalloffForm />
                </div>
            </div>

        </>
    );
}

export default CallOff;