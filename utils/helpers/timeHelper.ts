// when date-fns fails, use this
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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

export const formatMinutesToHoursAndMinutes = (minutes: number) =>
{
    if (isNaN(minutes) || minutes < 0)
    {
        return '-'
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const hoursText = hours > 0 ? `${hours} hr` : ''
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes} min` : ''

    // Combine hours and minutes with 'and' if both are present
    if (hoursText && minutesText)
    {
        return `${hoursText} ${minutesText}`
    }
    else
    {
        return hoursText + minutesText
    }
}