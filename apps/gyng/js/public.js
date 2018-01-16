var wisProgressType = "1";

$(function(){
    //popselect组件初始化
    exeAndResize(function(){
        var _width = $(window).width();
        var _height = $(window).height();
        $(".wis-pop-select>div").height(_height);
        $.each($(".wis-pop-select ul"), function(index, item){
            var _top = ($(item).height())>_height*0.4?_height*0.4:($(item).height());
            $(item).css({
                "width": _width*0.6,
                "left": _width*0.4/2,
                "top": (_height-_top)/2,
                "max-height": _height*0.4
            });
        });
        if($(".wis-tabsWrapper>ul>li").length*100<$(window).width()){
            $(".wis-tabsWrapper>ul").width($(window).width());
        }else{
            $(".wis-tabsWrapper>ul").width($(".wis-tabsWrapper>ul>li").length*100);
        }
        if($(".wis-tabs li").length*100>$(window).width()){
            $(".wis-tabs").css({"width": $(".wis-tabs li").length*100+"px", "position": "relative", "border": "none"});
            $(".wis-tabs").wrap("<ul class='wis-tabs' style='overflow: auto;'></ul>");
        }else{
            $(".wis-tabs>li").css("width", (100/$(".wis-tabs>li").length)+"%");
        }
    });
    $(".wis-tabsWrapper>ul>li").css("width", (100/$(".wis-tabsWrapper>ul>li").length)+"%");

    if(typeof(wisScrollLoadType) != "undefined"){
        wisScrollNavInit();
    }
    if(typeof(initFinish)!="undefined" && typeof(initFinish)=="function"){
        initFinish();
    }
});

function exeAndResize(fn){
    fn();
    $(window).on('resize', function(event) {
        event.preventDefault();
        fn();
    });
}

//加载动画方法
function wisProgress(flag){
    if(flag){
        var left = ($(window).width()-100)/2;
        var top = ($(window).height()-100)/2;
        $("#wisProgressC").remove();
        var progressType = "";
        if(typeof(wisProgressType)=="undefined")    wisProgressType="1";
        switch(wisProgressType){
            case "1":
            progressType = '<div class="la-ball-spin-clockwise-fade-rotating"style="top:34px;left:34px;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
            break;
            case "2":
            progressType = '<div class="la-ball-atom"style="top:34px;left:34px;"><div></div><div></div><div></div><div></div></div>';
            break;
            case "3":
            progressType = '<div class="la-ball-climbing-dot"style="top:34px;left:34px;"><div></div><div></div><div></div><div></div></div>';
            break;
            case "4":
            progressType = '<div class="la-ball-clip-rotate"style="top:16px;left:34px;"><div></div></div>';
            break;
            case "5":
            progressType = '<div class="la-ball-clip-rotate-multiple"style="top:34px;left:34px;"><div></div><div></div></div>';
            break;
            case "6":
            progressType = '<div class="la-ball-scale-ripple-multiple"style="top:34px;left:34px;"><div></div><div></div><div></div></div>';
            break;
            case "7":
            progressType = '<div class="la-ball-spin-clockwise"style="top:34px;left:34px;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
            break;
            case "8":
            progressType = '<div class="la-line-scale-pulse-out"style="top:16px;left:32px;"><div></div><div></div><div></div><div></div><div></div></div>';
            break;
            default:
            progressType = '<div class="la-ball-spin-clockwise-fade-rotating"style="top:34px;left:34px;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
            break;
        }

        $("body").append('<div id="wisProgressC" style="position:fixed;height:100%;width:100%;top:0;left:0;"><div class="wisProgress" style="top: '+top+'px; left: '+left+'px;position: fixed;width: 100px;height: 100px;text-align: center;line-height: 100px;background-color: rgba(0,0,0,0.8);border-radius: 8px;">'+progressType+'</div></div>');
    }else{
        $("#wisProgressC").remove();
    }
}