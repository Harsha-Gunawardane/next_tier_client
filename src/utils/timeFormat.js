export default function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Create the formatted time string
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (remainingMinutes > 0) {
    formattedTime += `${remainingMinutes}min`;
  }

  return formattedTime.trim();
}
