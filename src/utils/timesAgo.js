export default function generateTimeAgoString(datetime) {
    const timestamp = new Date(datetime).getTime() / 1000;
    console.log(datetime);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDiff = currentTime - timestamp;

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;

    let timeAgo;
    //upto years
    if (timeDiff < minute) {
        timeAgo = 'just now';
    } else if (timeDiff < hour) {
        const minutesAgo = Math.floor(timeDiff / minute);
        timeAgo = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff < day) {
        const hoursAgo = Math.floor(timeDiff / hour);
        timeAgo = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff < week) {
        const daysAgo = Math.floor(timeDiff / day);
        timeAgo = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff < month) {
        const weeksAgo = Math.floor(timeDiff / week);
        timeAgo = `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff > month && timeDiff < year) {
        const monthsAgo = Math.floor(timeDiff / month);
        timeAgo = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff > year) {
        const yearsAgo = Math.floor(timeDiff / year);
        timeAgo = `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    } else {
        timeAgo = 'just now bla bla' + timeDiff + ' ' + timestamp + ' ' + currentTime;
    }

    return timeAgo;
}