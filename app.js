//app.js
// 全局初始化
var Bmob = require('utils/bmob.js')
// Bmob.initialize("你的Application ID", "你的REST API Key");
Bmob.initialize("3181510512c81c2ad0937ece2b543d10", "dcd9b802a7156c1a4aa2b3392ac3fd73");

App({
	onLaunch: function () {
		
	},
	globalData: {
		userInfo: null,
		StoreInfo:null,
	},
})