function addHoursToDate(dateString, hoursToAdd) {
    const date = new Date(dateString); // Parse the date string into a Date object

    // Add the specified number of hours
    date.setHours(date.getHours() + hoursToAdd);

    return date;
}

function formatDate(dateString) {
    const date = addHoursToDate(dateString, 0); // Parse the date string into a Date object

    const day = String(date.getDate()).padStart(2, '0'); // Get the day, pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed, so add 1)
    const year = date.getFullYear(); // Get the full year

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes, pad with 0 if needed

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set to 12

    const formattedDate = `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return formattedDate;
}

// const dateString = "2024-11-01T07:25:42.096Z";
// console.log(formatDate(dateString));

export default formatDate