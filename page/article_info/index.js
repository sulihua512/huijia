var app = getApp();
// pages/cart/cart.js
var util = require('../../utils/util');
var Bmob = require('../../utils/bmob.js')
var pageTo = 0;
function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
}
Page({
  data: {
    showHidFen: true,
    activityClose: 0,
  },
  onLoad: function (options) {
    pageTo = 0;
    var that = this;
    that.setData({
      objectId: options.objectId != undefined ? options.objectId : 0,
    });
    that.getDetail(options.objectId);
  },

  getDetail: function (objectId) {
    var that = this;
    util.showLoading();
    var objectId = objectId != undefined ? objectId : 'WwBM222I';
    const query = Bmob.Query('article');
    query.get(objectId).then(res => {
      util.hideLoading();
      that.setData({
        articleInfo: res
      });
      var read_num = res.read_num !== undefined ? res.read_num : 0;
      var now_num = parseInt(read_num) + parseInt(1);
      res.set('read_num', now_num);
      res.save();
    }).catch(err => {
      console.log(err)
    })
  },
})