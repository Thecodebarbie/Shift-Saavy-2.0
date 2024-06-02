import React from 'react';
import dayjs from 'dayjs';

function Details({displayedSchedule, activeDate}) {
    console.log(displayedSchedule)
    return (
        <>
            <div class="details">
                <h1>Schedule for {activeDate}</h1>
                {
                    displayedSchedule.map(data => {
                        return (
                            <div>
                                <h2>{data.user.firstname}{data.user.lastname}</h2>
                                {/* <p>{dayjs(data.start_time).format("MM-DD-YYYY")}</p> */}
                                <p>{dayjs(data.startTime).format("ha")} - {dayjs(data.endTime).format("ha")}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Details;