import React from 'react';
import Sidebar from '../components/Sidebar';
import Calender from '../components/Calender';

import dummyData from "../data/scheduleData.json"

import dayjs from 'dayjs';

function Schedule(props) {
    return (
        <>
            <Sidebar />
            <main class="container">
                <Calender />

                <div class="details">

                    {
                        dummyData.map(data => {
                            return (
                                <div>
                                    <h2>{data.employee_id}</h2>
                                    <p>{dayjs(data.start_time).format("ha")} - {dayjs(data.end_time).format("ha")}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </>
    );
}

export default Schedule;