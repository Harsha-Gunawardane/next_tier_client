// function to get the day with input { days: 0, years: 0, months: 0 }  starting from today

export default function calculateUntilDate({ days = 0, years = 0, months = 0 }) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);
    return date;
}