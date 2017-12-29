bindTab();
bindPullRefresh();
bindSwiper();

var activeIndex;
var swipper;
var tab;
var webView = new webView();

function bindTab() {

    tab = new auiTab({
        element: document.getElementById("tab"),
        index: 1,
        repeatClick: false
    }, function (ret) {
        if (swipper) {
            swipper.slideTo(ret.index - 1, 400, false);
        }

        console.log("位置" + ret.index + "," + ret.dom);
    });
}

function bindSwiper() {
    swipper = new Swiper(".swiper-container", {
        speed: 400,
        spaceBetween: 10,
        on: {
            slideChangeTransitionEnd: function () {
                activeIndex = this.activeIndex;
                console.log(activeIndex);
                tab.setActive(activeIndex + 1);
            }
        }
    });
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


// 注册
Vue.component('account-list', {
    props: ['lists'],
    template: '  <li class="aui-list-item"  @click="jumpHis(item)">' +
    '                    <div class="aui-list-item-label-icon">' +
    '                        <i class="aui-iconfont whu-icon-yuer"></i>' +
    '                    </div>' +
    '                    <div class="aui-list-item-inner aui-list-item-arrow">' +
    '                        <div class="aui-list-item-title">{{lists.name}}</div>' +
    '                        <div class="aui-list-item-right">{{lists.value}}</div>' +
    '                    </div>' +
    '                </li>'
});

var zhaoming = new Vue({
    el: '#zhaoming',
    data: {
        accountList: [
            {id: 0, type: "accountInfo", name: '账户余额', value: "--元", iconclass: "whu-icon-yuer"},
            {id: 1, type: "accountInfo", name: '剩余补贴', value: "--度", iconclass: "whu-icon-yuer"},
            {id: 2, type: "accountInfo", name: '账户状态', value: "--", iconclass: "whu-icon-yuer"}
        ],
        yongdiandatas: [
            {
                id: 0,
                type: "switchControl",
                name: '开关状态',
                value: false,
                src: "image/switch_off.svg",
                iconclass: "whu-icon-yuer"
            },
            {id: 1, type: "switchControl", name: '状态描述', value: "正常", iconclass: "whu-icon-yuer"},
        ],
        sushedatas: [
            {id: 0, name: "信息学部-10舍东-101"}
        ],
        dianliangxinxi: [
            {id: 0, type: "U", name: '电压', value: "--V", icon_class: "whu-student-icon",unit:"V"},
            {id: 1, type: "I", name: '电流', value: "--A", icon_class: "whu-icon-yuer",unit:"A"},
            {id: 2, type: "Power", name: '功率', value: "--W", icon_class: "whu-icon-yuer",unit:"W"},
            {id: 4, type: "PowerRate", name: '功率因数', value: "--", icon_class: "whu-icon-yuer",unit:""},
            {id: 5, type: "EletricityValue", name: '本日已用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"},
            {id: 6, type: "EletricityValue", name: '本月已用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"},
            {id: 7, type: "EletricityValue", name: '总用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"}
        ],
        students: [
            // {id: 0, type: "student", name: '张三', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 1, type: "student", name: '李四', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 2, type: "student", name: '王老五', value: "计算机学院", iconclass: "whu-icon-yuer"}
        ]
    },
    methods: {
        jumpHis: function (e) {
            switch (e.type) {
                case "accountInfo":
                    TrunPage.setKeyValue("AccountType","照明");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("userId",userId);
                    TrunPage.openWebView("home/ChargeRecords.html", 1, "资费记录");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "U":
                case "I":
                case "Power":
                case "PowerRate":
                    TrunPage.setKeyValue("AccountType","照明");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("Field",e.type);
                    TrunPage.setKeyValue("unit",e.unit);
                    TrunPage.setKeyValue("name",e.name);
                    TrunPage.setKeyValue("userId",userId+"");
                    TrunPage.openWebView("home/UIHistroy.html", 1, "历史数据");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "EletricityValue":
                    TrunPage.setKeyValue("AccountType","照明");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("Field",e.type);
                    TrunPage.setKeyValue("unit",e.unit);
                    TrunPage.setKeyValue("name","用电量");
                    TrunPage.setKeyValue("userId",userId+"");
                    TrunPage.openWebView("home/EleHistroy.html", 1, "历史数据");
                    break;
                default:
                    TrunPage.setKeyValue("AccountType","照明");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("name",e.SName);
                    TrunPage.setKeyValue("id",e.StudentID);
                    TrunPage.openWebView("home/StudentInfo.html", 1, e.SName);
                    break;

            }
        }
    }

});
var kongtiao = new Vue({
    el: '#kongtiao',
    data: {
        accountList: [
            {id: 0, type: "accountInfo", name: '账户余额', value: "--元", iconclass: "whu-icon-yuer"},
            {id: 1, type: "accountInfo", name: '剩余补贴', value: "--度", iconclass: "whu-icon-yuer"},
            {id: 2, type: "accountInfo", name: '账户状态', value: "--", iconclass: "whu-icon-yuer"}
        ],
        yongdiandatas: [
            {id: 0, name: '开关状态', value: false, src: "image/switch_off.svg", iconclass: "whu-icon-yuer"},
            {id: 1, name: '状态描述', value: "--", iconclass: "whu-icon-yuer"}
        ],
        sushedatas: [
            {id: 0, name: "信息学部-10舍东-101"}
        ],
        dianliangxinxi: [
            {id: 0, type: "U", name: '电压', value: "--V", icon_class: "whu-student-icon",unit:"V"},
            {id: 1, type: "I", name: '电流', value: "--A", icon_class: "whu-icon-yuer",unit:"A"},
            {id: 2, type: "Power", name: '功率', value: "--W", icon_class: "whu-icon-yuer",unit:"W"},
            {id: 4, type: "PowerRate", name: '功率因数', value: "--", icon_class: "whu-icon-yuer",unit:""},
            {id: 5, type: "EletricityValue", name: '本日已用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"},
            {id: 6, type: "EletricityValue", name: '本月已用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"},
            {id: 7, type: "EletricityValue", name: '总用电量', value: "--kW·h", icon_class: "whu-icon-yuer",unit:"kW·h"}
        ],
        students: [
            // {id: 0, type: "student", name: '张三', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 1, type: "student", name: '李四', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 2, type: "student", name: '王老五', value: "计算机学院", iconclass: "whu-icon-yuer"}
        ]
    },
    methods: {
        jumpHis: function (e) {
            switch (e.type) {
                case "accountInfo":
                    TrunPage.setKeyValue("AccountType","空调");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("userId",userId);
                    TrunPage.openWebView("home/ChargeRecords.html", 1, "资费记录");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "U":
                case "I":
                case "Power":
                case "PowerRate":
                    TrunPage.setKeyValue("AccountType","空调");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("Field",e.type);
                    TrunPage.setKeyValue("unit",e.unit);
                    TrunPage.setKeyValue("name",e.name);
                    TrunPage.setKeyValue("userId",userId+"");
                    TrunPage.openWebView("home/UIHistroy.html", 1, "历史数据");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "EletricityValue":
                    TrunPage.setKeyValue("AccountType","空调");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("Field",e.type);
                    TrunPage.setKeyValue("unit",e.unit);
                    TrunPage.setKeyValue("name","用电量");
                    TrunPage.setKeyValue("userId",userId+"");
                    TrunPage.openWebView("home/EleHistroy.html", 1, "历史数据");
                    break;
                default:
                    TrunPage.setKeyValue("AccountType","空调");
                    TrunPage.setKeyValue("token",token);
                    TrunPage.setKeyValue("name",e.SName);
                    TrunPage.setKeyValue("id",e.StudentID);
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
        if (ret == "2") {
            zhaoming.yongdiandatas[0].value = true;
        }
    })
}

function switchKongtiao() {
    var dialog = new auiDialog();

    dialog.alert({
        title: "提示",
        msg: '是否打开空调?',
        buttons: ['取消', '确定']
    }, function (ret) {
        console.log(ret)
    })
}


