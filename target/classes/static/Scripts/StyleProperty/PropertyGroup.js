$(function () {
    $("#groupName").css("height", "21px");
    

    $("#editDiv").hide();
    $("#addGroup").click(function () {
        $("form").attr("action", "/StyleProperty/AddPropertyGroup/");
        $("#Id").val("");
        $("#groupName").val("");
        $("#editDiv").show("slow").window("open");
    });
    $(".an_qx").click(function () {
        $("#editDiv").hide("slow").window("close");
        $("#groupName").val("");
        $("#sp1").hide();
        $("#sp2").hide();
    });

    $(".setGroupStatus").change(function () {
        var me = this;
        var selectIndex = me.options.selectedIndex == 1 ? 0 : 1; //无权限提示后返回原状态使用
        $.messager.confirm('提示', '确定要执行此操作吗？', function (res) {
            if (res) {
                var id = $(me).prev().val();
                var status = $(me).val();
                var url = "/StyleProperty/PropertyGourpStatus";

                $.ajax({
                    url: url,
                    type: "POST",
                    data: { "id": id, "isEnabled": status },
                    success: function (data) {
                        if (data == 0) {
                            $(me).val("true");
                            $.messager.alert("提示", "有未停用的属性", 'error');
                            return;
                        }
                        if (data) {
                            $.messager.alert("提示", "操作成功", 'info');
                        } else {
                            $.messager.alert("提示", "操作失败", 'error');
                            $(me).val($(me).val() == "false" ? "true" : "false");
                        }
                    },
                    error: function (data) {
                        me.options.selectedIndex = selectIndex;
                        return false;
                    }
                });
            } else {
                $(me).val($(me).val() == "false" ? "true" : "false");
            }
        });

    });
});

function GroupValidate() {
    $("#sp1").hide();
    $("#sp2").hide();
    var name = $("#groupName").val();
    var id = $("#Id").val();
    if (name == '' || name == null) {
        $("#sp1").show();
        return false;
    }
    var flag = IsSameName(id,name);
    if (!flag) {
        $("#sp1").hide();
        $("#sp2").show();
    }
    return flag;
}

//编辑
function EditGroup(data) {
    $("form").attr("action", "/StyleProperty/PropertyGroupEditPost");
    $("#Id").val(data.Id);
    $("#groupName").val(data.Name);
    $("#editDiv").show("slow").window("open");
}
//删除
function DeleteGroup(data) {
    if (data > 0) {
        $("#deleteId" + data).parent().parent().hide();
    } else {
        $.messager.alert('提示', '删除失败!请检查分类下是否有未删除的属性。', 'info');
    }
}

//验证是否重名
function IsSameName(id,name) {
    var res = $.ajax({
        async:false,  //发送同步ajax请求，验证返回值
        type: "POST",
        url: "/StyleProperty/IsSameName",
        data: {"id":id,"name": name }
    });
    return res.responseText == "0";
}
