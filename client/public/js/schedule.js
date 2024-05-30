const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");

document.addEventListener("DOMContentLoaded", function() {
  // Check if the current page is the schedule page
//   if (window.location.pathname === "/schedule") {
      // Load the calendar for the current date
      initCalendar();
//   }
});

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function initCalendar() {
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
            activeDay = i;
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
    daysContainer.innerHTML = days;
    addListener();
}

//function to add month and year on prev and next button
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prevBtn.addEventListener("click", prevMonth);
nextBtn.addEventListener("click", nextMonth);



//function to add active on day
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            getActiveDay(e.target.innerHTML);
            updateSchedule(Number(e.target.innerHTML));
            activeDay = Number(e.target.innerHTML);
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

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

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

function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
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
        const response = await fetch(`/api/schedules?day=${date}&month=${month + 1}&year=${year}`);
        const data = await response.json();

        if (data.schedules.length > 0) {
            data.schedules.forEach((scheduleItem) => {
                schedule += `<div class="schedule">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="schedule-title">${scheduleItem.title}</h3>
                    </div>
                    <div class="schedule-time">
                        <span class="schedule-time">${scheduleItem.time}</span>
                    </div>
                </div>`;
            });
        } else {
            schedule = `<div class="no-schedule">
                <h3>No Schedule</h3>
            </div>`;
        }
    } catch (error) {
        console.error("Error fetching schedules:", error);
        schedule = `<div class="no-schedule">
            <h3>Error loading schedules</h3>
        </div>`;
    }

    eventsContainer.innerHTML = schedule;
}

