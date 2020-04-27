import pool from "../config/dbConfig";

const table = `CREATE TABLE IF NOT EXISTS users (
        userid UUID PRIMARY KEY,
        firstname VARCHAR(40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        email TEXT UNIQUE,
        password TEXT,
        image VARCHAR(100),
        isVerified boolean,
        role VARCHAR(40) default 'client',
        status VARCHAR(20) default 'active',
        googleid VARCHAR(100),
        facebookid VARCHAR(100),
        image VARCHAR(100)
      );
      insert into users values ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','kabundege','kwizera','kabundege2@outlook.com','$2a$10$pVqBtKRnH9QSsblCCPIK4uyWstH8EupqTDAhQStzw/q4S7OHUhAFK',true,'admin','active',' ',' ')ON CONFLICT DO NOTHING returning *;
      CREATE TABLE IF NOT EXISTS stories (
        storyid UUID NOT NULL PRIMARY KEY,
        createdon TIMESTAMP DEFAULT NOW(),
        ownerId UUID ,
        likes INT,
        owner VARCHAR(60),
        title VARCHAR(40),
        share VARCHAR(20),
        content VARCHAR(100000) ,
        FOREIGN KEY (ownerId) REFERENCES users(userid) ON DELETE CASCADE
      );`;
const createTable = async (res) => {
  try {
    await pool.query(table);
    console.log('Production Tables created');
  } catch (err) {
    console.log(err)
  }
};

createTable();

export default createTable;
