var m_sign="{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}\n";
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
            //初始化容器样式
            console.log(json.token.access_token);
            token = json.token.access_token;

            getChannel(json.user.UserID,"照明");
        }
    });
    // TrunPage.setProgressBarVisibility(true);
    // TrunPage.getSignUser(function (data) {
    //     m_sign = data;
    //
    // });

}

function getDetail() {
    TrunPage.openWebView("demo/www/infoDetail.html", 1, "信息详情");
}

function getChannel(StudentID,AccountType) {
    $.ajax({
        url: url + 'Inquiry_Channel',
        data: {'StudentID': StudentID,"AccountType":AccountType},
        type: 'POST',
        headers: {
            'Authorization': "Bearer "+token
        },
        dataType: "json",
        success: function (json) {
            //初始化容器样式
            console.log(json);
        }
    });
}
