import React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import dummyData from "../data/scheduleData.json"
import { useQuery } from '@apollo/client';
import {QUERY_SCHEDULES_BY_DATE} from '../utils/queries';
import Details from '../components/Details'
function Calender({
    setDisplayedSchedule,
    setActiveDate,
    activeDate
}) {
    const {loading,data} = useQuery(QUERY_SCHEDULES_BY_DATE,{
        variables:{date:dayjs(activeDate).format('YYYY-MM-DD')}
    })
    const displayedSchedule = data?.getSchedulesByDate || []
    console.log(displayedSchedule)
    // let today = new Date();
    const [today, setToday] = useState(new Date())
    // let activeDay;
    const [activeDay, setActiveDay] = useState("");
    // let month = today.getMonth();
    const [month, setMonth] = useState(today.getMonth());
    // let year = today.getFullYear();
    const [year, setYear] = useState(today.getFullYear());
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const calendar = document.querySelector('.calendar');
    const date = document.querySelector('.date');
    // const prevBtn = document.querySelector('.prev');
    // const nextBtn = document.querySelector('.next');
    // const todayBtn = document.querySelector(".today-btn");
    const eventDay = document.querySelector(".event-day");
    const eventDate = document.querySelector(".event-date");
    useEffect(() => {
    const gotoBtn = document.querySelector(".goto-btn");
    const dateInput = document.querySelector(".date-input");
        dateInput.addEventListener("input", (e) => {
            dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
            if (dateInput.value.length === 2) {
                dateInput.value += "/";
            }
            if (dateInput.value.length > 7) {
                dateInput.value = dateInput.value.slice(0, 7);
            }
            if (e.inputType === "deleteContentBackward") {
                if (dateInput.value.length === 3) {
                    dateInput.value = dateInput.value.slice(0, 2);
                }
            }
        });
        gotoBtn.addEventListener("click", gotoDate);
        initCalendar();
    }, [])
    function addListener() {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
            day.addEventListener("click", (e) => {
                getActiveDay(e.target.innerHTML);
                updateSchedule(Number(e.target.innerHTML));
                // activeDay = Number(e.target.innerHTML);
                setActiveDay(Number(e.target.innerHTML));
                //remove active
                days.forEach((day) => {
                    day.classList.remove("active");
                });
                //if clicked prev-date or next-date switch to that month
                if (e.target.classList.contains("prev-date")) {
                    prevMonth();
                    //add active to clicked day after month is changed
                    setTimeout(() => {
                        //add active where no prev-date or next-date
                        const days = document.querySelectorAll(".day");
                        days.forEach((day) => {
                            if (
                                !day.classList.contains("prev-date") &&
                                day.innerHTML === e.target.innerHTML
                            ) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else if (e.target.classList.contains("next-date")) {
                    nextMonth();
                    //add active to clicked day after month is changed
                    setTimeout(() => {
                        const days = document.querySelectorAll(".day");
                        days.forEach((day) => {
                            if (
                                !day.classList.contains("next-date") &&
                                day.innerHTML === e.target.innerHTML
                            ) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else {
                    e.target.classList.add("active");
                }
            });
        });
    }
    function gotoDate() {
        console.log("here");
        const dateArr = dateInput.value.split("/");
        if (dateArr.length === 2) {
            if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
                // month = dateArr[0] - 1;
                setMonth(dateArr[0] - 1)
                // year = dateArr[1];
                setYear(dateArr[1])
                initCalendar();
                return;
            }
        }
        alert("Invalid Date");
    }
    //function get active day name and date
    function getActiveDay(date) {
        const day = new Date(year, month, date);
        const dayName = day.toString().split(" ")[0];
        // eventDay.innerHTML = dayName;
        // eventDate.innerHTML = date + " " + months[month] + " " + year;
    }
    //function to update schedule when a day is active
    async function updateSchedule(date) {
        let schedule = "";
        try {
            setActiveDate(`${months[month]} ${date} ${year}`);
            // setDisplayedSchedule(dummyData.filter(data => {
            //     // console.log(dayjs(data.start_time).format("MMMM D YYYY"));
            //     // console.log(`${months[month]} ${date} ${year}`)
            //     const thisDate = dayjs(data.start_time).format("MMMM D YYYY");
            //     const selectedDate = `${months[month]} ${date} ${year}`
            //     return (thisDate == selectedDate)
            // }))
            // setActiveDate(dayjs(date).format("MM-DD-YYYY"))
            // console.log(activeDate)
            //     const response = await fetch(`/api/schedules?day=${date}&month=${month + 1}&year=${year}`);
            //     const data = await response.json();
            //     if (data.schedules.length > 0) {
            //         data.schedules.forEach((scheduleItem) => {
            //             schedule += `<div class="schedule">
            //         <div class="title">
            //             <i class="fas fa-circle"></i>
            //             <h3 class="schedule-title">${scheduleItem.title}</h3>
            //         </div>
            //         <div class="schedule-time">
            //             <span class="schedule-time">${scheduleItem.time}</span>
            //         </div>
            //     </div>`;
            //         });
            //     } else {
            //         schedule = `<div class="no-schedule">
            //     <h3>No Schedule</h3>
            // </div>`;
            // }
        } catch (error) {
            console.error("Error fetching schedules:", error);
            //         schedule = `<div class="no-schedule">
            //     <h3>Error loading schedules</h3>
            // </div>`;
        }
        // const eventsContainer = document.querySelector(".events");
        // eventsContainer.innerHTML = schedule;
    }
    function initCalendar() {
        const date = document.querySelector('.date');
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;
        date.innerHTML = months[month] + " " + year;
        let days = "";
        // Days from the previous month
        for (let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }
        // Current month days
        for (let i = 1; i <= lastDate; i++) {
            if (
                i === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth()
            ) {
                // activeDay = i;
                setActiveDay(i)
                getActiveDay(i);
                updateSchedule(i);
                days += `<div class="day today active">${i}</div>`;
            } else {
                days += `<div class="day">${i}</div>`;
            }
        }
        // Next month days
        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date">${j}</div>`;
        }
    const daysContainer = document.querySelector('.days');
        daysContainer.innerHTML = days;
        addListener();
    }
    //function to add month and year on prev and next button
    function prevMonth() {
        // month--;
        setMonth(month-1)
        if (month < 0) {
            // month = 11;
            setMonth(11)
            // year--;
            setYear(year-1)
        }
        initCalendar();
    }
    function nextMonth() {
        // month++;
        setMonth(month+1)
        if (month > 11) {
            // month = 0;
            setMonth(0)
            // year++;
            setYear(year + 1)
        }
        initCalendar();
    }
    return (
        <>
            <section class="left">
                <article class="calendar">
                    <header class="month">
                        <i class="fas fa-angle-left prev" onClick={prevMonth}></i>
                        <h2 class="date">December 2022</h2>
                        <i class="fas fa-angle-right next" onClick={nextMonth}></i>
                    </header>
                    <nav class="weekdays">
                        <label>Sun</label>
                        <label>Mon</label>
                        <label>Tue</label>
                        <label>Wed</label>
                        <label>Thu</label>
                        <label>Fri</label>
                        <label>Sat</label>
                    </nav>
                    <section class="days"></section>
                    <footer class="goto-today">
                        <div class="goto">
                            <input type="text" placeholder="mm/yyyy" class="date-input" />
                            <button class="goto-btn">Go</button>
                        </div>
                        <button class="today-btn" onClick={() => {
                            setToday(new Date());
                            // month = today.getMonth();
                            setMonth(today.getMonth())
                            // year = today.getFullYear();
                            setYear(today.getFullYear())
                            initCalendar();
                        }}>Today</button>
                    </footer>
                </article>
            </section>
            <Details displayedSchedule = {displayedSchedule} activeDate={activeDate}/>
        </>
    );
}
export default Calender;
