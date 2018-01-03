var userId;

function loadPage() {
    TrunPage.getKeyValue("token", function (data) {
        init(data);
    });
    TrunPage.getKeyValue("userId", function (data) {
        userId = data;
    });

}

var token;

var swipper;
var menu;
var tabbar;
var roomPage;
var stuPage;
var zonghePage;

//菜单栏
var area;
var building;
var unit;
var floor;

//综合菜单
var zAccountType = '照明';

function init(_token) {
    // token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhlMTEzNTIyZGY0OTE4NDIzMWJmMmVjZTdkZmQ3Y2RjYTdmNTdlNzBiYjNhMDg4N2M5NWE4OWNlOGIxOGY1ZWUwNWEwMWFlMjg0MTk5NmUwIn0.eyJhdWQiOiIyIiwianRpIjoiOGUxMTM1MjJkZjQ5MTg0MjMxYmYyZWNlN2RmZDdjZGNhN2Y1N2U3MGJiM2EwODg3Yzk1YTg5Y2U4YjE4ZjVlZTA1YTAxYWUyODQxOTk2ZTAiLCJpYXQiOjE1MTQ4NTYyNzYsIm5iZiI6MTUxNDg1NjI3NiwiZXhwIjoxNTE1Mjg4Mjc2LCJzdWIiOiIyMDE0MjAzMDEwMDAzIiwic2NvcGVzIjpbXX0.LwsmkO317pbBaohi_H0hhvpaKaHp4o7x1eHtB9M0vJxRghm_D1uusNp012gK6kfWcvFJBocn5yFtc0wvihMYrPF-QYstnHf_nV9WNlBIM38-4AsAk8DxGfo5ZYwoJgZq1Ep3XQVBtRrwZcBO25b_zIHgsFHoHd40NljdjjR-9uQQ6bNb2xsm-qgZZ7pIoglFyFgaoxQh3e71cqp80BTxvK5PycRgmqxFvq1CTXleUGVGEO-2cgtKO6Rayzv2N0bSzXaVOIeRmk4EsgXAm95zVX34_Gz1M7m08KJB0oHrTQHb-FDbRulSJCiQBg1IzcnifawRK1njFoRwY_ReQiE41KwprPVct35aA15dgXgDlv_deIGTFVPYfDgv9nVQh_d2eI0opEX2GxgSEC7rpLbC9FXHZNf3yy6QVoVxVR7l9AfuNdMWSIcJL0iz83pKvo0B0kRNcV4ra6aw4kpvurvfq4qXqCY3VGqBBSG944VO5gINQdsHqw7V6Ccj-mg6Zl7GCP9sCizheVvOU6z5f92F9ZScSbmm8K-LFn-r1RFjgGyWWLwH8fJX-1r5HV-ILM11a4jkaIt-K-vJUIsRYGHUIkjntImpXryRE5H9EoqGry_cFq1Ozufx5HJSxZm5UPVPuV3IDbkeVOZ_mvwVmHFtRaeeklTmr8-dCOcGyaFUjZM";
    token = _token;
    var activeIndex;
    swipper = new Swiper(".swiper-container", {
        speed: 400,
        spaceBetween: 10,
        on: {
            slideChangeTransitionEnd: function () {
                activeIndex = this.activeIndex;
                if (activeIndex == 0) {
                    tabbar.index0 = true;
                    tabbar.index1 = false;
                    tabbar.index2 = false;

                    getRooms(area, building, unit, floor);
                    switchMenu(sushe);

                }
                if (activeIndex == 1) {
                    tabbar.index0 = false;
                    tabbar.index1 = true;
                    tabbar.index2 = false;
                    getStudents(area, building, unit, floor);
                    switchMenu(xueshen);


                }
                if (activeIndex == 2) {
                    tabbar.index0 = false;
                    tabbar.index1 = false;
                    tabbar.index2 = true;
                    switchMenu(zonghe);

                }

            }
        }
    });

    menu = new Vue({
        el: "#menu",
        data: {
            Area: "1",
            Building: "2",
            Floor: "3"
        }
    });

    //    var area = $("#Area,#BuildingAndUnit,#Floor");
    //    area.select2();
    tabbar = new Vue({
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
                getRooms(area, building, unit, floor);
                scrollTo(0, 0);
                switchMenu(sushe);

            },
            tab2Click: function (event) {

                this.index0 = false;
                this.index1 = true;
                this.index2 = false;
                swipper.slideTo(1, 400, false);
                getStudents(area, building, unit, floor);
                scrollTo(0, 0);
                switchMenu(xueshen);


            },
            tab3Click: function (event) {

                this.index0 = false;
                this.index1 = false;
                this.index2 = true;
                swipper.slideTo(2, 400, false);
                getThreephaseData(area, building, unit, "照明");
                scrollTo(0, 0);
                switchMenu(zonghe);
            }
        }
    });

    //房间页面
    roomPage = new Vue({
        el: '#roomPage',
        data: {
            roomLists: [],
            area: ""
        },
        methods: {
            jumpRoomDetail: function (e) {

                var t = e.type;
                TrunPage.setKeyValue("token", token);
                TrunPage.setKeyValue("RoomId", e.RoomID);

                TrunPage.setKeyValue("Role", "admin");
                if (t == 1) {
                    TrunPage.openWebView("home/oldIndex.html",1,e.RoomNum);
                } else if (t == 2) {
                    TrunPage.openWebView("home/newIndex.html",1,e.RoomNum);
                }

            },
            switchZhaoming1: function (e) {

                // switchZhaoming(e);
            },

            switchKongtiao1: function (e) {
                // switchKongtiao(e);
            }
        }
    });

    //学生页面
    stuPage = new Vue({
        el: '#studentPage',
        data: {

            students: [],
            area: ''

        },
        methods: {
            jumpStudetail: function (e) {

                TrunPage.setKeyValue("AccountType", "照明");
                TrunPage.setKeyValue("token", token);
                TrunPage.setKeyValue("name", e.SName);
                TrunPage.setKeyValue("id", e.StudentID);
                TrunPage.openWebView("home/StudentInfo.html", 1, e.SName);

            }
        }
    });
    zonghePage = new Vue({
        el: '#zonghePage',
        data: {

            area: '',
            zongheDatas: {
                "GetTime": "2017-12-21 10:42:49",
                "VolA": "--",
                "VolB": "--",
                "VolC": "--",
                "IA": "--",
                "IB": "--",
                "IC": "--",
                "ActivePower": "--",
                "ReactivePower": "--",
                "PowerRateC": "--",
                "Electricity": "--",
                "ElecDay": "--",
                "ElecMonth": "--",
                "LossDay": "--",
                "LossMonth": "--",
                "LossSum": "--",
                "LossRateDay": "--",
                "LossRateMonth": "--",
                "LossRateSum": "--",
                "PreSaveDay": "--",
                "PreSaveMonth": "--",
                "PreSaveYear": "--",
                "PreSaveSum": "--",
                "ChargeDay": "--",
                "ChargeMonth": "--",
                "ChargeYear": "--",
                "ChargeSum": "--",
                "SubsidyDay": "--",
                "SubsidyMonth": "--",
                "SubsidySum": "--"
            }

        }
    });

    getMenuItem();


}


var xueshen = "xueshen";
var sushe = "sushe";
var zonghe = "zonghe";

function switchMenu(page) {
    switch (page) {
        case sushe:
        case xueshen:
            menu.Area = area;
            menu.Building = building + unit;
            menu.Floor = floor + '层';
            break;
        case zonghe:
            menu.Area = area;
            menu.Building = building + unit;
            menu.Floor = zAccountType;
            break
    }
}

var pages = ["Sushe", "Xueshen", "Zonghe"];
var items = [];

function showPicker() {

    var type = pages[swipper.activeIndex];


    if (type == "Sushe" || type == "Xueshen") {
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
                        label: v1.Building + v2.Unit,
                        value: v1.Building + v2.Unit,
                        building: v1.Building,
                        unit: v2.Unit,
                        children: []
                    };
                    $.each(v2.Lists, function (k3, v3) {
                        build.children.push({
                            label: v3 + "层",
                            value: v3
                        });
                    });
                    Area.children.push(build);
                });
            });
            options.push(Area);
        });

        weui.picker(options, {
            className: 'building',
            container: 'body',
            defaultValue: options[0],
            onChange: function (result) {

            },
            onConfirm: function (result) {
                console.log(result);
                menu.Area = result[0].label;
                menu.Building = result[1].label;
                menu.Floor = result[2].label;

                if (type == "Sushe") {

                    area = result[0].value;
                    building = result[1].building;
                    unit = result[1].unit;
                    floor = result[2].value;


                    if (roomPage.area == (area + building + unit + floor)) {
                        return
                    }
                    getRooms(area, building, unit, floor);

                } else {
                    area = result[0].value;
                    building = result[1].building;
                    unit = result[1].unit;
                    floor = result[2].value;

                    if (stuPage.area == (area + building + unit + floor)) {
                        return
                    }
                    getStudents(area, building, unit, floor);
                }
            },
            id: 'susheAndxueshen'
        });
    } else {
        var options = [];
        var accountT = ["照明", "空调"];
        $.each(items, function (k, v) {

            var Area = {
                label: v.Area,
                value: v.Area,
                children: []
            };
            $.each(v.Lists, function (k1, v1) {
                $.each(v1.Lists, function (k2, v2) {
                    var build = {
                        label: v1.Building + v2.Unit,
                        value: v1.Building + v2.Unit,
                        building: v1.Building,
                        unit: v2.Unit,
                        children: []
                    };
                    $.each(accountT, function (k3, v3) {
                        build.children.push({
                            label: v3,
                            value: v3
                        });
                    });
                    Area.children.push(build);
                });
            });
            options.push(Area);
        });

        weui.picker(options, {
            className: 'building',
            container: 'body',
            defaultValue: options[0],
            onChange: function (result) {

            },
            onConfirm: function (result) {
                console.log(result);
                menu.Area = result[0].label;
                menu.Building = result[1].label;
                menu.Floor = result[2].label;


                zAccountType = result[2].value;


                if (zonghePage.area == (area + building + unit + zAccountType)) {
                    return
                }
                getThreephaseData(area, building, unit, zAccountType);

            },
            id: 'zonghe'
        });
    }

}

var gettingData = false;

function getThreephaseData(Area, Building, Unit, AccountType) {

    if (zonghePage.area == (Area + Building + Unit + AccountType)) {
        return
    }
    var toast = new auiToast();
    toast.loading({
        title: "加载数据中...",
        duration: 50000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 5000)
    });
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
                zonghePage.zongheData = null;

                zonghePage.zongheDatas = json.info[0];
                zonghePage.area = Area + '-' + Building + Unit + '-' + AccountType;
            } else {
                console.log(json.message)
            }
            toast.hide();

        },
        error: function (e) {
            toast.hide();
            new auiToast()
                .fail({
                    title: "获取数据失败",
                    duration: 2000
                });
        }
    });
}

function getRooms(Area, Building, Unit, Floor) {
    console.log((Area + Building + Unit + Floor));
    console.log(roomPage.area);
    if (roomPage.area == (Area + Building + Unit + Floor)) {
        return
    }
    var toast = new auiToast();
    toast.loading({
        title: "加载数据中...",
        duration: 50000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 5000)
    });
    $.ajax({
        url: url + 'Inquiry_Building_Detail',
        data: {
            "Area": Area,
            "Building": Building,
            "Unit": Unit,
            "Floor": Floor
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
            if (json.code == 200) {
                roomPage.roomLists = [];
                for (var i = 0; i < json.info.length; i++) {
                    roomPage.roomLists.push(json.info[i]);
                }
                roomPage.area = Area + Building + Unit + Floor;
            } else {
                console.log(json.message)
            }
            toast.hide();
        },
        error: function (e) {
            toast.hide();
            new auiToast()
                .fail({
                    title: "获取数据失败",
                    duration: 2000
                });
        }
    });
}

function getStudents(Area, Building, Unit, Floor) {
    if (stuPage.area == (Area + Building + Unit + Floor)) {
        return
    }

    var toast = new auiToast();
    toast.loading({
        title: "加载数据中...",
        duration: 50000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 5000)
    });

    $.ajax({
        url: url + 'Inquiry_Student',
        data: {
            "Area": Area,
            "Building": Building,
            "Unit": Unit,
            "Floor": Floor
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

                stuPage.students = [];
                for (var i = 0; i < json.info.length; i++) {
                    stuPage.students.push(json.info[i]);
                }
                stuPage.area = Area + Building + Unit + Floor;

            } else {
                console.log(json.message)
            }
            toast.hide();

        },
        error: function (e) {
            toast.hide();
            new auiToast()
                .fail({
                    title: "获取数据失败",
                    duration: 2000
                });
        }
    });
}

function getMenuItem() {
    $.ajax({
        url: url + 'Inquiry_Building_List',
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {

            // zhaoming.students.clean();
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

            var totleCharge = 0;
            if (json.code == 200) {
                items = json.info;
                menu.Area = items[0].Area;
                menu.Building = items[0].Lists[0].Building + items[0].Lists[0].Lists[0].Unit;
                menu.Floor = items[0].Lists[0].Lists[0].Lists[0] + "层";

                area = items[0].Area;
                building = items[0].Lists[0].Building;
                unit = items[0].Lists[0].Lists[0].Unit;
                floor = items[0].Lists[0].Lists[0].Lists[0];
                // getRooms(items[0].Area, items[0].Lists[0].Building, items[0].Lists[0].Lists[0].Unit, items[0].Lists[0].Lists[0].Lists[0]);
                getRooms(area, building, unit, floor);
            } else {
                console.log(json.message)
            }

        },
        error: function (e) {

        }
    });
}


function switchZhaoming(item) {
    console.log(item);
    var dialog = new auiDialog();

    var msgs = item.zmState == 0 ? "是否打开照明?" : "是否关闭照明";
    var order = item.zmState == 0 ? "2" : "3";
    dialog.alert({
        title: "提示1",
        msg: msgs,
        buttons: ['取消', '确定']
    }, function (ret) {
        if (ret.buttonIndex == 2) {
            sendOrder(order, "照明");
        }

    })
}

function switchKongtiao() {
    var dialog = new auiDialog();
    var msgs = kongtiao.yongdiandatas[0].value == false ? "是否打开空调?" : "是否关闭空调";
    var order = kongtiao.yongdiandatas[0].value == false ? "2" : "3";

    dialog.alert({
        title: "提示",
        msg: msgs,
        buttons: ['取消', '确定']
    }, function (ret) {
        if (ret.buttonIndex == 2) {
            sendOrder(order, "空调");
        }
    })
}


function sendOrder(order, accountType) {
    $.ajax({
        url: url + 'Insert_Order',
        data: {
            'StudentID': userId,
            "AccountType": accountType,
            "OrderID": order,
            "UserID": userId
        },
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            if (json.code == 200) {
                var toasts = new auiToast({});
                toasts.success({
                    title: "命令已发送",
                    duration: 2000
                });
            } else {
                var toasts = new auiToast({});
                toasts.fail({
                    title: json.message,
                    duration: 2000
                });
            }
        }
    });
}
