var m_sign = "{\"birthday\":0,\"enterYear\":0,\"gender\":0,\"idsNo\":\"2017202080063\",\"nickName\":\"2017202080063\",\"sign\":{\"appKey\":\"6318286230\",\"check\":\"857710483f0af38fc847d1f7a88e16245825da3d\",\"nonce\":\"g33Z6kgB\",\"timestamp\":1513848361199,\"token\":\"174652e7d386559c734875e9a5054312b3dd13ff\"}}";
// var m_sign = "";
var accountType;
var userId = "";
var token;
var old = false;

function loadPage() {
    getData();
}

var toast;

function getData() {
    toast = new auiToast();
    toast.loading({
        title: "正在获取用户信息",
        duration: 2000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 3000)
    });
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

                token = json.token.access_token;
                accountType = "照明";
                userId = json.user.UserID;
                TrunPage.setKeyValue("token", token);
                TrunPage.setKeyValue("userId", userId);
                if (json.type == 1) {
                    window.location.href = 'oldIndex.html';
                } else if (json.type == 2) {
                    window.location.href = 'newIndex.html';
                }else {
                    var toast = new auiToast({});
                    toast.fail({
                        title:"现在尚不支持学生以外其他用户登录",
                        duration:2000
                    });
                }
            }else {
                console.log("身份认证失败")
            }


        }
    });
    // TrunPage.setProgressBarVisibility(true);
    // TrunPage.getSignUser(function (data) {
    //
    //     m_sign = data;
    //     if (m_sign == null) {
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
    //             // toast.hide();
    //             //初始化容器样式
    //             // console.log(json.token.access_token);
    //             if (json.code == 200) {
    //                 token = json.token.access_token;
    //                 accountType = "照明";
    //                 userId = json.user.UserID + "";
    //                 TrunPage.setKeyValue("token", token);
    //                 TrunPage.setKeyValue("userId", userId);
    //                 if (json.type == 1) {
    //                     window.location.href = 'oldIndex.html';
    //                 } else if (json.type == 2) {
    //                     window.location.href = 'newIndex.html';
    //                 }else {
    //                     var toast1 = new auiToast({});
    //                     toast1.fail({
    //                         title:"现在尚不支持学生以外其他用户登录",
    //                         duration:2000
    //                     });
    //                 }
    //
    //             } else {
    //                 toast.hide();
    //                 var toast2= new auiToast({});
    //                 toast2.fail({
    //                     title:"身份认证失败",
    //                     duration:2000
    //                 });
    //             }
    //
    //         }
    //     });
    // });
}
