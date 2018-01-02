// var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
var m_sign = "";
var accountType;
var userId;
var token;
var RoomId;

function loadPage() {
    getData();
}

function getData() {

    TrunPage.getKeyValue("userId", function (data) {
        userId = data;

    });
    TrunPage.getKeyValue("token", function (data) {
        token = data;
    });

    getChannel(userId, "照明");
    setInterval("getChannel(userId,accountType)", 5000);
    // $.ajax({
    //     url: url + 'Login',
    //     data: {'Sign': m_sign},
    //     type: 'POST',
    //     dataType: "json",
    //     success: function (json) {
    //         // TrunPage.showToast("登录成功!");
    //
    //         //初始化容器样式
    //         console.log(json.token.access_token);
    //         token = json.token.access_token;
    //         accountType = "照明";
    //         userId = json.user.UserID;
    //
    //         //存储
    //         TrunPage.setKeyValue("token", token);
    //         TrunPage.setKeyValue("userId", userId);
    //     }
    // });
    // TrunPage.setProgressBarVisibility(true);
    // TrunPage.getSignUser(function (data) {
    //
    //     m_sign = data;
    //     if(m_sign==null){
    //         TrunPage.showToast("请先登录!");
    //
    //         return
    //     }
    //     $.ajax({
    //         url: url + 'Login',
    //         data: {'Sign': m_sign},
    //         type: 'POST',
    //         dataType: "json",
    //         success: function (json) {
    //             // TrunPage.showToast("登录成功!");
    //
    //             //初始化容器样式
    //             // console.log(json.token.access_token);
    //             token = json.token.access_token;
    //             accountType = "照明";
    //             userId = json.user.UserID;
    //
    //             getChannel(userId,accountType);
    //             setInterval("getChannel(userId,accountType)", 5000);
    //             //存储
    //             TrunPage.setKeyValue("token",token);
    //             TrunPage.setKeyValue("userId",userId);
    //         }
    //     });
    // });

}

function getDetail() {
    TrunPage.openWebView("demo/www/infoDetail.html", 1, "信息详情");
}

function getChannel(StudentID, AccountType) {
    // TrunPage.showToast("开始请求数据");
    $.ajax({
        url: url + 'Inquiry_Channel',
        data: {'StudentID': StudentID, "AccountType": "照明"},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            if (json.code == 200) {
                if (RoomId == null) {
                    RoomId = json.info[0].RoomID;
                    TrunPage.setKeyValue("RoomId", RoomId);
                    console.log(RoomId);
                    getStudents(RoomId);
                }
                //填充数据
                zhaoming.accountList[0].value = json.info[0].PreChargeback + "元";
                zhaoming.accountList[1].value = json.info[0].PreSubsidy + "元";
                zhaoming.accountList[2].value = json.info[0].AccountStatus + "";

                zhaoming.yongdiandatas[0].value = json.info[0].state=="1"?true:false;
                zhaoming.yongdiandatas[1].value = json.info[0].Status==0?"正常" :json.info[0].Status==1?"恶性负载":json.info[0].Status==2?"锁定":json.info[0].Status==3?"故障":"null";

                zhaoming.dianliangxinxi[0].value = json.info[0].U + "V";
                zhaoming.dianliangxinxi[1].value = json.info[0].I + "A";
                zhaoming.dianliangxinxi[2].value = json.info[0].Power + "W";
                zhaoming.dianliangxinxi[3].value = json.info[0].PowerRate + "";
                zhaoming.dianliangxinxi[4].value = json.info[0].ElecDay + "kW·h";
                zhaoming.dianliangxinxi[5].value = json.info[0].ElecMonth + "kW·h";
                zhaoming.dianliangxinxi[6].value = json.info[0].Eletricity + "kW·h";

                // console.error("照明开关状态:"+zhaoming.yongdiandatas[0].value);
                // console.error("照明状态："+zhaoming.yongdiandatas[1].value);
            }
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");


        }
    });
    $.ajax({
        url: url + 'Inquiry_Channel',
        data: {'StudentID': StudentID, "AccountType": "空调"},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

            if(json.code==200){
                //填充数据
                kongtiao.accountList[0].value = json.info[0].PreChargeback + "元";
                kongtiao.accountList[1].value = json.info[0].PreSubsidy + "元";
                kongtiao.accountList[2].value = json.info[0].AccountStatus + "";


                kongtiao.dianliangxinxi[0].value = json.info[0].U + "V";
                kongtiao.dianliangxinxi[1].value = json.info[0].I + "V";
                kongtiao.dianliangxinxi[2].value = json.info[0].Power + "W";
                kongtiao.dianliangxinxi[3].value = json.info[0].PowerRate + "";
                kongtiao.dianliangxinxi[4].value = json.info[0].ElecDay + "kW·h";
                kongtiao.dianliangxinxi[5].value = json.info[0].ElecMonth + "kW·h";
                kongtiao.dianliangxinxi[6].value = json.info[0].Eletricity + "kW·h";

                kongtiao.yongdiandatas[0].value = json.info[0].State==1?true:false;
                kongtiao.yongdiandatas[1].value = json.info[0].Status==0?"正常" :json.info[0].Status==1?"恶性负载":json.info[0].Status==2?"锁定":json.info[0].Status==3?"故障":"null";
                // console.error("空调开关状态:"+kongtiao.yongdiandatas[0].value);
                // console.error("空调开关状态:"+kongtiao.yongdiandatas[1].value);

            }


        }
    });
}

/**
 *  {
            "StudentID": "2017202080057",
            "SName": "徐锋",
            "Faculty": "动力与机械学院",
            "Professional": "控制理论与控制工程",
            "PhoneNum": "",
            "YesorNo": "是",
            "Permission": "无"
        }
 * @param RoomId
 */
function getStudents(RoomId) {
    $.ajax({
        url: url + 'Inquiry_Room_RoomID',
        data: {"RoomID": RoomId},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            // zhaoming.students.clean();
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");
            if (json.code==200){
                zhaoming.students=[];
                for (var i = 0; i < json.info.length; i++) {
                    zhaoming.students.push(json.info[i]);
                }
            }



        }
    });
}


function openControlLogPage(type) {
    TrunPage.setKeyValue("AccountType", type);
    TrunPage.setKeyValue("token", token);
    TrunPage.setKeyValue("userId", userId);
    TrunPage.openWebView("home/ControlLog.html", 1, "状态日志");

}
