const util = require("./src/utils/util");
const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'test'
});
connection.connect();
let tableName = "sys_user";
connection.query(`select  COLUMN_NAME columnName,COLUMN_COMMENT columnComment,DATA_TYPE dataType from information_schema.columns where table_name="${tableName}"`, function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  results.forEach(v => {
    v.property = util.underlineToCamelBak(v.columnName);
    v.propertyType = util.mysqlTypeConvert(v.dataType);
  });
  let config = {
    author: "zzj",
    date: util.formatTime(new Date(),"yyyy-MM-dd hh:mm:ss"),
    entityName: "%s",
    serviceName: "%sService",
    serviceImplName: "%sServiceImpl",
    controllerName: "%sController",
    mapperName: "%sMapper",
    columns: results,
    tableName: tableName,
    tableNameCamelBak: util.underlineToCamelBak(tableName),
    tableNameCapitalize: util.underlineToCamelBak(tableName, true),
    superEntityClass: "",
    superControllerClass: "BaseController",
    superEntityColumns: ["id", "create_time", "update_time"],
    basePath: "/" + tableName.replace("_", "/"),
    basePackage:"com.zzj"
  };
  let templates = fs.readdirSync('./src/template');
  templates.forEach(template => {
    ejs.renderFile('./src/template/' + template, config, function (err, str) {
      // str => 输出绘制后的 HTML 字符串
      let data = new Uint8Array(Buffer.from(str));
      fs.writeFile(`./dist/${template.replace(".ejs", "")}`, data, function (err) {

      });
    });
  });
  connection.end();
});