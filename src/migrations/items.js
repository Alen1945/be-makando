const categoryT = `
  CREATE TABLE IF NOT EXISTS itemCategories(
    _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name varchar(20) NOT NULL
  )
`

const itemsT = `
  CREATE TABLE IF NOT EXISTS items(
  _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  id_restaurant INT(11) UNSIGNED NOT NULL ,
  id_category INT(11) UNSIGNED NOT NULL,
  name VARCHAR(60) NOT NULL,
  price DECIMAL(10,2) UNSIGNED NOT NULL,
  description TEXT,
  images TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)
`
const itemF = `
  ALTER TABLE items
  DROP CONSTRAINT IF EXISTS FK_Restaurant,
  DROP CONSTRAINT IF EXISTS FK_Category;
  ALTER TABLE items
  ADD CONSTRAINT FK_Restaurant
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(_id)
    ON DELETE NO ACTION,
  ADD CONSTRAINT FK_Category
    FOREIGN KEY (id_category) REFERENCES itemCategories(_id)
    ON DELETE NO ACTION
`
exports.queryTable = [
  categoryT,
  itemsT
]
exports.queryForeign = [
  itemF
]
