/**
 * 公共方法类
 */
class public_utils{
  
  // 字符串格式转换
  formatDate(str) {
    let date = new Date(str); 
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (second < 10) {
      second = "0" + second;
    }

    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
   
  }
}
module.exports = public_utils