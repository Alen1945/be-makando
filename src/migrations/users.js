const users = `
  CREATE TABLE IF NOT EXISTS users(
  _id int(11) PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_admin  TINYINT(1) DEFAULT 0,
  is_superadmin   TINYINT(1) DEFAULT 0
)
`
const userProfile = `
  CREATE TABLE IF NOT EXISTS usersProfile(
    _id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_user INT(11) FOREIGN KEY REFERENCES users(_id)
    fullname VARCHAR(70) NOT NULL
    email VARCHAR(40) NOT NULL,
    gender ENUM('male','female','other') DEFAULT 'other',
    address TEXT DEFAULT NULL,
    picture TEXT DEFAULT NULL
  )
`
module.exports = [
  users,
  userProfile
]
