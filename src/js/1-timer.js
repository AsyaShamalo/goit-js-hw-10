import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  allowInput: false,
  clickOpens: true,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
        iziToast.error({
            message: "Please choose a date in the future",
            position: "topRight",
            closeOnClick: true,
        })
    
    } else {startBtn.disabled = false;}
  },
};

flatpickr('#datetime-picker', options);

let userSelectedDate;
let countdownInterval;

startBtn.disabled = true;

startBtn.addEventListener('click', (event) => {
  if (!userSelectedDate) return;
  event.preventDefault();

    startBtn.disabled = true;

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {

    dateInput.disabled = true;
    
    const dateNow = new Date();
    const delta = userSelectedDate - dateNow;

    if (delta <= 0) {
      clearInterval(countdownInterval);
      update(0);
      dateInput.disabled = false;
      return;
    }

    update(delta);
  }, 1000);
});

function update(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysSpan.innerHTML = pad(days);
  hoursSpan.innerHTML = pad(hours);
  minutesSpan.innerHTML = pad(minutes);
  secondsSpan.innerHTML = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}