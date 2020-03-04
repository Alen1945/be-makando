const users = `
  CREATE TABLE IF NOT EXISTS users(
  _id int(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_admin  TINYINT(1) DEFAULT 0,
  is_superadmin   TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)
`
const userProfile = `
  CREATE TABLE IF NOT EXISTS userProfile(
    _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT(11) UNSIGNED NOT NULL,
    fullname VARCHAR(70) NULL,
    email VARCHAR(40) NULL,
    gender ENUM('male','female','other') DEFAULT 'other',
    address TEXT DEFAULT NULL,
    picture TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`
module.exports = [
  users,
  userProfile
]
