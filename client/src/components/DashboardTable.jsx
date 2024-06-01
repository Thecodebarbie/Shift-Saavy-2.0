import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function DashboardTable({ userSchedules }) {
    const navigate = useNavigate();
    const [activeDate, setActiveDate] = useState(dayjs().format("MMMM D YYYY"))
    //const [requestedCalloffs, setRequestedCalloffs] = useState([]);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return  dateObj.toLocaleDateString();// Example: "MM/DD/YYYY"
      };

      // Function to calculate total hours between two date strings
        const calculateTotalHours = (startTime, endTime) => {
        // Parse the date strings into Date objects
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
    
        // Calculate the time difference in milliseconds
        const timeDiff = endDate.getTime() - startDate.getTime();
    
        // Convert milliseconds to hours
        const totalHours = Math.abs(timeDiff / (1000 * 60 * 60));
    
        return totalHours.toFixed(2)+" hrs"; // Return total hours with two decimal places
    };

    const sumTotalHours = () => {
        let total = 0;
        // Select all elements with class 'total-hours' in the table
        const totalHourElements = document.querySelectorAll('.total-hours');
        // Iterate over each element and add its value to the total
        totalHourElements.forEach((element) => {
        total += parseFloat(element.textContent);
        });
        return total.toFixed(2)+" Hours"; // Return the total sum with two decimal places
    };

    const handleButtonClick = (id) => {
        // Add the ID of the schedule to requestedCalloffs array
        //setRequestedCalloffs([...requestedCalloffs, id]);
        // Navigate to the calloff page
        navigate(`/calloff/${id}`);
    };
      
    // Check if userSchedules array exists and has data
    const hasSchedules = userSchedules && userSchedules.length > 0;

    return (
<>
<section class="dashboard">
        <header class="top">
            <div class="search-box">
                <i class="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            

        </header>
    
        <main class="dash-content">
            <section class="overview">
                <header class="title">
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span class="text">Dashboard</span>
                </header>
    
                <div class="boxes">
                    <article class="box box1">
                        <i class="uil uil-thumbs-up"></i>
                        <span class="text">Next Shift</span>
                        <span class="number">{activeDate}</span>
                    </article>

                    
                    <article class="box box3">
                        <i class="uil uil-share"></i>
                        <span class="text">Time Card</span>
                        <span class="number">{sumTotalHours()}</span>

                    </article>
                </div>
            </section>
    
            <section class="activity">
                <header class="title">
                    <i class="uil uil-clock-three"></i>

                    <span class="text">Schedule Lists</span>
                </header>
    
                <div class="activity-data">
                    {/* Render table if userSchedules exist */}
                    {hasSchedules && (
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Total Hours</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userSchedules.map((schedule, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '20px' }}>{schedule.date}</td>
                                        <td style={{ padding: '20px' }}>{schedule.startTime}</td>
                                        <td style={{ padding: '20px' }}>{schedule.endTime}</td>
                                        <td style={{ padding: '20px' }} class="total-hours">{calculateTotalHours(schedule.startTime, schedule.endTime)}</td>
                                        <td style={{ padding: '20px' }}>
                                        {schedule.status === "Active" ? (
                                                        <button onClick={() => handleButtonClick(schedule._id)}>Calloff</button>
                                                    ) : (
                                                        <button disabled>Requested</button>
                                                    )}
                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {/* Display a message if no userSchedules */}
                    {!hasSchedules && <p>No schedules available.</p>}
                </div>
            </section>
        </main>
    </section>

</>
    );
}

export default DashboardTable;