function loadPage() {
    init();
}

function init() {

    console.error("init");
    var activeIndex;
    var swipper = new Swiper(".swiper-container", {
        speed: 400,
        spaceBetween: 10,
        on: {
            slideChangeTransitionEnd: function () {
                activeIndex = this.activeIndex;
                if (activeIndex == 0) {
                    tabbar.index0 = true;
                    tabbar.index1 = false;
                    tabbar.index2 = false;
                }
                if (activeIndex == 1) {
                    tabbar.index0 = false;
                    tabbar.index1 = true;
                    tabbar.index2 = false;
                }
                if (activeIndex == 2) {
                    tabbar.index0 = false;
                    tabbar.index1 = false;
                    tabbar.index2 = true;
                }
                console.log(activeIndex);

            }
        }
    });

    //    var area = $("#Area,#BuildingAndUnit,#Floor");
    //    area.select2();
    var tabbar = new Vue({
        el: "#bar",
        data: {
            index0: true,
            index1: false,
            index2: false
        },
        methods: {
            tab1Click: function (event) {

                this.index0 = true;
                this.index1 = false;
                this.index2 = false;
                swipper.slideTo(0, 400, false);
            },
            tab2Click: function (event) {

                this.index0 = false;
                this.index1 = true;
                this.index2 = false;
                swipper.slideTo(1, 400, false);

            },
            tab3Click: function (event) {

                this.index0 = false;
                this.index1 = false;
                this.index2 = true;
                swipper.slideTo(2, 400, false);

            }
        }
    });
    var roomPage = new Vue({
        el: '#roomPage',
        data: {
            roomLists: [
                {
                    id: 0,
                    type: "room",
                    name: '101',
                    zhaoming: "",
                    icon_class: "iconfont icon-fangzi c2 f1",
                    zhaomingStatus: false,
                    kongtiaoStatus: true
                },
                {
                    id: 1,
                    type: "room",
                    name: '102',
                    zhaoming: "",
                    icon_class: "iconfont c2 f1 icon-fangzi",
                    zhaomingStatus: true,
                    kongtiaoStatus: true
                },
                {
                    id: 2,
                    type: "room",
                    name: '103',
                    zhaoming: "",
                    icon_class: "iconfont icon-fangzi c2 f1",
                    zhaomingStatus: false,
                    kongtiaoStatus: true
                }
            ]

        }
    });
    var stuPage = new Vue({
        el: '#studentPage',
        data: {

            students: [
                {
                    id: 0,
                    type: "stu",
                    name: '张三',
                    zhuanye: "测绘学院"
                },
                {
                    id: 1,
                    type: "stu",
                    name: '李四',
                    zhuanye: "测绘学院"

                },
                {
                    id: 2,
                    type: "stu",
                    name: '王大剑',
                    zhuanye: "测绘学院"

                }
            ]

        }
    });
    var zonghePage = new Vue({
        el: '#zonghePage',
        data: {

            zongheDatas: {
                "GetTime": "2017-12-21 10:42:49",
                "VolA": "229.60",
                "VolB": "231.50",
                "VolC": "232.40",
                "IA": "18.60",
                "IB": "27.600",
                "IC": "19.80",
                "ActivePower": "12.00",
                "ReactivePower": "1.80",
                "PowerRateC": "0.09",
                "Electricity": "135346.80",
                "ElecDay": "170.40",
                "ElecMonth": "7358.40",
                "LossDay": "27.57",
                "LossMonth": "1046.80",
                "LossSum": "59467.93",
                "LossRateDay": "16.18",
                "LossRateMonth": "14.23",
                "LossRateSum": "43.94",
                "PreSaveDay": "40.00",
                "PreSaveMonth": "3645.00",
                "PreSaveYear": "36374.00",
                "PreSaveSum": "43852.00",
                "ChargeDay": "82.84",
                "ChargeMonth": "3660.73",
                "ChargeYear": "37644.20",
                "ChargeSum": "44121.53",
                "SubsidyDay": "0.00",
                "SubsidyMonth": "0.00",
                "SubsidySum": "0.00"
            }

        }
    });

    // var title = ['工学部', '1舍1单元', '6层'];
    // $.each(title, function (k, v) {
    //     title[k] = '<option value="">' + v + '</option>';
    //     console.log(title[k])
    // });
    //
    // $('#Area,#Area1').append(title[0]);
    // $('#BuildingAndUnit,#BuildingAndUnit1').append(title[1]);
    // $('#Floor,#Floor1').append(title[2]);
    // $('#Area,#BuildingAndUnit,#Floor').select2();
    // $('#Area1,#BuildingAndUnit1,#Floor1').select2();


    // var loc = new Location();
    // var items = loc.items;
    //
    // $.each(items, function (k, v) {
    //     var area = '<option value="">' + v.Area + '</option>';
    //     console.log(area);
    //     $('#Area,#Area1').append(area);
    //
    //
    // });
    //
    // $.each(items[0].Lists, function (k1, v1) {
    //     var building = '<option value="">' + v1.Building + '</option>';
    //     console.log(building);
    //     $('#BuildingAndUnit,#BuildingAndUnit1').append(building);
    //
    // });
    //
    // $.each(items[0].Lists[0].Lists[0].Lists, function (k1, v1) {
    //     var floor = '<option value="">' + v1 + '</option>';
    //
    //     $('#Floor,#Floor1').append(floor);
    //
    // });
    //
    // $('#Area,#BuildingAndUnit,#Floor').select2();
    // $('#Area1,#BuildingAndUnit1,#Floor1').select2();
    //
    // var loaction = new Location();
    // var arrAll = loaction.items;
    // var vm = new Vue({
    //     el: '#zonghePage',
    //     data: {
    //         arr: arrAll,
    //         area: '医学部',
    //         building: '1舍',
    //         unit: "1单元",
    //         floor: '1楼',
    //         buildingArr: [],
    //         floorArr: [],
    //         datas:{}
    //     },
    //     methods: {},
    //     beforeMount: function () {
    //
    //     },
    //     watch: {}
    // });

}

var zongheArea="";
var zongheBuilding="";
var zongheFloor="";

function showPicker(type) {
    console.log("showPicker");
    var lc = new Location();
    var items = lc.items;
    var options = [];
    $.each(items, function (k, v) {

        var Area = {
            label: v.Area,
            value: v.Area,
            children: []
        };
        $.each(v.Lists, function (k1, v1) {
            $.each(v1.Lists, function (k2, v2) {

                var build = {
                    label: v1.Building + '-' + v2.Unit,
                    value: v1.Building + '-' + v2.Unit,
                    children: []
                };
                $.each(v2.Lists, function (k3, v3) {
                    build.children.push(v3+"楼");
                });
                Area.children.push(build);
            });
        });
        options.push(Area);
    });
    zongheArea =items[0].Area;
    zongheBuilding=items[0].Lists[0].Building+items[0].Lists[0].Lists[0].Unit;
    zongheFloor=items[0].Lists[0].Lists[0].Lists[0];

    weui.picker(options, {
        className: 'building',
        container: 'body',
        defaultValue: options[0],
        onChange: function (result) {

        },
        onConfirm: function (result) {
            console.log(result)
        },
        id: 'doubleLinePicker'
    });
}

var gettingData = false;

function getThreephaseData(Area, Building, Unit, AccountType) {
    $.ajax({
        url: url + 'Inquiry_Threephase_R',
        data: {
            "Area": Area,
            "Building": Building,
            "Unit": Unit,
            "AccountType": AccountType
        },
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {

            // zhaoming.students.clean();
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");
            console.log(json);
            var totleCharge = 0;
            if (json.code == 200) {


            } else {
                console.log(json.message)
            }
            gettingData = false;
        },
        error: function (e) {
            gettingData = false;
        }
    });
}