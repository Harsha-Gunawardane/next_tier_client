const periodString = (period) => {
    //period = {days: 0, months: 0, years: 0}

    let verbalPeriod = '';
    let days = period.days;

    if (period.years > 0) {
        verbalPeriod += `${period.years} year${period.years > 1 ? 's' : ''} `;
    }

    if (period.months > 0) {
        verbalPeriod += `${period.months} month${period.months > 1 ? 's' : ''} `;
    }

    if (days >= 7) {
        const weeks = Math.floor(days / 7);
        verbalPeriod += `${weeks} week${weeks > 1 ? 's' : ''} `;
        days %= 7; // Remove weeks from days
    }

    if (days > 0) {
        verbalPeriod += `${days} day${days > 1 ? 's' : ''} `;
    }

    if (verbalPeriod.trim() === '') {
        verbalPeriod = 'No period';
    } else {
        // Remove the trailing space
        verbalPeriod = verbalPeriod.trim();
    }

    return verbalPeriod;


}

export default periodString