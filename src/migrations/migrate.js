
/* Add All Query to Create Tables Into Array */

module.exports = {
  table: [
    ...require('./users').queryTable,
    ...require('./restaurants').queryTable
  ],
  foreign: [
    ...require('./users').queryForeign,
    ...require('./restaurants').queryForeign
  ]
}
