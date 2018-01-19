var time = "";
var name = "";
var currentIndex=-1;
var token;

var StudentID;
var Field;
var AccountType;
var title;
var unit;
var RoomId;

function loadPage() {
    TrunPage.getKeyValue("name", function (data) {
        name = data;
        TrunPage.setTitleTxt(name + "历史记录");

    });
    TrunPage.getKeyValue("Field", function (data) {
        Field = data;
    });
    TrunPage.getKeyValue("userId", function (data) {
        StudentID = data;
    });
    TrunPage.getKeyValue("AccountType", function (data) {
        AccountType = data;
    });
    TrunPage.getKeyValue("token", function (data) {
        token = data;
    });
    TrunPage.getKeyValue("unit", function (data) {
        unit = data;
    });
    TrunPage.getKeyValue("RoomID", function (data) {
        RoomId = data;
        getData(1);
    });
}

function getHisData(hisType) {
    myChart.setOption({
        title: {
            text: title,
            textStyle: {
                fontSize: '.6rem'
            },
            subtext: '单位(V)'
        },
        tooltip: {},
        legend: {
            data: [hisType]
        },
        xAxis: {
            data: ["12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日"]
        },
        yAxis: {},
        series: [{
            type: 'line',
            name: hisType,
            data: [5, 20, 36, 10, 10, 20, 220, 230, 240, 250]
        }]
    });
}


var zifei = new Vue({
    el: '#zifeilist',
    data: {
        itemHeader: name + "历史数据",
        lists: [
            {id: 0, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"},
            {id: 1, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"},
            {id: 2, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"}
        ]

    }
});


var tabbar = new Vue({
    el: "#bar",
    data: {
        index0: false,
        index1: true,
        index2: false
    },
    methods: {
        tab1Click: function (event) {
            if (gettingData){
                return
            }
            this.index0 = true;
            this.index1 = false;
            this.index2 = false;
            getData(0);

        },
        tab2Click: function (event) {
            if (gettingData){
                return
            }
            this.index0 = false;
            this.index1 = true;
            this.index2 = false;

            getData(1);

        },
        tab3Click: function (event) {
            if (gettingData){
                return
            }
            this.index0 = false;
            this.index1 = false;
            this.index2 = true;

            getData(2);

        }
    }
});

var toast;
var gettingData = false;
function getData(index) {
    if (index==currentIndex){
        return;
    }
    gettingData = true;
    currentIndex=index;
    // zifei.zifeilists=[];
    toast = new auiToast();
    toast.loading({
        title: "正在获取数据..",
        duration: 20000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 200000)
    });
    var frq = 24;
    var today = new Date();
    var startTime;
    var endTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    // var title = "本日" + hisType + "历史曲线";
    // var unit = "";
    if (index == 0) {
        startTime = endTime + " 00:00:00";
        endTime = endTime + " 23:59:59";
        frq = 1;
        title = "本日" + name + "数据";
    } else if (index == 1) {
        var temp = new Date();
        temp.setDate(today.getDate() - 7);
        startTime = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate();
        title = "最近一周" + name + "数据";
    } else if (index == 2) {
        var temp = new Date();
        temp.setDate(today.getDate() - 31);
        startTime = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate();
        title = "最近一月" + name + "数据";
    }
    $.ajax({
        url: url + 'Inquiry_HisData_RoomID',
        data: {
            "RoomID": RoomId,
            "AccountType": AccountType,
            "StartTime": startTime,
            "Freq": frq,
            "EndTime": endTime,
            "Field": Field
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
                zifei.lists = [];
                toast.hide();
                var xData = [];
                var yData = [];
                var length = json.info.length;

                for (var i = 0; i < json.info.length; i++) {
                    yData.push(json.info[i].Value);
                    if (index == 0) {
                        xData.push(json.info[i].GetTime.substring(11, 13) + "时");

                    } else {
                        xData.push(json.info[i].GetTime.substring(5, 10));
                    }

                    var j = length - i - 1;

                    zifei.lists.push({
                        id: 2,
                        type: "zifeijilv",
                        name: '',
                        value: json.info[j].Value+unit,
                        date: json.info[j].GetTime
                    });

                }

                setChartData(xData, yData);
            } else {
                console.log(json.message)
            }
            gettingData = false;
        },
        error:function (e) {
            gettingData = false;
        }
    });

}

function setChartData(xData, yData) {
    myChart.setOption({
        title: {
            text: title,
            textStyle: {
                fontSize: '.6rem'
            },
            subtext: "单位("+unit+")"
        },
        tooltip: {},
        legend: {
            data: ['用电量']
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [{
            type: 'bar',
            name: '用电量',
            data: yData
        }]
    });
}