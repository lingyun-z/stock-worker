import * as mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const createStockData = (stocks: any[]) => {
  let sqlStr = `INSERT INTO STOCK_DAILY_DATA (ts_code, trade_date, open, high, low, close, pre_close, \`change\`, vol, amount) VALUES (?)`;
  for (let i = 1; i < stocks.length; i++) {
    sqlStr += ',(?)';
  }
  return pool.query(sqlStr, stocks);
};

export const updateStockInfo = (stockInfo: any) => {
  let sqlStr = `UPDATE STOCK_INFO SET ? WHERE ?`;
  return pool.query(sqlStr, stockInfo);
};
