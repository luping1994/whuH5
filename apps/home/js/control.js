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
            {id: 0, type: "dianya", name: '电压', value: "--V", iconclass: "whu-icon-yuer"},
            {id: 1, type: "dianliu", name: '电流', value: "--A", iconclass: "whu-icon-yuer"},
            {id: 2, type: "gonglv", name: '功率', value: "--W", iconclass: "whu-icon-yuer"},
            {id: 4, type: "gonglvyinshu", name: '功率因数', value: "--", iconclass: "whu-icon-yuer"},
            {id: 5, type: "dayUse", name: '本日已用电量', value: "--kW·h", iconclass: "whu-icon-yuer"},
            {id: 6, type: "monthUse", name: '本月已用电量', value: "--kW·h", iconclass: "whu-icon-yuer"},
            {id: 7, type: "totalUse", name: '总用电量', value: "--kW·h", iconclass: "whu-icon-yuer"}
        ],
        students: [
            // {id: 0, type: "student", name: '张三', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 1, type: "student", name: '李四', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 2, type: "student", name: '王老五', value: "计算机学院", iconclass: "whu-icon-yuer"}
        ]
    },
    methods: {
        jumpHis: function (e) {
            console.log(e.type);
            switch (e.type) {
                case "accountInfo":
                    TrunPage.openWebView("home/ChargeRecords.html", 1, "资费记录");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "dianya":
                case "dianliu":
                case "gonglv":
                case "gonglvyinshu":
                    TrunPage.setKeyValue("hisType",e.name);
                    TrunPage.openWebView("home/UIHistroy.html", 1, "历史数据");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "dayUse":
                case "monthUse":
                case "totalUse":
                    TrunPage.setKeyValue("hisType",e.name);
                    TrunPage.openWebView("home/EleHistroy.html", 1, "用电量历史数据");
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
            {id: 0, type: "dianya", name: '电压', value: "--V", iconclass: "whu-icon-yuer"},
            {id: 1, type: "dianliu", name: '电流', value: "--A", iconclass: "whu-icon-yuer"},
            {id: 2, type: "gonglv", name: '功率', value: "--W", iconclass: "whu-icon-yuer"},
            {id: 4, type: "gonglvyinshu", name: '功率因数', value: "--", iconclass: "whu-icon-yuer"},
            {id: 5, type: "dayUse", name: '本日已用电量', value: "--kW·h", iconclass: "whu-icon-yuer"},
            {id: 6, type: "monthUse", name: '本月已用电量', value: "--kW·h", iconclass: "whu-icon-yuer"},
            {id: 7, type: "totalUse", name: '总用电量', value: "--kW·h", iconclass: "whu-icon-yuer"}
        ],
        students: [
            // {id: 0, type: "student", name: '张三', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 1, type: "student", name: '李四', value: "计算机学院", iconclass: "whu-icon-yuer"},
            // {id: 2, type: "student", name: '王老五', value: "计算机学院", iconclass: "whu-icon-yuer"}
        ]
    },
    methods: {
        jumpHis: function (e) {
            console.log(e.type);
            switch (e.type) {
                case "accountInfo":
                    TrunPage.openWebView("home/ChargeRecords.html", 1, "资费记录");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "dianya":
                case "dianliu":
                case "gonglv":
                case "gonglvyinshu":
                    TrunPage.openWebView("home/UIHistroy.html", 1, "历史数据");
                    // window.location.href='ChargeRecords.html';
                    break;
                case "dayUse":
                case "monthUse":
                case "totalUse":
                    TrunPage.setKeyValue("hisType",e.name);
                    TrunPage.openWebView("home/EleHistroy.html", 1, "用电量历史数据");
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


