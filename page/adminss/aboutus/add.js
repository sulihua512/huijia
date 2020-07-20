// page/adminss/address/add/index.js
var app = getApp();
var util = require('../../../utils/util');
var Bmob = require('../../../utils/bmob.js')
var date = new Date();
var objectId = 'Qm1dIIIN';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		content:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		console.log();
		util.showLoading();
		var query = Bmob.Query('aboutus');
		query.get(objectId).then(function (res) {
			that.setData({
				content: res.content,
			});
			util.hideLoading();
		});
	},
	ChangeContent:function(e){
		this.setData({
			content:e.detail.value,
		})
	},
	add: function (e) {
		var that = this;
		var form = e.detail.value;
		// 表单验证
		var insert = {};
		var insert = Bmob.Query('aboutus');

		insert.set('id', objectId) //需要修改的objectId
		insert.set('content', that.data.content) //需要修改的objectId
		insert.save().then(function (res) {
			// console.log(res)
			wx.showModal({
				title: '温馨提示',
				content: '保存成功',
				confirmColor: "#59A5F0",
				showCancel: false,
				success: function () {
					wx.navigateBack();
				}
			});
		}, function (res) {
			// console.log(res)
			wx.showModal({
				title: '温馨提示',
				content: '保存失败',
				confirmColor: "#59A5F0",
				showCancel: false
			});
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})