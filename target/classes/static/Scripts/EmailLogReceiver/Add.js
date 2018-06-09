$(
    function () {
        //域用户名失去焦点绑定事件
        $("#userName").bind("blur", function () {
            var userName = $("#userName").val();
            if (userName == "") {
                $("#spanName").html("请输入域用户名");
            } else {
                var id = $("#pageId").val();
                var para = { "name": userName, "id": id };
                $.post("/EmailLogReceiver/CanUserUse", para, function (result) {
                    if (!result.res) {
                        $("#spanName").html(result.resM);
                    } else {
                        $("#spanName").html("");
                    }
                });
            }
        });
    }
);

function getChkValue(id) {
    var r1 = true;
    var r2 = true;
    var r3 = true;

    var userName = $("#userName").val();
    if (userName == "") {
        $("#spanName").html("请输入域用户名");
        r1 = false;
    } else {
        var para = { "name": userName, "id": id };
        $.ajax({
            url: "/EmailLogReceiver/CanUserUse",
            type: "POST",
            async: false,  //设置同步方式
            data: para,
            success: function (result) {
                if (!result.res) {
                    $("#spanName").html(result.resM);
                    r2 = false;
                }
            }
        });
    }

    //邮件预警checkbox
    var chkValues = "";
    $("#tdchk").find(":checkbox").each(function () {
        if ($(this).attr("checked") == true || $(this).attr("checked") == "checked") {
            chkValues += this.id + ",";
        }
    });
    if (chkValues.length == 0) {
        $("#spanLog").html("请选择预警内容");
        r3 = false;
    } else {
        $("#spanLog").html("");
    }
    chkValues = chkValues.substring(0, chkValues.length - 1);
    $("#tps").val(chkValues);
    return r1 && r2 && r3;
}