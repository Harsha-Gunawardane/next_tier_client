export default function dateText(date) {
    {/* make the date in the format 12/3/2023 into MAR 12 format */ }
    var dateText = date.split("/");
    var month = dateText[0];
    var day = dateText[1];
    var year = dateText[2];
    var monthText = "";

    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    monthText = monthList[month - 1];

    return monthText + " " + day;
}