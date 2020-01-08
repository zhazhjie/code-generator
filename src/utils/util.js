/**
 * @author: zzj
 * @date: 2020-01-06 09:58:26
 * @version: 1.0
 */

function setStore(name, data, type) {
  if (type) {
    if (data === null) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(data));
    }
  } else {
    if (data === null) {
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, JSON.stringify(data));
    }
  }
}

function getStore(name, type) {
  if (type) {
    return JSON.parse(localStorage.getItem(name) || 'null')
  } else {
    return JSON.parse(sessionStorage.getItem(name) || 'null')
  }
}

function formatTime(date, fmt) {
  let o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function underlineToCamelBak(name, capitalize) {
  if (!name) return "";
  let ary = name.split("_");
  return ary.map((v, i) => {
    if (i || capitalize) {
      return v.substring(0, 1).toUpperCase() + v.substring(1);
    } else {
      return v;
    }
  }).join("");
}

function mysqlTypeConvert(fieldType) {
  let type = fieldType.toLowerCase();
  switch (type) {
    case "char":
    case "varchar":
    case "text":
    case "json":
    case "enum":
      return "String";
    case "bigint":
      return "Long";
    case "bit":
      return "Boolean";
    case "int":
    case "tinyint":
      return "Integer";
    case "decimal":
      return "BigDecimal";
    case "clob":
      return "Clob";
    case "blob":
      return "Blob";
    case "binary":
      return "byte[]";
    case "float":
      return "Float";
    case "double":
      return "Double";
    case "date":
    case "datetime":
      return "Date";
    default:
      return "String";
  }
}

module.exports = {
  setStore,
  getStore,
  underlineToCamelBak,
  mysqlTypeConvert,
  formatTime
};
