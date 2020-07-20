// page/adminss/member/index.js
var app = getApp();
var util = require('../../../utils/util');
var Bmob = require('../../../utils/bmob.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getMemberList();
	},
	getMemberList: function () {
		var that = this;
		var query = Bmob.Query('_User');
		query.order('-createdAt');
		query.find().then(function (results) {
			that.setData({
				member_list: results
			});
		});
	},
	open_menu:function(e){
		var objectId = e.currentTarget.dataset.id;
			//禁止状态
			var itemList = ['查看TA的收藏','查看TA的阅读历史'];
		wx.showActionSheet({
			itemList: itemList,
			success: function(res) {
				if(res.tapIndex == 0){
					wx.navigateTo({
						url: '/page/mine/col/index?member_id='+objectId,
					})
				}else{
					wx.navigateTo({
						url: '/page/mine/comments/index?member_id='+objectId,
					})
				}
			},
			fail: function(res) {
				console.log(res.errMsg)
			}
		})
	},
	changeUserState:function(e){
		var that = this;
		var if_open = e.currentTarget.dataset.if_open;
		var objectId = e.currentTarget.dataset.id;
		var member_name = e.currentTarget.dataset.member_name;
		if(if_open == 1){
			//改为关闭状态
			var Diary = Bmob.Object.extend("fine_record");
			var diary = new Diary();
			diary.set("member_id",objectId);
			diary.set("member_name",member_name);
			diary.set("status",parseInt(0));//未支付
			diary.set("if_open",parseInt(0));//未支付
			//添加数据，第一个入口参数是null
			diary.save(null, {
				success: function(result) {
					// 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
					var query = new Bmob.Query('fine_record');
					query.equalTo('member_id', objectId);
					query.find().then(function(todos) {
						console.log(todos);

						var upd_open = parseInt(0);
					    todos.forEach(function(todo) {
					    	todo.set('if_open', upd_open); 
					    });
					    return Bmob.Object.saveAll(todos);
					}).then(function(todos) {
					    // 更新成功
					    // that.showGoods();
					     util.showSuccess('操作成功');
		            	that.getMemberList();
					},
					function(error) {
					    // 异常处理
					    console.log('异常处理');
					});
				},
				error: function(result, error) {
					// 添加失败

				}
			});
		}else{
			//改为打开状态
			console.log(11);
			console.log(objectId);
			var query = new Bmob.Query('fine_record');
			query.equalTo('member_id', objectId);
			query.find().then(function(todos) {

				var upd_open = parseInt(1); //全部修改为可使用
			    todos.forEach(function(todo) {
			    	todo.set('if_open', upd_open); 
			    });
			    return Bmob.Object.saveAll(todos);
			}).then(function(todos) {
			    // 更新成功
			    // that.showGoods();
			     util.showSuccess('操作成功');
            	that.getMemberList();
			},
			function(error) {
			    // 异常处理
			    console.log('异常处理');
			});
		}
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