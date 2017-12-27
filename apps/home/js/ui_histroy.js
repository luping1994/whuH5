var time = "";
var hisType ="";
function loadPage() {
    TrunPage.getKeyValue("hisType", function (data) {
        hisType = data;
        TrunPage.setTitleTxt(hisType+"历史记录");
        // TrunPage.showToast("userId="+data);
        getData(hisType)
    });

}

function getHisData(hisType) {
    myChart.setOption({
        title: {
            text: title,
            textStyle:{
                fontSize:'.6rem'
            },
            subtext:'单位(V)'
        },
        tooltip: {},
        legend: {
            data: [hisType]
        },
        xAxis: {
            data: ["12日", "13日", "14日", "15日", "16日", "17日","18日","19日","20日","21日"]
        },
        yAxis: {},
        series: [{
            type:'line',
            name: hisType,
            data: [5, 20, 36, 10, 10, 20,220,230,240,250]
        }]
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
            console.log(result[0].label);
            console.log(result[1].label);
            console.log(result[2].label);
            // $("#year").empty();
            // $("#year").innerHTML = "result[0].label";
            time.year = result[0].label;
            time.month = result[1].label;
        },
        id: 'datePicker'
    });

}

var zifei = new Vue({
    el: '#zifeilist',
    data: {
        month: "12月",
        lists: [
            {id: 0, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"},
            {id: 1, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"},
            {id: 2, type: "zifeijilv", name: '', value: "220V", date: "2017年12月27日"}
        ]

    }
});

var time = new Vue({
    el:"#datePickerDiv",
    data:{
        year:new Date().getFullYear()+"年",
        month:new Date().getMonth()+1+"月"
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
            this.index0 = true;
            this.index1 = false;
            this.index2 = false;
            getData(0);

        },
        tab2Click: function (event) {
            this.index0 = false;
            this.index1 = true;
            this.index2 = false;
            getData(1);

        },
        tab3Click: function (event) {
            this.index0 = false;
            this.index1 = false;
            this.index2 = true;
            getData(2);

        }
    }
});

function getData(index) {
    // zifei.zifeilists=[];

    var title = "本日"+hisType+"历史曲线";
    var unit="";
    if(index==0){
        title = "本日"+hisType+"历史曲线";
    }else if (index==1){
        title = "最近一周"+hisType+"历史曲线";

    }else  {
        title = "最近一月"+hisType+"历史曲线";

    }
    myChart.setOption({
        title: {
            text: title,
            textStyle:{
                fontSize:'.6rem'
            },
            subtext:'单位(V)'
        },
        tooltip: {},
        legend: {
            data: [hisType]
        },
        xAxis: {
            data: ["12日", "13日", "14日", "15日", "16日", "17日","18日","19日","20日","21日"]
        },
        yAxis: {},
        series: [{
            type:'line',
            name: hisType,
            data: [5, 20, 36, 10, 10, 20,220,230,240,250]
        }]
    });
}