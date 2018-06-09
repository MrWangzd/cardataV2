$(function () {
    $('#masterBrandForm').submit(function () {
        //页面JS验证均通过 再执行此代码 否则再次点击无反应
        if ($(".field-validation-error").length == 0) {
            //防止表单重复提交
            $("#mabSave").attr('disabled', 'disabled');
        }
    });
});
//上传图片
function UploadImg() {
    var showUrl = "/Upload/UploadImg";
    $.showModalWindow(showUrl, "上传主品牌LOGO", 460, 460, false, 0.3);
}
//上传55N图片
function UploadImg55() {
    var showUrl = "/Upload/UploadImg55";
    $.showModalWindow(showUrl, "宽高55_PNG LOGO上传", 460, 460, false, 0.3);
}
//上传30N图片
function UploadImg30() {
    var showUrl = "/Upload/UploadImg30N";
    $.showModalWindow(showUrl, "高30_PNG LOGO上传", 460, 460, false, 0.3);
}

function SetSpell() {
    $.ajax(
    {
        url: "/MasterBrand/GetSpell?name=" + encodeURI($("#Name").val()),
        type: "POST",
        async: false,
        beforeSend: function () {
        },
        error: function () {
        },
        success: function (data) {
            $("#Spell").val(data);
        }
    });
}

//品牌取消
function CancelEdit(id) {
    $("#leavePage").val(1);
    var data = { id: id };
    $.ajax({
        url: "/MasterBrand/CancelEdit",
        type: "POST",
        data: data,
        async: false,
        success: function () {
            window.location.href = "/MasterBrand/GetByTree?id=" + id;
        }
    });
}
