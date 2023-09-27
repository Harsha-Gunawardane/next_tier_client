const getYearMonth = (dateString) => {


    const result = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(new Date(dateString)).toUpperCase();

    return result;
};

export default getYearMonth;