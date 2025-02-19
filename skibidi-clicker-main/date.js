function parseTime(milliseconds) {
    let years = Math.floor(milliseconds / (365*24*60*60*1000));
    let days = Math.floor(milliseconds / (24*60*60*1000) - 365 * years)
    let hours = Math.floor(milliseconds / (60*60*1000) - 365*24 * years - 24 * days)
    let minutes = Math.floor(milliseconds / (60*1000) - 365*24*60 * years - 24*60 * days - 60 * hours)
    let seconds = Math.floor(milliseconds / 1000 - 365*24*60*60 * years - 24*60*60 * days - 60*60 * hours - 60 * minutes)

    let string = ''
}