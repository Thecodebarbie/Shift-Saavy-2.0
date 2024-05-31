import React from 'react';
import Sidebar from '../components/Sidebar';
import Calender from '../components/Calender';
import dummyData from "../data/scheduleData.json"
import dayjs from 'dayjs';
import details from '../components/Details'
import { useState } from 'react';
import Details from '../components/Details';
function Schedule(props) {
    const [activeDate, setActiveDate] = useState(dayjs().format("MMMM D YYYY"))
    const [displayedSchedule, setDisplayedSchedule] = useState(dummyData)
    return (
        <>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <main class="container">
                        <Calender
                            activeDate={activeDate}
                            setDisplayedSchedule={setDisplayedSchedule}
                            setActiveDate={setActiveDate}
                        />
                    </main>
                </div>
            </div>
        </>
    );
}
export default Schedule;