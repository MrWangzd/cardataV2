$(function () {
    $("#editPath").click(function () {
        $("#maskDiv").hide();
    });
    $("#makeForm").submit(function () {
        //页面JS验证均通过 再执行此代码 否则再次点击无反应
        if ($(".field-validation-error").length == 0) {
            //防止表单重复提交
            $("#makeSave").attr('disabled', 'disabled');
        }
    });
});

function UploadImg() {
    var showUrl = "/Upload/UploadImg";
    $.showModalWindow(showUrl, "上传品牌LOGO", 460, 460, false, 0.3);
}

function UploadImg2() {
    var showUrl = "/Upload/UploadImg2";
    $.showModalWindow(showUrl, "上传品牌图片（300*200_JPG）", 700, 550, false, 0.3);
}

//品牌取消
function CancelEdit(id) {
    $("#leavePage").val(1);
    var data = { id: id };
    $.ajax({
        url: "/Make/CancelEdit",
        type: "POST",
        data: data,
        async: false,
        success: function () {
            window.location.href = "/Make/GetByTree?id="+id;
        }
    });
}
