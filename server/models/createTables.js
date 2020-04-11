import pool from "../config/dbConfig";

const table = `DROP TABLE IF EXISTS users,stories CASCADE;
    CREATE TABLE users (
      userid UUID PRIMARY KEY,
      firstname VARCHAR(40) NOT NULL,
      lastname VARCHAR(40) NOT NULL,
      email TEXT UNIQUE,
      password TEXT ,
      role VARCHAR(40) default 'client',
      status VARCHAR(20) default 'active',
      googleid VARCHAR(100),
      facebookid VARCHAR(100),
      image VARCHAR(100)
    );
    insert into users values ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','kabundege','kwizera','kabundege2@outlook.com','$2a$10$pVqBtKRnH9QSsblCCPIK4uyWstH8EupqTDAhQStzw/q4S7OHUhAFK','admin','active',' ',' ');
    CREATE TABLE stories (
      storyid UUID NOT NULL PRIMARY KEY,
      createdon TIMESTAMP DEFAULT NOW(),
      ownerId UUID NOT NULL,
      owner VARCHAR(60) NOT NULL,
      title VARCHAR(40) NOT NULL,
      share VARCHAR(20) NOT NULL,
      content VARCHAR(500) NOT NULL,
      FOREIGN KEY (ownerId) REFERENCES users(userid) ON DELETE CASCADE
    );`;
const createTable = async () => {
  try {
    await pool.query(table);
    console.log('Development Tables created');
  } catch (err) {
    console.log(err);
  }
};

createTable();

export default createTable;
