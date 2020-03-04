const restaurants = `
  CREATE TABLE IF NOT EXISTS restaurants(
  _id int(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  id_owner INT(11) UNSIGNED NOT NULL,
  name VARCHAR(40) NOT NULL,
  logo TEXT,
  addres TEXT,
  description TEXT,
  created_by INT(11) UNSIGNED,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  upated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)
`
module.exports = [
  restaurants
]
