/**
 * 文件工具类
 */
class FileUtil{

/**
 * 预览pdf文件
 * 参数url 必须是http请求
 * 获取资源时此方法 使用的是HTTP GET请求
 */
  static previewPdf(obj){
    const { url, data } = obj;
    return new Promise((resolve , reject)=>{
      //下载文件
      wx.downloadFile({
        url: url,
        header: "",
        success: function (res) {
          console.log(res);
          //保存临时路径
          let path = res.tempFilePath;
          //打开文件
          wx.openDocument({
            filePath: path,
            success: function (res) {
              console.log(res);
              console.log("文档打开成功");
            },
            fail: function (err) {
              return handleException(reject, err)
            }
          })
        },
        fail: function (err) {
          return handleException(reject, err)
        }
      })
    });
  }

  static handleException(reject,e){
    console.log(e);
    wx.showToast({
      title: '服务器忙，请稍后再试',
      icon: 'none',
      duration: 2000
    });
    return reject(e);
  }

}
module.exports = {
  FileUtil: FileUtil
}