// when date-fns fails, use this
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const getDayWithSuffix = (day: number) => 
{
    if (day >= 11 && day <= 13) 
    {
        return day + 'th'
    }
    switch (day % 10) 
    {
        case 1:
            return day + 'st'
        case 2:
            return day + 'nd'
        case 3:
            return day + 'rd'
        default:
            return day + 'th'
    }
}

export const prettyDate = (date: Date): string => 
{
    const dayOfWeek = daysOfWeek[date.getDay()]
    const dayOfMonth = date.getDate()
    const monthName = months[date.getMonth()]
    const formattedDayOfMonth = getDayWithSuffix(dayOfMonth)

    return `${dayOfWeek}, ${formattedDayOfMonth} ${monthName} ${date.getFullYear()}`
}