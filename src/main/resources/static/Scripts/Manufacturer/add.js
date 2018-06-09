/// <reference path="../jquery-1.8.3.js" />

$(function() {
    $('#manufacturerForm').submit(function () {
        //页面JS验证均通过 再执行此代码 否则再次点击无反应
        if ($(".field-validation-error").length == 0) {
            //防止表单重复提交
            $("#manuSave").attr('disabled', 'disabled');
        }
    });
});

//上传图片
function UploadImg() {
    var showUrl = "/Upload/UploadImg";
    $.showModalWindow(showUrl, "上传厂商LOGO", 460, 460, false, 0.3);
}

//厂商取消
function CancelEdit(id) {
    $("#leavePage").val(1); //隐藏表单域leavePage值设为1 保证取消操作不会触发beforeUnload事件导致重复记录日志
    var data = { id: id };
    $.ajax({
        url: "/Manufacturer/CancelEdit",
        type: "POST",
        data: data,
        async: false,
        success: function () {
            window.location.href = "/Manufacturer/GetBySearch/";
        }
    });
}

//上传图片
function UploadImg() {
    var showUrl = "/Upload/UploadImg";
    $.showModalWindow(showUrl, "上传厂商LOGO", 460, 460, false, 0.3);
}