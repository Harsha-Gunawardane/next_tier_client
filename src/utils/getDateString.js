//get standard date string and return in format sep 1, 2021

const getDateString = (date) => {
    console.log(date)
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
};

export default getDateString;