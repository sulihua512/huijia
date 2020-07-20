var app = getApp();
// pages/cart/cart.js
var util = require('../../utils/util');
var Bmob = require('../../utils/bmob.js')
var pageTo=0;
Page({
    data: {
		showHidFen: true,
		cot_status: 0, //0-自己未收藏，1-已收藏
    },
    onLoad: function(options) {
		pageTo = 0;
        var that = this;
		that.setData({
			objectId: options.objectId != undefined ? options.objectId : 0,
		});
        that.getDetail(options.objectId);
    },

    getDetail: function(objectId) {
        var that = this;
		util.showLoading();
        var objectId = objectId != undefined ? objectId : 'WwBM222I';
        // 获取问题详情
        const query = Bmob.Query('goods');
		query.get(objectId).then(res => {
            // console.log(res)
			util.hideLoading();
            that.setData({
                articleInfo: res
            });
            var read_num = res.read_num !== undefined ? res.read_num : 0;
            var now_num = parseInt(read_num) + parseInt(1);
            res.set('read_num',now_num);
  			res.save();

			that.getCotStatus();
        }).catch(err => {
            console.log(err)
        })
    },

	getCotStatus: function () {
		var that = this;

		var query = Bmob.Query('col');
		query.equalTo("userId", '==', wx.getStorageSync('userId') );
		query.equalTo("goods_id", '==', that.data.objectId );
		query.find().then(res => {
			util.hideLoading();
			console.log(res);
			console.log(res);
			if(res.length > 0){
				console.log(222);
				that.setData({
					cot_status: 1, // 有收藏过
				});
			}else{
				console.log(11111);
				that.setData({
					cot_status: 0, //没有收藏过
				});
			}
		});
	},
  // 地图导航
	openMap: function () {
		
		var that = this
		console.log('地图导航',that.data)
		const latitude = parseFloat(that.data.articleInfo.latitude);
		const longitude = parseFloat(that.data.articleInfo.longitude);
		wx.openLocation({
      latitude,// 纬度
      longitude,  //经度，
      scale: 18 //缩放比例
		})
	},

	makeCollect: function (e) {
		var that = this;
		var objectId = e.currentTarget.dataset.id;
		console.log(objectId);
		if (that.data.cot_status == 0) {
			//添加收藏，收藏数+1;
			util.showLoading();
			const pointer = Bmob.Pointer('goods')
			const poiID = pointer.set(that.data.objectId)
			var query = Bmob.Query('col');
			query.set("userId", wx.getStorageSync('userId'))
			query.set("goods_id",that.data.objectId)
			query.set("goodsAttr",poiID)
			query.save().then(res => {
				util.hideLoading();
				that.setData({
					cot_status: 1, // 有收藏过
				});
			}).catch(err => {
			  console.log(err)
			})
		} else {
			console.log(11);
			util.showLoading();

			const query = Bmob.Query("col");
			query.equalTo("userId","==", wx.getStorageSync('userId'));
			query.equalTo("goods_id","==", that.data.objectId);
			query.find().then(res => {
			    console.log(res)
			    const query = Bmob.Query('col');
				query.destroy(res[0].objectId).then(res => {
				util.hideLoading();
					that.setData({
						cot_status: 0, // 有收藏过
					});
				}).catch(err => {
				  console.log(err)
				})
			});
			//取消收藏，收藏数-1
		}
	},
})