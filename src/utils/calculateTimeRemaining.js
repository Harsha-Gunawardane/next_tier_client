// function to calculate the time remaining from todya to the inputed date string
//returns a string of the time remaining in the format 1 day 5hours remaining or 1 month 2 days remaining


export default function calculateTimeRemaining(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    const timeDiff = date.getTime() - today.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (days > 0) {
        return `${days} d ${hours} h`;
    } else if (hours > 0) {
        return `${hours} h ${minutes} min`;
    } else if (minutes > 0) {
        return `${minutes} m ${seconds} s`;
    } else if (seconds > 0) {
        return `${seconds} s`;
    } else {
        return `Expired`;
    }
}