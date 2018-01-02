bindTab();
bindPullRefresh();
bindSwiper();

var activeIndex;
var swipper;
var tab;
var webView = new webView();

function bindTab() {


}

function bindSwiper() {

}

function bindPullRefresh() {
    var pullRefresh = new auiPullToRefresh({
        container: document.querySelector('.aui-refresh-content'),
        triggerDistance: 100,

    }, function (ret) {
        if (ret.status == "success") {
            setTimeout(function () {
                pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
            }, 1500)
        }
    })

}


var zhaoming = new Vue({
    el: '#zhaoming',
    data: {
        accountList: [
            {id: 0, type: "accountInfo", name: '账户余额', value: "--元", icon_class: "iconfont icon-yue c1 f1"},
            {id: 1, type: "accountInfo", name: '剩余补贴', value: "--度", icon_class: " iconfont c1 f1 icon-butie"},
            {id: 2, type: "accountInfo", name: '账户状态', value: "--", icon_class: "iconfont icon-zhuangtai c1 f1"}
        ],
        yongdiandatas: [
            {
                id: 0,
                type: "switchControl",
                name: '照明开关状态',
                value: false,
                src: "image/switch_off.svg",
                icon_class: "whu-icon-yuer"
            },
            {
                id: 1,
                type: "switchControl",
                name: '空调开关状态',
                value: false,
                src: "image/switch_off.svg",
                icon_class: "whu-icon-yuer"
            },
            {
                id: 2,
                type: "switchStatus",
                name: '状态描述',
                value: "正常",
                icon_class: "whu-icon-yuer"
            }
        ],
        sushedatas: [
            {id: 0, name: "信息学部-10舍东-101"}
        ],
        dianliangxinxi: [
            {id: 0, type: "U", name: '电压', value: "--V", icon_class: "icon-dianya iconfont c1 f1", unit: "V"},
            {id: 1, type: "I", name: '电流', value: "--A", icon_class: "icon-50 iconfont c1 f1", unit: "A"},
            {id: 2, type: "Power", name: '功率', value: "--W", icon_class: "icon-47 iconfont c1 f1", unit: "W"},
            {id: 4, type: "PowerRate", name: '功率因数', value: "--", icon_class: "iconfont icon-49 c1 f1", unit: ""},
            {
                id: 5,
                type: "EletricityValue",
                name: '本日已用电量',
                value: "--kW·h",
                icon_class: "iconfont icon-68 c1 f1",
                unit: "kW·h"
            },
            {
                id: 6,
                type: "EletricityValue",
                name: '本月已用电量',
                value: "--kW·h",
                icon_class: "iconfont icon-68 c1 f1",
                unit: "kW·h"
            },
            {
                id: 7,
                type: "EletricityValue",
                name: '总用电量',
                value: "--kW·h",
                icon_class: "iconfont icon-68 c1 f1",
                unit: "kW·h"
            }
        ],
        students: []
    },
    methods: {
        jumpHis: function (e) {

            switch (e.type) {
                case "accountInfo":
                    TrunPage.setKeyValue("AccountType", "照明");
                    TrunPage.setKeyValue("token", token);
                    TrunPage.setKeyValue("userId", userId);
                    TrunPage.openWebView("home/ChargeRecords.html", 1, "资费记录");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "U":
                case "I":
                case "Power":
                case "PowerRate":
                    TrunPage.setKeyValue("AccountType", "照明");
                    TrunPage.setKeyValue("token", token);
                    TrunPage.setKeyValue("Field", e.type);
                    TrunPage.setKeyValue("unit", e.unit);
                    TrunPage.setKeyValue("name", e.name);
                    TrunPage.setKeyValue("userId", userId + "");
                    TrunPage.openWebView("home/UIHistroy.html", 1, "历史数据");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "EletricityValue":
                    TrunPage.setKeyValue("AccountType", "照明");
                    TrunPage.setKeyValue("token", token);
                    TrunPage.setKeyValue("Field", e.type);
                    TrunPage.setKeyValue("unit", e.unit);
                    TrunPage.setKeyValue("name", "用电量");
                    TrunPage.setKeyValue("userId", userId + "");
                    TrunPage.openWebView("home/EleHistroy.html", 1, "历史数据");
                    break;
                default:
                    TrunPage.setKeyValue("AccountType", "照明");
                    TrunPage.setKeyValue("token", token);
                    TrunPage.setKeyValue("name", e.SName);
                    TrunPage.setKeyValue("id", e.StudentID);
                    TrunPage.openWebView("home/StudentInfo.html", 1, e.SName);
                    break;

            }
        }
    }

});


function switchZhaoming() {
    var dialog = new auiDialog();

    var msgs = zhaoming.yongdiandatas[0].value == false ? "是否打开照明?" : "是否关闭照明";
    dialog.alert({
        title: "提示",
        msg: msgs,
        buttons: ['取消', '确定']
    }, function (ret) {
        if (ret.buttonIndex == 2)
            zhaoming.yongdiandatas[0].value = !zhaoming.yongdiandatas[0].value;
    })
}

function switchKongtiao() {
    var dialog = new auiDialog();
    var msgs = zhaoming.yongdiandatas[1].value == false ? "是否打开空调?" : "是否关闭空调";

    dialog.alert({
        title: "提示",
        msg: msgs,
        buttons: ['取消', '确定']
    }, function (ret) {
        if (ret.buttonIndex == 2)
            zhaoming.yongdiandatas[1].value = !zhaoming.yongdiandatas[1].value;
    })
}


