/**
 * @author: zzj
 * @date: 2020-01-06 16:05:27
 * @version: 1.0
 */
const mysql = require('mysql');

function connectDB(config) {
  const connection = mysql.createConnection(config);
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err);
      }else{
        process.connection = connection;
        process.dbConfig = config;
        resolve(connection);
      }
    });
  });
}
function getTableList(params) {
  let {connection,dbConfig={}} = process;
  let {tableName="",current=1,size=10}=params;
  console.log(tableName)
  return new Promise((resolve, reject) => {
    connection.query(`select TABLE_NAME tableName,CREATE_TIME createTime from information_schema.tables where table_schema="${dbConfig.database}" ${tableName?'and table_name like "%'+tableName+'%"':""} limit ${(current-1)*size},${size}`, (err, results, fields) => {
      if (err) {
        reject(err);
      }else{
        resolve(results);
      }
    });
  })
}
function countTable(params) {
  let {connection,dbConfig={}} = process;
  let {tableName=""}=params;
  return new Promise((resolve, reject) => {
    connection.query(`select count(1) total from information_schema.tables where table_schema="${dbConfig.database}" ${tableName?'and table_name like "%'+tableName+'%"':""}`, (err, results, fields) => {
      if (err) {
        reject(err);
      }else{
        resolve(results[0]?results[0].total:0);
      }
    });
  })
}
function getColumnList(params) {
  let {connection} = process;
  let {tableName}=params;
  return new Promise((resolve, reject) => {
    connection.query(`select  COLUMN_NAME columnName,COLUMN_COMMENT columnComment,DATA_TYPE dataType from information_schema.columns where table_name="${tableName}" order by ORDINAL_POSITION`, (err, results, fields) => {
      if (err) {
        reject(err);
      }else{
        resolve(results);
      }
    });
  })
}
module.exports={
  connectDB,
  getTableList,
  countTable,
  getColumnList
};
