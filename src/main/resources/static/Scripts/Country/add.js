function GetExt(fileName) {
    var index = fileName.lastIndexOf(".");
    var length = fileName.length;
    var ext = fileName.slice(index, length);
    return ext;
}

function endsWithDot(parameters) {
    var index = parameters.indexOf('.', 0);
    var result = parameters.substring(index);
    return result;
}

$(document).ready(function () {
    var url = "/Country/UploadImg";
    var $win = $('#win').window({
        title: "上传国旗",
        href: url,
        width: 400,
        height: 200,
        minimizable: false,
        maximizable: false,
        collapsible: false,
        closable: false
    });
    $("#btn_upload").bind("click", function () {
        $win.window('open');
    });
    $("#btn_close").live("click", function () {
        $win.window('close');
    });
    $("#btn_save").live("click", function () {
        var fileName = $("#file_flag").val().toLowerCase();
        var isAllow = endsWithDot(fileName) == ".jpg" || endsWithDot(fileName) == ".jpeg";
        if (isAllow) {
            var options = {
                beforeSubmit: function () {
                },
                success: function (data) {
                    var result = data.split('|')[0];
                    var message = data.split('|')[1];
                    if (result == "True") {
                        $("#NationalFlag").val(message);
                        $("#imgFlag").attr("src", message);
                        $win.window('close');
                    }
                    else {
                        $.messager.alert("错误提示", message, 'error', function () {
                            return false;
                        });
                    }
                    return false;
                },
                error: function () {
                    alert("error");
                },
                resetForm: false,
                clearForm: false,
                timeout: 1000 * 60 * 5 //超时时间5分钟

            };
            $("#form_img").ajaxSubmit(options);
            return false;
        } else {
            $.messager.alert("提示", "操作失败:只能上传jpg(jpeg)的图片", 'error', function () {
                return false;
            });
        }

    });
});


