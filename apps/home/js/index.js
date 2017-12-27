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
            // console.log(json.token.access_token);
            token = json.token.access_token;
            accountType = "照明";
            userId = json.user.UserID;
            TrunPage.setKeyValue("token", token);
            TrunPage.setKeyValue("userId", userId);
            if("1"=="1"){
                window.location.href='oldIndex.html';
            }else {
                window.location.href='newIndex.html';

            }


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
