export const today = new Date()

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const dayName = days[today.getDay()]
export const date = today.getDate()
export const monthName = months[today.getMonth()]
export const year = today.getFullYear()

//  helper to format any date correctly as YYYY-MM-DD
function formatDate(dateObj) {
    const y = dateObj.getFullYear()
    const m = String(dateObj.getMonth() + 1).padStart(2, '0')
    const d = String(dateObj.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

function getNextDate(daysToAdd) {
    const day = new Date(today)
    day.setDate(today.getDate() + daysToAdd)
    return day
}

export const fullDate = formatDate(today)

export const secondDate = getNextDate(1)
export const secondDay = formatDate(secondDate)

export const thirdDate = getNextDate(2)
export const thirdDay = formatDate(thirdDate)

export const fourthDate = getNextDate(3)
export const fourthDay = formatDate(fourthDate)

export const fifthDate = getNextDate(4)
export const fifthDay = formatDate(fifthDate)

export const sixthDate = getNextDate(5)
export const sixthDay = formatDate(sixthDate)
