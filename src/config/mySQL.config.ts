export const mySQLConfig = {
  database: process.env.MY_SQL_DATABASE || 'tensionx',
  host: process.env.MY_SQL_HOST || 'localhost',
  user: process.env.MY_SQL_USER || 'root',
}
