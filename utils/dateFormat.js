var parseJSON = require('date-fns/parseJSON')
var format = require('date-fns/format')

function dateFormat(unformatedDate) {
    var parsedDate = (parseJSON(unformatedDate))
    return (format(parsedDate, 'yyyy-MM--dd'))
}

module.exports = dateFormat