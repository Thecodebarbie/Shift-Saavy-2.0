import React from 'react';
import Sidebar from '../components/Sidebar';
import Calender from '../components/Calender';

import dummyData from "../data/scheduleData.json"
import dayjs from 'dayjs';

import { useState } from 'react';

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
                            setDisplayedSchedule={setDisplayedSchedule}
                            setActiveDate={setActiveDate}
                        />
                        <div class="details">
                            <h1>Schedule for {activeDate}</h1>
                            {
                                displayedSchedule.map(data => {
                                    return (
                                        <div>
                                            <h2>{data.employee_id}</h2>
                                            {/* <p>{dayjs(data.start_time).format("MM-DD-YYYY")}</p> */}
                                            <p>{dayjs(data.start_time).format("ha")} - {dayjs(data.end_time).format("ha")}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Schedule;