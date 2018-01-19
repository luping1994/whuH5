var time_year = new Date().getFullYear();
var time_month = new Date().getMonth() + 1;
var StudentID = "";
var AccountType = "照明";
var currentIndex = 0;
var token;
var datas = [];
var RoomId;


function loadPage() {
    TrunPage.getKeyValue("userId", function (data) {
        StudentID = data;

    });
    TrunPage.getKeyValue("token", function (data) {
        token = data;
    });

    TrunPage.getKeyValue("AccountType", function (data) {
        AccountType = data;

    });
  TrunPage.getKeyValue("RoomID", function (data) {
      RoomId = data;
      getDataWarp()
    });


}

function openDataPicker() {
    // 示例2：
    weui.datePicker({
        start: 2015, // 从今天开始
        end: new Date(),
        defaultValue: new Date(),
        onChange: function (result) {
            // console.log(result);
        },
        onConfirm: function (result) {

            // $("#year").empty();
            // $("#year").innerHTML = "result[0].label";
            time.year = result[0].label;
            time.month = result[1].label;
            time_year = result[0].value;
            time_month = result[1].value;
            getDataWarp();

        },
        id: 'datePicker'
    });

}

var time = new Vue({
    el: "#chargeRow",
    data: {
        year: new Date().getFullYear() + "年",
        month: new Date().getMonth() + 1 + "月",
        duandianTimes:"0次",
        caozuoTimes:"0次"
    }
});

var conLogs = new Vue({
    el: '#zifeilist',
    data: {
        month: time.month,
        logDatas: [

        ]

    }
});

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
            switchTabDatas(0);

        },
        tab2Click: function (event) {
            this.index0 = false;
            this.index1 = true;
            this.index2 = false;
            switchTabDatas(1);

        },
        tab3Click: function (event) {
            this.index0 = false;
            this.index1 = false;
            this.index2 = true;
            switchTabDatas(2);
        }
    }
});
var   toast= new auiToast();
function getDataWarp() {

    datas = [];
    var frq = 24;
    var startTime = time_year + "-" + time_month + "-" + "01";
    var endTime = time_year + "-" + time_month + "-" + getLastDay(time_year, time_month);

    toast.loading({
        title: "正在查询信息..",
        duration: 10000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 5000)
    });

    getData(frq, startTime, endTime);



}

function switchTabDatas(index) {

    // currentIndex = index;
    // zifei.zifeilists = [];
    //
    // if (index == 0) {
    //     for (var i = 0; i < datas.length; i++) {
    //         if (datas[i].type == "chargeBack") {
    //
    //             zifei.zifeilists.push(datas[i]);
    //         }
    //     }
    // } else if (index == 1) {
    //     for (var i = 0; i < datas.length; i++) {
    //         zifei.zifeilists.push(datas[i]);
    //     }
    // } else if (index == 2) {
    //     for (var i = 0; i < datas.length; i++) {
    //         if (datas[i].type == "reCharge") {
    //             zifei.zifeilists.push(datas[i]);
    //         }
    //     }
    // }

}

function getData(frq, startTime, endTime) {
    $.ajax({
        url: url + 'Inquiry_States_RoomID',
        data: {
            "RoomID": RoomId,
            "AccountType": AccountType,
            "StartTime": startTime,
            "EndTime": endTime
        },
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {

            // zhaoming.students.clean();
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");
            // console.log(json);
            conLogs.logDatas=[];
            if (json.code == 200) {
                var duandianTimes=0;
                var caozuoTimes=0;
                for (var i = 0; i < json.info.length; i++) {
                    conLogs.logDatas.push({
                        id: 0,
                        type: json.info[i].Type,
                        msg:  json.info[i].Contents ,
                        date: json.info[i].GetTime
                    });
                    duandianTimes++;
                    // if(json.info[i].type==""){
                    //
                    // }else {
                    //     caozuoTimes++;
                    // }
                }
                time.duandianTimes=duandianTimes+"次";
                time.caozuoTimes=caozuoTimes+"次";

                if(toast){
                    toast.hide();
                }
            } else {
                console.log(json.message)
            }

            switchTabDatas(currentIndex);

        }
    });
}



function getLastDay(year, month) {
    var new_year = year;    //取当前地年份
    var new_month = month++;//取下一个月地第一天，方便计算（最后一天不固定）
    if (month > 12)            //如果当前大于12月，则年份转到下一年
    {
        new_month -= 12;        //月份减
        new_year++;            //年份增
    }
    var new_date = new Date(new_year, new_month, 1);                //取当年当月中地第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
}