var TrunPage = {};
var paraObj = {};
//var site_url = "http://172.16.40.9:9000/fs/";
var site_url = "http://m.wisedu.com:10014/";

var paramMethod;
var clientTypeDef=0;

var IOSDeviceName = "";
var web = null;//new webView();
/**
 * "0": android; "1": IOS;2 web
 */
var clientType = "2";

var username ="";
var password = "" ;
var userroleid = "" ;

TrunPage.pageInit = function() {
	$(".page-content").append("<p>pageInit</p>");
	if (clientType == "0") {
		$(document).ready(function(){
			username = android.getUserName() ;
			password = android.getPassword();
			userroleid = android.getUserRoleID();
			
			loadPage();
		});
	} else if(clientType == "1") {
		document.addEventListener("deviceready", loadPage, false);
		TrunPage.getDeviceName(getDeviceNameStr);
	}else{
		$(document).ready(function(){
			loadPage();
		});
	}
}
TrunPage.refreshPrevPage=function(){
	if(clientType == "0"){
		android.refreshwebView();
	}else if(clientType == "1"){
		web.refreshPrePage();
	}
}

function getDeviceNameStr(obj) {
	IOSDeviceName = obj;
}
/**
 * 获取ios端设备名称， itouch ipad iphone
 * 
 */
TrunPage.getDeviceName = function(jscallback) {
	if(clientType == "1"){
		web.getDeviceName(jscallback);
	}
}
/**
 * 要显示的webjs部分通过回调传给native，这时native
 * title的显示种类。（比如：新闻的title就是：返回键＋title标签，校园风光界面的title是：返回键＋title标签＋中间菜单按钮＋右边菜单按钮等）。
 * 更具回调传回来的type类型，native这边做相关显示等操作
 */
TrunPage.initTitleViewFormTitletype = function(type) {
	if (clientType == "0") {
		android.initTitleViewFormTitletype(type);
	} else if(clientType == "1"){
		web.initTitleViewFormTitletype(type);
	}else{
		
	}
}
/**
 * 初始化title中按钮的事件监听
 */
TrunPage.initClick = function() {
	if (clientType == "0") {
		android.initClick();
	}
}

TrunPage.callSystemAbility = function(systemAction) {
	if (clientType == "0") {
		android.callSystemAbility(systemAction);
	}else if(clientType == "1"){
		web.callSystemAbility(systemAction);
	}
}

/**
 * js 中的调用方法，打开新的界面
 * 
 * @param url
 *            请求页面地址
 * @param titletype
 *            新页面标题类型
 * 
 * @param titletext
 *            标题名
 */
TrunPage.openWebView = function(url, titletype, titletext) {
	if (clientType == "0") {
		android.openWebView(url, titletype, titletext);
	} else if(clientType == "1") {
		web.openWebView(url, titletype, titletext);
	}else{
		var start = url.substr(0,7);
		if(start!="http://"){
			url = url.substring(url.indexOf("/")+1, url.length);
		}
		window.open(url);
	}
}
/**
 * js 中的调用方法，设置界面中native的title标签
 * 
 * @param title
 *            标题名
 */
TrunPage.setTitleTxt = function(title) {
	if (clientType == "0") {
		android.setTitleTxt(title);
	} else if(clientType == "1") {
		web.setTitleTxt(title);
	}
}
TrunPage.setTitle = function(title) {
	if (clientType == "0") {
		android.setTitle(title);
	} else if(clientType == "1") {
		web.setTitle(title);
	}
}

/**
 * js 中的调用方法，通过native处理网络请求数据，再将数据返回给js 参数 jscallback 回调函数 requestType 请求类型
 * 
 * @param url
 *            访问URL
 * @param jscallback
 *            回调函数function名，字符串
 * @param requestType
 *            请求方式 'get', 'post'
 */
TrunPage.getJsonByGet = function(url, jscallback, requestType) {
	var returnType = "";
	if (clientType == "0") {
		returnType = "returnType=android";
	} else if(clientType == "1") {
		returnType = "returnType=" + IOSDeviceName;
	}else{
		returnType = "returnType=browser";
	}
	if (url.indexOf("?") > 0) {
		url = url + "&" + returnType;
	} else {
		url = url + "?" + returnType;
	}

	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.getJsonByGet(url, jscallback + "", requestType);
	} else if(clientType == "1") {
		paramMethod = jscallback;
		web.getJsonByGet(iosJson, url, requestType);
	}else{
		getJsonFormServer(url,jscallback);
	}
	TrunPage.setProgressBarVisibility(false);
}
function iosJson(dataJsonp){
	var data;
	if((typeof dataJsonp)=='string'){
		data = eval('(' + dataJsonp+ ')');
	}
	paramMethod(data);
}
TrunPage.returnData = function() {
	if (clientType == "0") {
		return android.returnData();
	}  else if(clientType == "1") {
		
	}
}
TrunPage.openUserDetail = function(idUser) {
	if (clientType == "0") {
		return android.openContactDetailActivity(idUser);
	}  else if(clientType == "1") {
		web.openContactDetail(idUser);
	}
}
/**
 * 同步调用.
 * 
 * @param url
 *            请求地址
 */

TrunPage.getJson = function(url) {
	if (clientType == "0") {
		return android.getJsonByGet(url);
	}
}
/**
 * js 中的调用方法，预览图片
 * 
 * @param index
 *            图片序号（0,1,2,3）
 * @param images
 *            图片URL
 * @param names
 *            图片名
 * @param xs
 *            ys 经纬度
 */
TrunPage.showImage = function(index, images, names, xs, ys) {
	if (clientType == "0") {
		android.showImage(index, images, names, xs, ys);
	} else if(clientType == "1") {
		web.showImage(index, images, names, xs, ys);
	}
}
/**
 * 提示信息.
 */
TrunPage.showToast = function(message) {
	if (clientType == "0") {
		android.showToast(message);
	} else if(clientType == "1") {
		web.alert(message);
	}else{
		alert(message);
	}
}

/**
 * 获取手机串号.
 */
TrunPage.getUuid = function(jscallback) {
	if (clientType == "0") {
		var uuid = android.getUuid();
		jscallback(uuid);
	} else if(clientType == "1") {
		web.getUuid(jscallback);
	}
}
/**
 * 获取传参值.
 */
TrunPage.getCallbackParams = function(jscallback) {
	paramMethod = jscallback;
	if (clientType == "0") {
		var CallbackParams = android.getCallbackParams();
		parseRequest(CallbackParams);
	} else if(clientType == "1") {
		web.getCallbackParams(parseRequest);
	} else {
		var url = location.href;
		var paraString = url.substring(url.indexOf("?")+1,url.length);
		parseRequest(paraString);
	}
}

//解析参数
function parseRequest(paras){
	var paraString = paras.split("&");
    for (i=0; j=paraString[i]; i++){
    	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    }
    paramMethod();
}

//解析参数
function request(paras){
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
    	return ""; 
    }else{
    	return returnValue;
    }
}
/**
 * 根据key值返回value.
 * 
 * @param key
 * @param jscallback
 *            回调函数
 */
TrunPage.getKeyValue = function(key, jscallback) {
	if (clientType == "0") {
		var value = android.getKeyValue(key);
		jscallback(value);
	} else if(clientType == "1") {
		web.getValueByKey(jscallback, key);
	}else{
		var paramValue = window.localStorage.getItem(key);
	    window.localStorage.removeItem(key);
	    jscallback(paramValue);
	}
}
/**
 * 保存key value值.
 * 
 * @param key
 * @param value
 */
TrunPage.setKeyValue = function(key, value) {
	if (clientType == "0") {
		android.setKeyValue(key, value);
	} else if(clientType == "1") {
		web.setKeyAndValue(key, value);
	}else{
		window.localStorage.setItem(key, value);
	}
}
/**
 * 调用相机.
 */
TrunPage.callSysCamera = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysCamera(jscallback);
	} else if(clientType == "1") {
		web.getPictureFromCamera(jscallback);
	}
}

TrunPage.playRecAudio = function(src){
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysCamera(jscallback);
	} else if(clientType == "1") {
		cordova.exec(null, null, 'com.wisedu.VideoPlayer', 'show', [src, 'YES']);
	}
}
TrunPage.capturePhoto = function(jscallback){
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysCamera(jscallback);
	} else if(clientType == "1") {
		// 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
	    navigator.camera.getPicture(jscallback, function(mesage){
	    	TrunPage.showToast('Failed because: ' + message);
	    }, { quality: 50 });
	}
}
TrunPage.recordAudio = function(jscallback){
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysCamera(jscallback);
	} else if(clientType == "1") {
		 var options = { limit: 1, duration: 60*5 };
		 navigator.device.capture.captureAudio(jscallback, function(error){
			 TrunPage.showToast("录音失败: "+error.code);
		 }, options);
	}
}
TrunPage.getPhoto = function(jscallback){
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysCamera(jscallback);
	} else if(clientType == "1") {
		var pictureSource=navigator.camera.PictureSourceType;
	    var destinationType=navigator.camera.DestinationType;
	    
		// 从设定的来源处获取图像文件URI
	    navigator.camera.getPicture(jscallback, function(mesage){
	    	TrunPage.showToast('Failed because: ' + message);
	    }, { quality: 50,destinationType: destinationType.FILE_URI,sourceType: pictureSource.SAVEDPHOTOALBUM });
	}
}

/**
 * 调用相册.
 */
TrunPage.callSysAlbum = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.callSysAlbum(jscallback);
	} else if(clientType == "1") {
		web.getPictureFromFile(jscallback);
	}
}
/**
 * 获取经纬度.
 */
TrunPage.getXY = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.getXY(jscallback);
	} else if(clientType == "1") {
		web.getXY(jscallback);
	}
}
/**
 * 设置title右边按钮显示隐藏状态.
 */
TrunPage.setRightBtnVisible = function(booble) {
	if (clientType == "0") {
		android.setRightBtnVisible(booble);
	} else if(clientType == "1") {
		web.showRssButton(booble);
	}
}
/**
 * 设置title右侧按钮文字.
 */
TrunPage.setRightBtnText = function(txt) {
	if (clientType == "0") {
		android.setRightBtnText(txt);
	} else if(clientType == "1") {
		web.setRightBtnText(txt);
	}
}
TrunPage.setRightBtnImage = function(imgsrc) {
	if (clientType == "0") {
		android.setRightBtnImage(imgsrc);
	} else if(clientType == "1") {
		web.setRightBtnImage(imgsrc);
	}
}
/**
 * 获取图片位置经纬度.
 */
TrunPage.picGetAdress = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.picGetAdress(jscallback);
	} else if(clientType == "1") {

	}
}
/**
 * 跳转本地浏览器.
 */
TrunPage.toSysBrowser = function(url) {
	if (clientType == "0") {
		android.toSysBrowser(url);
	} else if(clientType == "1") {
		// web.getCallbackParams(jscallback);
	}
}
/**
 * 控制订阅按钮显示状态.
 */
TrunPage.setRightBtnSelect = function(boolen) {
	if (clientType == "0") {
		android.setRightBtnSelect(boolen);
	} else if(clientType == "1") {

	}
}

/**
 * 去除/显示loading层. true 显示 false 隐藏
 */
TrunPage.setProgressBarVisibility = function(boolen) {
	if (clientType == "0") {
		android.setProgressBar(boolen);
	} else if(clientType == "1") {
		
	}
}
/**
 * 获取token参数.
 * 
 * @param callback
 */
function getToken(callback) {
	if (clientType == "0") {	
		var tokenValue = android.openToken();
		callback(tokenValue);
	} else if(clientType == "1") {
		return web.openToken(callback);
	}
}

/**
 * 从服务器端获取数据
 * 
 * @param urlstr
 * @param onLoadServerDataSuccess
 */
function getJsonFormServer(urlstr, onLoadServerDataSuccess) {
	var type = "GET";
	var async = true;
	var dataType = "jsonp";
	var timeout = 90000;
	// 超时15秒限制
	var data;
	var url = "";
	if (urlstr.substring(0, 4) != 'http') {
		url = site_url + urlstr;
	} else {
		url = urlstr;
	}
//	var returnType = "";
//	if (clientType == "0") {
//		returnType = "returnType=android";
//	} else if(clientType == "1") {
//		returnType = "returnType=" + IOSDeviceName;
//	}
//	if (url.indexOf("?") > 0) {
//		url = url + "&" + returnType;
//	} else {
//		url = url + "?" + returnType;
//	}
	//url += "&"+tokenStr;
//	TrunPage.showToast("url!"+url);
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			onLoadServerDataSuccess(data);
			TrunPage.setProgressBarVisibility(false);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			TrunPage.setProgressBarVisibility(false);
			TrunPage.showToast("服务连接超时!");
		}
	});
	TrunPage.setProgressBarVisibility(false);
}
/**
 * 返回事件.
 */
TrunPage.goBack = function() {
	if (clientType == "0") {
		android.Return();
	} else if(clientType == "1") {
		web.Return();
	}
	//refreshPage();
}

/**
 * js 中的调用方法，设置界面中native的title标签
 * 
 * @param title
 *            标题名
 */
TrunPage.setTitle = function(titleText,isLeftVisiable,isRightVisiable) {
	if (clientType == "0") {
		android.setTitleTxt(titleText);
	} else if(clientType == "1") {
		web.setTitle(titleText,isLeftVisiable,isRightVisiable);
	}
}

/**
 * 闹铃提醒(确定)
 * @param roomStrId : 唯一表示一个提示的id,把会议室id+时间串 如："1003201302260900"
 * @param startTime : 会议的开始时间 如："2013-03-25 18:44"
 * @param content : 所要提示的内容 如："您预约的101会议室会议开始时间到，确定启用？ || 您预约的101会议室会议结束时间到，会议室空闲，确定续约？"
 */
TrunPage.setAlarmClock = function(roomStrId, conferenceTime, content) {
	if (clientType == "0") {
		android.openAlarmClock(roomStrId, conferenceTime, content);
	} else if(clientType == "1") {
		web.setAlarmClock(roomStrId, conferenceTime, content);
	}
}

/**
 * 闹铃提醒(取消)
 * @param roomStrId : 唯一表示一个提示的id,把会议室id+时间串 如："1003201302260900"
 * @param startTime : 会议的开始时间 如："2013-03-25 18:44"
 * @param content : 所要提示的内容 如：""
 */
TrunPage.cancelAlarmClock = function(roomStrId) {
	if (clientType == "0") {
		android.cancelAlarmClock(roomStrId);
	} else if(clientType == "1") {
		web.cancelAlarmClock(roomStrId);
	}
}

/**
 * 会议室撤销(确定，取消(取消就不进行操作))
 * @param msg : 提示信息的内容
 * @param clickConfirm : 点击确定的方法名
 */
TrunPage.dischargeConferenceOk = function(title,msg,clickConfirm) {
	if (clientType == "0") {
		android.showAlertDialog(title,msg);
	} else if(clientType == "1") {
		web.dischargeConferenceOk(title,msg,clickConfirm);
	}else{
		clickConfirm();
	}
}

/**
 * 判断网络
 */
TrunPage.notifyUI = function() {
	if (clientType == "0") {
		return android.notifyUI();
	} else if(clientType == "1") {
		web.notifyUI();
		return true;
	}
}

/**
  * 获取用户名
  */
 TrunPage.getUserName = function(jscallback) {
 	if (clientType == "0") {
 		var userName = android.getUserName();
 		jscallback(userName);
 	} else if(clientType == "1") {
 		web.getUserName(jscallback);
 	}
 }

 /**
  * 获取密码
  */
 TrunPage.getPassword = function(jscallback) {
 	if (clientType == "0") {
 		var password = android.getPassword();
 		jscallback(password);
 	} else if(clientType == "1") {
 		web.getPassword(jscallback);
 	}
 }


 /**
   * 获取用户名
   */
  TrunPage.getDesUserName = function(jscallback) {
  	if (clientType == "0") {
  		var userName = android.getDesUserName();
  		jscallback(userName);
  	} else if(clientType == "1") {
  		web.getDesUserName(jscallback);
  	}
  }

  /**
   * 获取密码
   */
  TrunPage.getDesPassword = function(jscallback) {
  	if (clientType == "0") {
  		var password = android.getDesPassword();
  		jscallback(password);
  	} else if(clientType == "1") {
  		web.getDesPassword(jscallback);
  	}
  }





TrunPage.innerTraffic = function(schoolId,type,title) {
	if (clientType == "0") {
	      android.openCampusmapActivity(type,title);
	} else if(clientType == "1") {
	web.innerTraffic(schoolId,type,title);
	}else{
	}
}

TrunPage.clife = function(type,codeLoccat,title) {
	if (clientType == "0") {
		android.openCampusmapActivity(type,title,codeLoccat);
	} else if(clientType == "1") {
	web.clife(type,codeLoccat,title);
	}else{
	}
}

TrunPage.outtraffic = function(begin,end,title) {
	if (clientType == "0") {
	android.openCampusDetailRouteMapActivity(begin,end,title);
	} else if(clientType == "1") {
	web.clife(begin,end,title);
	}else{
	}
}

/**
 * 获取经纬度.
 */
TrunPage.getMyLocation = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.getMyLocation(jscallback);
	} else if(clientType == "1") {
	
	}
}

/**
 * 城市代码
 */
	TrunPage.getCityName = function(jscallback) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.getCityName(jscallback);
	} else if(clientType == "1") {
		web.getCityName(jscallback);
	}else{
	}
}
TrunPage.openSysCamera = function(flag) {
	if (clientType == "0") {
		android.callSysCamera(flag);
	} else if(clientType == "1") {
		web.getPictureFromCamera();
	}
}

TrunPage.openSysAlbum = function() {
	if (clientType == "0") {
		android.callSysAlbum();
	} else if(clientType == "1") {
		web.getPictureFromFile();
	}
}

TrunPage.setLeftBtnGoHistory = function(booble) {
	if (clientType == "0") {
		android.setLeftBtnGoHistory();
	} else if(clientType == "1") {
		web.setLeftBtnGoHistory(booble);
	}
}

function getJsonFormServerHtml(urlstr, onLoadServerDataSuccess) {
	TrunPage.setProgressBarVisibility(true);
	var returnType = "";
	var type = "GET";
	var async = true;
	var dataType = "html";
	var timeout = 90000;
	// 超时15秒限制
	var data="";
	var url = "";
	
	TrunPage.getKeyValue("title", function(data){
		TrunPage.setKeyValue("title", data);
		if(null==data||""==data||"null"==data){
		}else{
			$("#titleTxt").html(data);
		}
	});
	
	if (clientType == "0") {
		returnType = "returnType=android";
	} else if(clientType == "1") {
		returnType = "returnType=" + IOSDeviceName;
	}else{
		returnType = "returnType=browser";
	}
	
	if (urlstr.substring(0, 4) != 'http') {
		url = site_url + urlstr;
	} else {
		url = urlstr;
	}
	
	if(url.indexOf("reqUrl=") >= 0){
		
	}else{
		if (url.indexOf("?") > 0) {
			url = url + "&" + returnType;
		} else {
			url = url + "?" + returnType;
		}
	}
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			onLoadServerDataSuccess(data);
			TrunPage.getKeyValue("title", function(data){
				TrunPage.setKeyValue("title", data);
				if(null==data||""==data||"null"==data){
				}else{
					$("#titleTxt").html(data);
				}
			});
			TrunPage.setProgressBarVisibility(false);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			TrunPage.setProgressBarVisibility(false);
			TrunPage.getKeyValue("title", function(data){
				TrunPage.setKeyValue("title", data);
				if(null==data||""==data||"null"==data){
				}else{
					$("#titleTxt").html(data);
				}
			});
			TrunPage.showToast("服务连接超时!");
		}
	});
}


function postFormServerHtml(urlstr, parameters, onLoadServerDataSuccess) {
	TrunPage.setProgressBarVisibility(true);
	var returnType = "";
	var type = "POST";
	var async = true;
	var dataType = "html";
	var timeout = 90000;
	// 超时15秒限制
	var data = parameters;
	var url = "";
	TrunPage.getKeyValue("title", function(data){
		TrunPage.setKeyValue("title", data);
		if(null==data||""==data||"null"==data){
		}else{
			$("#titleTxt").html(data);
		}
	});
	if (clientType == "0") {
		returnType = "returnType=android";
	} else if(clientType == "1") {
		returnType = "returnType=" + IOSDeviceName;
	}else{
		returnType = "returnType=browser";
	}
	
	if (urlstr.substring(0, 4) != 'http') {
		url = site_url + urlstr;
	} else {
		url = urlstr;
	}
	
	if(url.indexOf("reqUrl=") >= 0){
		
	}else{
		if (url.indexOf("?") > 0) {
			url = url + "&" + returnType;
		} else {
			url = url + "?" + returnType;
		}
	}
	
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			onLoadServerDataSuccess(data);
			TrunPage.setProgressBarVisibility(false);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			TrunPage.setProgressBarVisibility(false);
			TrunPage.showToast("服务连接超时!");
		}
	});
}

TrunPage.uploadPhoto= function(url,jscallback){
    if (clientType == "0"){
        jscallback = jscallback + "";
        jscallback = jscallback.substring(8, jscallback.indexOf("("));
        android.uploadPhoto(url, jscallback + "");
    }else{
        web.uploadPhoto(jscallback, url)
    }
    TrunPage.setProgressBarVisibility(false);
} 

TrunPage.downLoadFile= function(url,filePath,fileName,jscallback){
    if (clientType == "0"){
        android.downLoadFile(url,filePath,fileName,jscallback);
    }else{
    }
}
//sujiang-001-增加JS调用Native方法Post数据-start
TrunPage.getJsonByPost = function(url, jscallback,str) {
	if (clientType == "0") {
		jscallback = jscallback + "";
		jscallback = jscallback.substring(8, jscallback.indexOf("("));
		android.getJsonByPost(url, jscallback + "",str);
	} else if(clientType == "1"){		
		web.getJsonByPost(jscallback, url, str);
	}else {
		var data = JSON.parse(str);
		getJsonByPostFromServer(url, jscallback, data);
	}
	TrunPage.setProgressBarVisibility(false);
}

/**
 * 从服务器端获取数据
 * 
 * @param urlstr
 * @param onLoadServerDataSuccess
 * @param data
 */
function getJsonByPostFromServer(urlstr, onLoadServerDataSuccess, data) {
	var type = "GET";
	var async = true;
	var dataType = "jsonp";
	var timeout = 90000;
	// 超时15秒限制	
	var url = "";
	if (urlstr.substring(0, 4) != 'http') {
		url = site_url + urlstr;
	} else {
		url = urlstr;
	}
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			onLoadServerDataSuccess(data);
			TrunPage.setProgressBarVisibility(false);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			TrunPage.setProgressBarVisibility(false);
			TrunPage.showToast("服务连接超时!");
		}
	});
	TrunPage.setProgressBarVisibility(false);
}

//设置左边标题按钮文字
TrunPage.setLeftBtnText = function(text) {
	if (clientType == "0") {
		android.setLeftBtnText(text);
	} else if(clientType == "1"){		

	}else {
	}
}

//关闭指定activity
TrunPage.backToRootView = function() {
	if (clientType == "0") {
		android.gotoRootDetail();
	} else if(clientType == "1"){		

	}else {
	}
}

//获取用户角色ID
TrunPage.getUserRoleID = function(jscallback) {
	if (clientType == "0") {
		var roleID = android.getUserRoleID();
		jscallback(roleID);
	} else if(clientType == "1"){		

	}else {
	}
}

TrunPage.setCancelProgressBar = function(isCancel) {
	if (clientType == "0") {
		android.setCancelProgressBar(isCancel);
	} else if(clientType == "1"){		

	}else {
	}
}

//获取cookies
TrunPage.getCookies=function(){
	return android.getCookies();
}

//0中文 1英文
TrunPage.getCurrLan = function(jscallback){
	if (clientType == "0") {
		  android.getCurrLan(jscallback);
	} else if(clientType == "1"){
		  web.getCurrLan(jscallback);
	}
}

TrunPage.twoDimension = function(jscallback){
	if (clientType == "0") {
		  android.twoDimension(jscallback);
	} else if(clientType == "1"){		
		  web.twoDimension(jscallback);
	}
}
TrunPage.share = function(jscallback){
	if (clientType == "0") {
		  android.share(jscallback);
	} else if(clientType == "1"){
		  web.share(jscallback);
	}
}

TrunPage.setRightBtnGoHistory = function(booble) {
	if (clientType == "0") {
		android.setRightBtnGoHistory();
	} else if(clientType == "1") {
		web.setRightBtnGoHistory(booble);
	}
}


TrunPage.setRightBtnGoJS = function() {
	if (clientType == "0") {
		android.setRightBtnGoJS();
	} else if(clientType == "1") {
		web.setRightBtnGoJS();
	}
}

//获取当前网络类型: 无可用网络(-1) ; wifi(0) ; 2G网络 (1)；  3G网络(2)
TrunPage.getNetType = function(jscallback) {
	if (clientType == "0") {
		var type = android.getNetType();
		jscallback(type);
	} else if(clientType == "1") {
	}
}

//获取ServerUrl
TrunPage.getServerUrl=function(jscallback){
    if (clientType == "0") {
        var serverUrl = android.getServerUrl();
        jscallback(serverUrl);
     } else if(clientType == "1") {
         web.getServerUrl(jscallback);
     }
}
//获取cookie的值
TrunPage.getCookie=function(jscallback) {
 	if (clientType == "0") {
 		var cookies=android.getCookie();
 		jscallback(cookies);
 	} else if(clientType == "1") {
 		web.getCookies(jscallback);
 	}
}



//二维码调用
TrunPage.openQRCoderYX= function(jscallback){
	android.twoDimension(jscallback);
}