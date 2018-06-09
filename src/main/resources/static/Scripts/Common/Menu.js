$(function () {
    $.ajaxSetup({
        cache: false //关闭AJAX相应的缓存
    });
    $(document).ajaxError(function (event, xhr, options) {
        if (xhr.status == 403) {

            $.messager.alert("提示", "您没有执行此操作的权限，请联系系统管理员", 'error', function () {
                return false;
            });
        }
        else if (xhr.status == 401) {
            $.messager.alert("提示", "您的登陆状态已失效，请重新登陆", 'error', function () {
                window.location.href = "/Home/Login";
            });
        } else {
            $.messager.alert("提示", "发生未知错误【" + xhr.status + "】，请重试", 'error', function () {
                return false;
            });
        }
    });
    $(".tex").bind("keydown", function (event) {
        var key = event.which;
        if (key == 13) {
            $("#btnSearch").click();
        }
    });
});


function toggle_c() {
    var widthFlag = $("#widthFlag");
    $("#left").toggle();
    $("#shousuo").toggleClass("shousuo_hide");
    $("#right").toggleClass("right_b");
    $("#main").toggleClass("main_bj_no");
    $("#right table:hidden").datagrid('resize', { width: $("#right").width() });
    if (widthFlag.val() == "0") {
        $("#main").css("width", "1024px");
        widthFlag.val("1");
    } else {
        widthFlag.val("0");
        $("#main").css("width", "1142px");
    }
}

function fixWidth(percent) {
    return $("#right").width() * percent;
}

//关闭页面时记录日志 flag=0代表其他编辑页面 flag=1代表车型批量编辑页面
function LeavePage(id, type, flag) {
    $(window).bind('beforeunload', function () {
        var lpId = $("#leavePage").val();
        if (lpId == 0) {
            if (flag == 0) {
                var par = { "id": id };
                switch (type) {
                    case "Manufacturer":
                        $.ajax({
                            type: "POST",
                            url: "/Manufacturer/CancelEdit",
                            data: par,
                            async: false
                        });
                        break;
                    case "MasterBrand":
                        $.ajax({
                            type: "POST",
                            url: "/MasterBrand/CancelEdit",
                            data: par,
                            async: false
                        });
                        break;
                    case "Make":
                        $.ajax({
                            type: "POST",
                            url: "/Make/CancelEdit",
                            data: par,
                            async: false
                        });
                        break;
                    case "Model":
                        $.ajax({
                            type: "POST",
                            url: "/Model/CancelEdit",
                            data: par,
                            async: false
                        });
                        break;
                    case "Style":
                        $.ajax({
                            type: "POST",
                            url: "/Style/CancelEdit",
                            data: par,
                            async: false
                        });
                        break;
                    default:
                }
            }
            else if (flag == 1) {
                var pars = { "ids": id };
                $.ajax({
                    type: "POST",
                    url: "/StyleBatchEdit/BatchCancelEdit",
                    data: pars,
                    async: false
                });
            }
        }
    });

    $(window).on('unload', function () {
        $("#leavePage").val(0);
    });
}