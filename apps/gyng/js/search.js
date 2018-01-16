var userId;
var token;

function loadPage() {

    TrunPage.getKeyValue("userId", function (data) {
        userId = data;
    });

    TrunPage.getKeyValue("token", function (data) {
        init(data);
    });

}

function init(_token) {
    token = _token;
}


var search = new Vue({
    el: "#result",
    data: {
        rooms: [],
        students: []
    },
    methods: {
        jumpStudetail: function (e) {
            TrunPage.setKeyValue("token", token);
            TrunPage.setKeyValue("name", e.SName);
            TrunPage.setKeyValue("id", e.StudentID);
            TrunPage.openWebView("gyng/StudentInfo.html", 1, e.SName);
        },
        jumpRoomDetail: function (e) {
            console.error("openRoom");
            var t = e.Type;
            TrunPage.setKeyValue("token", token);
            TrunPage.setKeyValue("RoomId", e.RoomID);
            TrunPage.setKeyValue("userId", userId);

            TrunPage.setKeyValue("Role", "admin");
            if (t == 1) {
                TrunPage.openWebView("gyng/oldIndex.html", 1, e.RoomNum);
            } else if (t == 2) {
                TrunPage.openWebView("gyng/newIndex.html", 1, e.RoomNum);
            }
        }
    }
});

var toast;
function searchInfo() {

    var info = $("#search-input").val();
    if (info == null || info == "") {
        return
    }
    toast = new auiToast();
    toast.loading({
        title: "加载数据中...",
        duration: 50000
    }, function (ret) {
        console.log(ret);
        setTimeout(function () {
            toast.hide();
        }, 100000)
    });
    search.rooms = [];
    search.students = [];

    $.ajax({
        url: url + 'Search',
        data: {
            'Info': info
        },
        type: 'POST',
        headers: {
            'Authorization': "Bearer " + token
        },
        dataType: "json",
        success: function (json) {
            if (json.code == 200) {
                search.rooms = [];
                search.students = [];
                $.each(json.roomInfo, function (k, v) {
                    search.rooms.push(v);

                });
                $.each(json.studentInfo, function (k, v) {
                    search.students.push(v);

                });
            }
            toast.hide();
        },
        error: function (e) {
            toast.hide();

            var toasts = new auiToast({});
            toasts.fail({
                title: "获取数据失败!",
                duration: 2000
            });
        }
    });
}