var token;
var StudentID;
var AccountType;

function loadPage() {

    TrunPage.getKeyValue("id", function (data) {
        StudentID = data;

    });
    TrunPage.getKeyValue("AccountType", function (data) {
        AccountType = data;

    });
    TrunPage.getKeyValue("token", function (data) {
        token = data;
    });

    getStudentDetail(StudentID);

}

function getStudentDetail(id) {
    $.ajax({
        url: url + 'Inquiry_UserInfo',
        data: {"UserID": id},
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
           if (json.code==200){
               content.student.StudentID = json.info[0].StudentID;
               content.student.SName = json.info[0].SName;
               content.student.Role = json.info[0].Role;
               content.student.Faculty = json.info[0].Faculty;
               content.student.Professional = json.info[0].Professional;
               content.student.PhoneNum = json.info[0].PhoneNum;
               content.student.Area = json.info[0].Area;
               content.student.Building = json.info[0].Building;
               content.student.Unit = json.info[0].Unit;
               content.student.RoomNum = json.info[0].RoomNum;
           }else {
               var toast = new auiToast({});
               toast.fail({
                   title:"获取数据失败",
                   duration:2000
               });
           }
            // zhaoming.students.clean();
            // TrunPage.showToast("json2="+json.info[0].PreChargeback+"元");

        },
        error:function (e) {
            var toast = new auiToast({});
            toast.fail({
                title:"获取数据失败",
                duration:2000
            });
        }
    });
}
var content = new Vue({
    el:"#content",
    data:{
        student:{
            "StudentID": "-",
            "SName": "-",
            "Role": 1,
            "RoomID": null,
            "ktPreChargeback": null,
            "ktPreSubsidy": null,
            "ktPrice": null,
            "zmPreChargeback": null,
            "zmPreSubsidy": null,
            "zmPrice": null,
            "Area": null,
            "Building": null,
            "Unit": null,
            "RoomNum": null,
            "eleckt": null,
            "eleczm": null,
            "Subsidyzm": null,
            "Subsidykt": "-",
            "Faculty": "-",
            "Professional": "-",
            "PhoneNum": null
        }
    }
});