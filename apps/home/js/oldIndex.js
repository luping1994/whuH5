var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
// var m_sign = "";
var accountType;
var userId;
var token;

function loadPage() {
    getData();
}

function getData() {
    $.ajax({
        url: url + 'Login',
        data: {'Sign': m_sign},
        type: 'POST',
        dataType: "json",
        success: function (json) {
            // TrunPage.showToast("登录成功!");

            //初始化容器样式
            console.log(json.token.access_token);
            token = json.token.access_token;
            accountType = "照明";
            userId = json.user.UserID;

            getChannel(userId, accountType);
            setInterval("getChannel(userId,accountType)", 5000);
            //存储
            TrunPage.setKeyValue("token", token);
            TrunPage.setKeyValue("userId", userId);
        }
    });
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

            //填充数据
            zhaoming.accountList[0].value = json.info[0].PreChargeback + "元";
            zhaoming.accountList[1].value = json.info[0].PreSubsidy + "元";
            zhaoming.accountList[2].value = json.info[0].AccountStatus + "";

            zhaoming.dianliangxinxi[0].value = json.info[0].U + "V";
            zhaoming.dianliangxinxi[1].value = json.info[0].I + "V";
            zhaoming.dianliangxinxi[2].value = json.info[0].Power + "W";
            zhaoming.dianliangxinxi[3].value = json.info[0].PowerRate + "";
            zhaoming.dianliangxinxi[4].value = json.info[0].ElecDay + "kW·h";
            zhaoming.dianliangxinxi[5].value = json.info[0].ElecMonth + "kW·h";
            zhaoming.dianliangxinxi[6].value = json.info[0].Eletricity + "kW·h";

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

            console.log(json)
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

        }
    });
}

function openControlLogPage() {
    TrunPage.openWebView("home/ControlLog.html", 1, "资费记录");

}
