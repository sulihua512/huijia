// page/adminss/address/index/index.js
var app = getApp();
var util = require('../../../../utils/util');
var Bmob = require('../../../../utils/bmob.js')
var that;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		visual: false,
		upd_add_hidden:true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		that = this;
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		that.getClassify();
	},
	getClassify: function () {
		util.showLoading();
		var query = Bmob.Query('article_classify');
		query.find().then(function (results) {
			util.hideLoading();
			that.setData({
				classifyList: results,
				visual: results.length ? true : false
			});
		}, function () {
			util.hideLoading();
		});
	},
	hideDiaLog:function(){
		var that = this;
		that.setData({
			upd_add_hidden:true,
			classify_name:'',
			sort:'',
			upd_object_id:'',
		});
	},
	add: function () {
		var that = this;
		that.setData({
			upd_add_title:'新增分类',
			upd_add_hidden:false,
		});
	},
	edit: function (e) {
		var that = this;
		var upd_object_id = e.currentTarget.dataset.id;
		var classify_name = e.currentTarget.dataset.classify_name;
		var sort = e.currentTarget.dataset.sort;
		that.setData({
			upd_add_title:'编辑分类',
			upd_add_hidden:false,
			upd_object_id:upd_object_id,
			classify_name:classify_name,
			sort:sort,
		});
	},
	// 新增房屋分类
	ChangeClassifyName:function(e){
		var that = this;
		that.setData({
			classify_name : e.detail.value,
		});

	},
	ChangeClassifySort:function(e){
		var that = this;
		that.setData({
			sort : e.detail.value,
		});

	},
	// 提交
	upd_add_do:function(e){
		var that = this;
		var upd_object_id = e.currentTarget.dataset.id;
		var classify_name = that.data.classify_name;
		if(upd_object_id==null){
			util.showLoading('添加失败')
			return null;
		}
		var sort = parseInt(that.data.sort);
		console.log('修改的id',upd_object_id);
		if(upd_object_id != undefined && upd_object_id != '' && upd_object_id != null){
			console.log('修改');
			console.log(upd_object_id);
			//修改
			util.showLoading();
			var query = Bmob.Query('article_classify');
			query.get(upd_object_id).then(result => {
			  console.log(result)
			  	result.set('name',classify_name);
				result.save();
				util.showSuccess('编辑成功');
				that.hideDiaLog();
				that.getClassify();
			}).catch(err => {
			  console.log(err)
			})
		}else{
			//添加
			
			const query = Bmob.Query('article_classify');
			query.set("name",classify_name)
			query.save().then(res => {
			  // console.log('添加的数据',res)
			  util.showSuccess('添加成功');
				that.hideDiaLog();
				that.getClassify();	
			}).catch(err => {
			  console.log(err)
			})
		}
	},
	del_do:function(e){
		var that = this;
		var objectId = e.currentTarget.dataset.id;
		console.log(objectId);
		wx.showModal({
			title: '温馨提示',
			content: '您确定要删除此分类吗？',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					const query = Bmob.Query('article_classify');
					query.destroy(objectId).then(res => {
					  	console.log(res)
					  	that.hideDiaLog();
						that.getClassify();	
					}).catch(err => {
					  console.log(err)
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	}
})