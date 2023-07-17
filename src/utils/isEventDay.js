
const isEventDay = (day, eventDays) => {
    return eventDays.some((eventDay) => {
        return day.getTime() === eventDay.getTime();
    });
};

export default isEventDay;