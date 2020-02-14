const datePickerElement = document.querySelector('.date-picker');
const selectedDateElement = document.querySelector('.date-picker .selected-date');
const datesElement = document.querySelector('.date-picker .dates');
const mthElement = document.querySelector('.date-picker .dates .month .mth');
const nextMthElement = document.querySelector('.date-picker .dates .month .next-mth');
const prevMthElement = document.querySelector('.date-picker .dates .month .prev-mth');
const daysElement = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];

let date = new Date();

let today = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mthElement.textContent = months[month] + ' ' + year;
selectedDateElement.textContent = format_date(date);
populate_dates(month, year);

// event listeners
datePickerElement.addEventListener('click', toggle_date_picker);
nextMthElement.addEventListener('click', go_to_next_month);
prevMthElement.addEventListener('click', go_to_prev_month);

// functions
function toggle_date_picker(e) {
    path = e.path || (e.composedPath && e.composedPath());
    if (!check_event_path_for_class(path, 'dates')) {
        datesElement.classList.toggle('active');
    }
}

function go_to_next_month(e) {
    ++month;
    if (month > 11) {
        month = 0;
        ++year;
    }
    mthElement.textContent = months[month] + ' ' + year;
    populate_dates(month, year);
}

function go_to_prev_month(e) {
    --month;
    if (month < 0) {
        month = 11;
        --year;
    }
    mthElement.textContent = months[month] + ' ' + year;
    populate_dates(month, year);
}

function days_in_month (month, year) { 
    return new Date(year, month, 0).getDate(); 
}

function first_day_of_the_month(month, year) {
    return new Date(year, month, 0).getDay();
}

function populate_dates(month, year) {
    daysElement.innerHTML = '';

    numberOfSpaces = first_day_of_the_month(month, year);
    for (let i = 0; i < numberOfSpaces; ++i) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('space');
        dayElement.textContent = ' ';
        daysElement.appendChild(dayElement);
    }

    amountOfDays = days_in_month(month + 1, year);

    for (let i = 0; i < amountOfDays; ++i) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i + 1;

        if (today == (i + 1) && currentYear == year && currentMonth == month) {
            dayElement.classList.add('today');
        }

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', function () {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;
            selectedDateElement.textContent = format_date(selectedDate);
            selectedDateElement.dataset.value = selectedDate;

            populate_dates(month, year);
        });
        daysElement.appendChild(dayElement);
    }
}

//helper functions
function check_event_path_for_class(path, selector) {
    for (let i = 0; i < path.length; ++i) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function format_date(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + '/' + month + '/' + year;
}