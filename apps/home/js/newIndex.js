var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
// var m_sign = "";
var accountType;
var userId;
var token;
var RoomId;
function loadPage() {
    getData();
}

function getData() {

    TrunPage.getKeyValue("token", function (data) {
        token = data;
    });
    TrunPage.getKeyValue("userId", function (data) {
        userId = data;
    });
    accountType = "照明";
    getChannel(userId, accountType);
    setInterval("getChannel(userId,accountType)", 5000);

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
        data: {'StudentID': StudentID, "AccountType": AccountType},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

            if (RoomId==null){
                RoomId = json.info[0].RoomID;
                TrunPage.setKeyValue("RoomId",RoomId);

                getStudents(RoomId);
            }

            //填充数据
            zhaoming.accountList[0].value = json.info[0].PreChargeback + "元";
            zhaoming.accountList[1].value = json.info[0].PreSubsidy + "元";
            zhaoming.accountList[2].value = json.info[0].AccountStatus + "";



            zhaoming.dianliangxinxi[0].value = json.info[0].U + "V";
            zhaoming.dianliangxinxi[1].value = json.info[0].I + "A";
            zhaoming.dianliangxinxi[2].value = json.info[0].Power + "W";
            zhaoming.dianliangxinxi[3].value = json.info[0].PowerRate + "";
            zhaoming.dianliangxinxi[4].value = json.info[0].ElecDay + "kW·h";
            zhaoming.dianliangxinxi[5].value = json.info[0].ElecMonth + "kW·h";
            zhaoming.dianliangxinxi[6].value = json.info[0].Eletricity + "kW·h";



            zhaoming.yongdiandatas[1].value = json.info[0].status==0?"正常" :json.info[0].status==1?"恶性负载":json.info[0].status==2?"锁定":json.info[0].status==3?"故障":"null";

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
            for(var i=0;i<json.info.length;i++){
                zhaoming.students.push(json.info[i]);
            }


        }
    });
}

function openControlLogPage() {
    TrunPage.setKeyValue("AccountType","照明");
    TrunPage.setKeyValue("token",token);
    TrunPage.setKeyValue("userId",userId);
    TrunPage.openWebView("home/ControlLog.html", 1, "状态日志");

}
