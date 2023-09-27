function getWeekNumber(date) {
    // Get the first day of the month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // Calculate the difference in days between the provided date and the first day of the month
    const dayDifference = date.getDate() - firstDayOfMonth.getDate();

    // Calculate the week number by dividing the day difference by 7 and rounding up
    const weekNumber = Math.ceil((dayDifference + 1) / 7);

    return weekNumber;
}

export default getWeekNumber;