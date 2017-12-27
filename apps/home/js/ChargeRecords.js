var time = "";

function loadPage() {
    TrunPage.getKeyValue("userId", function (data) {

        // TrunPage.showToast("userId="+data);
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
        zifeilists: [
            {id: 0, type: "zifeijilv", msg: '宿舍用电0.374度', pay: "-0.00元", date: "2017年12月27日"},
            {id: 1, type: "zifeijilv", msg: '宿舍用电0.37度', pay: "-0.00元", date: "2017年12月27日"},
            {id: 2, type: "zifeijilv", msg: '宿舍用电0.37度', pay: "-0.00元", date: "2017年12月27日"}
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
    var array = {id: 0, type: "zifeijilv", msg: '宿舍用电0.37度22', pay: "-0.00元", date: "2017年12月27日"};
    zifei.zifeilists.push(array);
}