const formattingMismatch = '*!!' 
//Sometimes you might want to allow certain formatting exceptions at least temporarily. If so, set a short unique string here that can be used to mark these exceptions so they can all easily be reviewed and standardized when needed.

const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
}


module.exports = {
    bad: formattingMismatch,
    months,
}