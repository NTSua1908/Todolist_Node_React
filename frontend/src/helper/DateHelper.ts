export function formatDateToStringDay(date: Date): string {
    const dateObject = typeof date === "string" ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const dateString = dateObject.toLocaleDateString(undefined, options);

    return dateString;
}
