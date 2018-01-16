// var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
// var m_sign = "{\"birthday\":684950400000,\"dept\":{\"code\":\"\",\"name\":\"基础医学院\"},\"enterYear\":0,\"gender\":0,\"idsNo\":\"2014203010003\",\"major\":{\"code\":\"\",\"name\":\"生理学\"},\"nickName\":\"林弘毅_2014203010003\",\"realName\":\"林弘毅\",\"sign\":{\"appKey\":\"7196614560\",\"check\":\"4307f320a27c2fa38aa2ced0637640cb1b995f36\",\"nonce\":\"P38QWfOJ\",\"timestamp\":1514438827411,\"token\":\"f654a24e2dca3dd4caf2fb39cd4546b9257d8ea7\"}}";
// var m_sign="{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080061\",\"nickName\":\"2017202080061\",\"sign\":{\"appKey\":\"2174851922\",\"check\":\"07ed7680d8f9f00a04132544f599b8dc3f83f3c8\",\"nonce\":\"Qt39CaXC\",\"timestamp\":1515745457500,\"token\":\"1556c866a7d6560b85b7ac31cecf38fbfb24f771\"}}";
var m_sign;
var accountType;

var userId = "";
var token;
var old = false;
var loginData;
function loadPage() {
    // TrunPage.setBackClose();
    getData();
}

var toast;

function getData() {
    // toast = new auiToast();
    // toast.loading({
    //     title: "获取数据中...请稍后",
    //     duration: 2000
    // }, function (ret) {
    //     console.log(ret);
    //     setTimeout(function () {
    //         toast.hide();
    //     }, 3000)
    // });
    // $.ajax({
    //     url: url + 'Login',
    //     data: {'Sign': m_sign},
    //     type: 'POST',
    //     dataType: "json",
    //     success: function (json) {
    //         // TrunPage.showToast("登录成功!");
    //
    //         // toast.hide();
    //         //初始化容器样式
    //         // console.log(json.token.access_token);
    //         if (json.code == 200) {
    //             loginData = json;
    //             token = json.token.access_token;
    //
    //             accountType = "照明";
    //             userId = json.user.UserID;
    //
    //             TrunPage.setKeyValue("token", token);
    //             TrunPage.setKeyValue("userId", userId);
    //
    //
    //         } else {
    //             console.log("身份认证失败");
    //         }
    //
    //
    //     }
    // });
    TrunPage.getSignUser(function (data) {

        m_sign = data;
        if (m_sign == null) {
            TrunPage.showToast("请先登录!");

            return
        }
        $.ajax({
            url: url + 'Login',
            data: {'Sign': m_sign},
            type: 'POST',
            dataType: "json",
            success: function (json) {
                // TrunPage.showToast("登录成功!");

                // toast.hide();
                //初始化容器样式
                // console.log(json.token.access_token);
                if (json.code == 200) {
                    loginData = json;
                    token = json.token.access_token;
                    userId = json.user.UserID;
                    TrunPage.setKeyValue("token", token);
                    TrunPage.setKeyValue("userId", userId);
                    if(loginData.user.Role == 4){
                        $('#susheText').html("我的宿舍")
                    }else {
                        $('#susheText').html("宿舍管理")

                    }
                } else {
                    console.log("身份认证失败")
                }


            }
        });
    });

}
