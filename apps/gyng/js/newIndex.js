// var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
// var m_sign = "";
var accountType;
var userId;
var token;
var RoomId;
var Role;

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

    TrunPage.getKeyValue("Role", function (data) {
        Role = data;

    });
    TrunPage.getKeyValue("RoomId", function (data) {
        RoomId = data;
        // alert(data);
        accountType = "照明";
        if (RoomId == null || RoomId == "") {
            getChannel(userId, '');
            setInterval("getChannel(userId,accountType)", 4000);
        } else {
            getChannelByRoomID(RoomId, "");
            getStudents(RoomId);
            setInterval("getChannelState()", 4000);
        }
    });


}


/**
 * 学生通过StudentID查找宿舍信息
 * @param StudentID
 * @param AccountType
 */
function getChannel(StudentID, AccountType) {
    // TrunPage.showToast("开始请求数据");
    $.ajax({
        url: url + 'New_Inquiry_Ammeter',
        data: {'StudentID': StudentID, "AccountType": "照明"},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

            if (RoomId == null || RoomId == '') {
                RoomId = json.info[0].RoomID;
                TrunPage.setKeyValue("RoomId", RoomId);
                getStudents(RoomId);

            }

            zhaoming.amInfo.AmmeterNo = json.info[0].AmmeterNo;
            zhaoming.amInfo.RoomID = json.info[0].RoomID;
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


            zhaoming.yongdiandatas[1].value = json.info[0].Status == 0 ? "正常" : json.info[0].Status == 1 ? "恶性负载" : json.info[0].Status == 2 ? "锁定" : json.info[0].Status == 3 ? "故障" : "null";

        }
    });

}

function getChannelByRoomID(Roomid_, AccountType) {
    // TrunPage.showToast("开始请求数据");
    $.ajax({
        url: url + 'New_Inquiry_Ammeter_RoomID',
        data: {'RoomID': Roomid_, "AccountType": "照明"},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

            if (json.code == 200) {

                zhaoming.amInfo.AmmeterNo = json.info[0].AmmeterNo;
                zhaoming.amInfo.RoomID = json.info[0].RoomID;
                zhaoming.amInfo.DeviceDec = json.info[0].DeviceDec;
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


                zhaoming.yongdiandatas[0].value = json.info[0].zm == "0" ? false : true;
                zhaoming.yongdiandatas[1].value = json.info[0].kt == "0" ? false : true;

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
            for (var i = 0; i < json.info.length; i++) {
                zhaoming.students.push(json.info[i]);
            }


        }
    });
}

function getChannelState() {
    // /api/V1/New_Inquiry_Channel_Status
    $.ajax({
        url: url + 'New_Inquiry_Channel_Status',
        data: {
            "RoomID": RoomId,
            "AccountType":"照明"
        },
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {

            zhaoming.yongdiandatas[0].value = json.info.zm == "0" ? false : true;
            zhaoming.yongdiandatas[1].value = json.info.kt == "0" ? false : true;
        }
    });
}

function openControlLogPage() {
    TrunPage.setKeyValue("RoomID", RoomId);
    TrunPage.setKeyValue("AccountType", "照明");
    TrunPage.setKeyValue("token", token);
    TrunPage.setKeyValue("userId", userId);
    TrunPage.openWebView("gyng/ControlLog.html", 1, "状态日志");

}
