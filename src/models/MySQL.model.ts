import mysql2 from 'mysql2/promise';

import { mySQLConfig } from '../config/mySQL.config';

export class MySQLModel {
  private static instance: MySQLModel;

  private connection: mysql2.Connection;

  private constructor() {
    this.connect()
  }

  static getInstance() {
    if(!MySQLModel.instance) {
      MySQLModel.instance = new MySQLModel;
    }
    return MySQLModel.instance;
  }

  public getConnection(): mysql2.Connection {
    if(!this.connection) {
      this.connect();
    }
    return this.connection;
  }

  public async query(sql: string) {
    let [rows, fields] = [[], []];

    try {
      [rows, fields] = await this.connection.execute(sql);
    } catch (err) {
      console.error(err);
    }

    const result = {};
    Object.assign(result, rows);
    return result;
  }

  public async run(sql: string) {
    try {
      this.connection.execute(sql);
    } catch(err) {
      console.error(err);
    }
  }

  private connect() {
    (async () => {
      mysql2.createConnection(mySQLConfig)
        .then((connection) => {
          this.connection = connection;
          this.seedDatabase();
        });
    })();
  }

  private seedDatabase() {
    try {
      this.connection.execute(`
    CREATE TABLE IF NOT EXISTS Users
    (
      Id INT(11) NOT NULL AUTO_INCREMENT,
      Email VARCHAR(255) NOT NULL,
      Password VARCHAR(255) NOT NULL,
      Role TEXT NOT NULL,
      PRIMARY KEY (Id)
    );`);
    } catch (err) {
      console.error(err);
    }
  }
}
