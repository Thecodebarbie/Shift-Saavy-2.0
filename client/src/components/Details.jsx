import React from 'react';
import dayjs from 'dayjs';

function Details({displayedSchedule, activeDate}) {
    return (
        <>
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
        </>
    );
}

export default Details;