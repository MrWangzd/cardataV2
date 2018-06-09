//记录参数样式下拉框的原值 编辑参配不允许修改参数样式下拉框还原选项时使用
var inputTypeValue = 0;

$(function () {
    $("#addForm").hide();
    $("#divInput").hide();
    $("#divSelect").hide();
    $("input[type=text]").css("height", "21px");

    //验证非空表单
    $("form").submit(checkForm);

    function checkForm() {
        $("#sp1").hide();
        $("#sp12").hide();
        $("#spEg").hide();
        $("#spEg2").hide();
        var bl = true;
        var oldLength = $("#old_length").val(); //修改参配时获取旧的length值
        var reg = /^(\d{1,9})$/;   //正则表达式，验证是否为数字

        if ($("#inputType").val() == 0) { //1.参数类型
            $("#sp2").show();
            bl = false;
        } else {
            $("#sp2").hide();
        }
        if ($.trim($("#PropertyName").val()) == '' || $("#PropertyName").val() == null) { //2.参数名称
            $("#sp1").show();
            bl = false;
        } else {
            var propertityid = $("#propertyId").val(); //动态参配ID。id为空，表示添加；不为空，表示编辑
            var groupid = $("#dlGroup").val(); //参配分组编号
            var name = $.trim($("#PropertyName").val());
            var flag = IsSameNameCH(propertityid, groupid, name);   //验证中文名是否重名
            if (!flag) {
                bl = false;
                $("#sp12").show();
            }
        }
        if ($.trim($("#EnglishName").val()) == '' || $("#EnglishName").val() == null) { //2.英文名称
            $("#spEg").show();
            bl = false;
        } else {
            var propertityid1 = $("#propertyId").val(); //动态参配ID。id为空，表示添加；不为空，表示编辑
            var nameEn = $.trim($("#EnglishName").val());
            var res = IsSameNameEN(propertityid1, nameEn); //验证英文名是否重名
            if (!res) {
                bl = false;
                $("#spEg2").show();
            }
        }
        //输入框
        if ($("#inputType").val() == 4) {
            if ($("#isNum").val() != "date") {
                if ($("#length").val() == '' || $("#length").val() == null) { //3.参数长度值
                    $("#sp_length").html("长度不能为空");
                    $("#sp_length").show();
                    bl = false;
                } else if (!reg.test($("#length").val()) || $.trim($("#length").val()) == '' || $("#length").val() == null) {
                    $("#sp_length").html("请输入数字");
                    $("#sp_length").show();
                    bl = false;
                } else if (oldLength != "" && oldLength > parseInt($("#length").val())) {
                    $("#sp_length").html("您输入的值不能小于修改前的值");
                    $("#sp_length").show();
                    bl = false;
                } else {
                    $("#sp_length").hide();
                }
            }
        } else {
            if ($("#SelectTxt1").val() == '' || $("#SelectTxt1").val() == null) {
                $("#sp_dl1").show();
                bl = false;
            }
            if ($("#SelectTxt2").val() == '' || $("#SelectTxt2").val() == null) {
                $("#sp_dl2").show();
                bl = false;
            }
        }
        //单选框

        return bl;
    }

    //多选部分
    $("#addSelect").click(function () {
        $("#selectTable").append("<tr class='appendTr' style='text-align:center; color:#666666; background:#f9f9f9;  padding:5px;'><td><input type='text' name='selectTxt' /></td><td><input class='deleteSelect' type='button' value='删除' style=' background:url(../../Content/images/an_del.jpg) no-repeat; width:75px; height:30px; line-height:33px; border:0; text-align:left; padding-left:8px;cursor:pointer' /></td></tr>");
        $("input[type=text]").css("height", "21px");
    });
    $(".deleteSelect").live("click", function () {
        //propertyId有值代表编辑无值代表添加
        var propertyId = $("#propertyId").val();
        if (!propertyId) {
            $(this).parent().parent().remove();
        }
    });
    
    //选择不同的input类型
    $("#inputType").change(function () {
        //propertyId有值代表编辑无值代表添加
        var propertyId = $("#propertyId").val();
        if (propertyId) {
            $.messager.alert('提示', '参数样式不允许编辑', 'info', function () {
                $("#inputType").val(inputTypeValue);
            });
        }
        var selectType = $("#inputType").val();
        if (selectType == 2 || selectType == 3 || selectType == 1) {
            $("#sp_dl1").hide();
            $("#sp_dl2").hide();
            $("#divSelect").show("slow");
            $("#divInput").hide("slow");
        } else if (selectType == 4) {
            $("#divSelect").hide("slow");
            $("#divInput").show("slow");
        }
    });

    //取消按钮
    $("#cancleBtn").click(function () {
        $("#sp1").hide();
        $("#sp2").hide();
        $("#sp_dl1").hide();
        $("#sp_dl2").hide();
        $("#sp12").hide();
        $("#spEg").hide();
        $("#spEg2").hide();
        $("#addForm").hide();
        $("#divInput").hide();
        $("#divSelect").hide();
        $('#addForm').window('close');
        $(".appendTr").remove();
        $("#inputType").empty();
        $("#inputType").append("<option selected='selected' value='0'>请选择</option>");
        $("#inputType").append("<option value='4'>输入框</option>");
        $("#inputType").append("<option value='1'>单选框</option>");
        $("#inputType").append("<option value='2'>复选框</option>");
        $("#inputType").append("<option value='3'>下拉选框</option>");

        $(".key").remove();
    });

    //EasyUI弹出窗口
    $(".an_tb").click(function () {
        $("#propertyId").val("");
        $('#addForm').show("slow");
        $('#addForm').window(
            {
                top: $(this).offset().top - 32,
                left: $(this).offset().left - 500
            });
        //去掉selectText1和selectText2的只读效果 如果之前打开过编辑层 会有只读效果
        $("#SelectTxt1").prop("readonly", false);
        $("#SelectTxt2").prop("readonly", false);

        $('#addForm').window('open');
        $("form").attr("action", "/StyleProperty/AddProperty/"); //如果不写 在通过编辑打开窗口然后点取消 再点添加 会出现bug
        var group = $(this).prev().text().trim();
        $("#dlGroup option").each(function () {
            if ($(this).text() == group) {
                $(this).attr("selected", "selected");
            }
        });

    });

    //预览跟随鼠标
    $(".previewDiv").click(function () {
        $('#preview').window({
            top: $(this).offset().top - 32,
            left: $(this).offset().left - 68
        });
        $('#preview').window('open');
    });
    //编辑跟随鼠标
    $(".yul_bj").click(function () {
        $('#addForm').window({
            top: $(this).offset().top - 32,
            left: $(this).offset().left - 300
        });
        $('#addForm').window('open');
    });


    //状态启用和停用
    $(".setPropertyStatus").change(function () {
        var me = this;
        var selectIndex = me.options.selectedIndex == 1 ? 0 : 1; ////无权限提示后返回原状态使用
        $.messager.confirm('提示', '确定要执行此操作吗？', function (res) {
            if (res) {
                var url = "/StyleProperty/PropertyStatus/";
                var gId = $(me).prev().val();
                var status = $(me).val();
                $.ajax({
                    url: url,
                    type: "POST",
                    data: { id: gId, isEnabled: status },
                    success: function (data) {
                        if (data.result == false) {
                            $(me).val("true");
                            $.messager.alert("提示", data.mes, 'error');
                            me.options.selectedIndex = selectIndex;
                            return;
                        } else {
                            $.messager.alert("提示", "操作成功", 'info');
                        }
                    },
                    error: function () {
                        me.options.selectedIndex = selectIndex;
                        return false;
                    }
                });
            } else {
                $(me).val($(me).val() == "false" ? "true" : "false");
            }
        });
    });

    //当dataType为日期的时候，长度和单位名称隐藏
    $("#isNum").change(function () {
        if ($("#isNum").val() == "date") {
            $("#length").val("0").parent().parent().hide();
            $("#unitName").val("").parent().parent().hide();
        } else {
            $("#length").val("").parent().parent().show();
            $("#unitName").parent().parent().show();
        }
    });
});

//编辑
function editProperty(parameters) {
    $('#addForm').show("slow");
    $("#dlGroup").val(parameters.GroupId);
    $("#PropertyName").val(parameters.PropertyName);
    $("#EnglishName").val(parameters.EnglishName);
    inputTypeValue = parameters.InputType;
    $("#inputType").val(parameters.InputType);
    $("#propertyId").val(parameters.Id);
    if (parameters.InputType == 4) {
        $("#divInput").show("slow");
        $("#old_length").val(parameters.Length);  //记录数据库中存在的长度值，提交表单时验证是否满足 新值比旧值大 的条件
        $("#isNum").val(parameters.DataType);
        if ($("#isNum").val() == "date") {
            $("#length").val("0").parent().parent().hide();
            $("#unitName").val("").parent().parent().hide();
            $("#dataExpress").val("").parent().parent().hide();
        } else {
            $("#unitName").val(parameters.Unit).parent().parent().show();
            $("#length").val(parameters.Length).parent().parent().show();
            $("#dataExpress").val(parameters.DataExpress).parent().parent().show();
        }
        $("#description").val(parameters.Description);
    } else {
        $("#divSelect").show("slow");
        $("#divInput").hide("slow");
        var temp = 0;
        $.each(parameters.Items, function (index) {
            temp++;
            if (temp == 1) {
                $("#SelectTxt1").val(parameters.Items[index]).attr("readonly", "readonly");
                $("#selectTable").append("<input class='key' type='hidden' name='" + parameters.Items[index] + "' value= '" + index + "'/>");

            } else if (temp == 2) {
                $("#SelectTxt2").val(parameters.Items[index]).attr("readonly", "readonly");
                $("#selectTable").append("<input class='key' type='hidden' name='" + parameters.Items[index] + "' value= '" + index + "'/>");
            } else {
                $("#selectTable").append("<tr  class='appendTr' style='text-align:center; color:#666666; background:#f9f9f9;  padding:5px;'><td><input type='text' readonly='readonly' name='selectTxt' value= '" + parameters.Items[index] + "' /></td><td><input class='deleteSelect' type='button' value='删除' style=' background:url(../../Content/images/an_del.jpg) no-repeat; width:75px; height:30px; line-height:33px; border:0; text-align:left; padding-left:8px;cursor:pointer'/></td></tr>");
                $("#selectTable").append("<input class='key' type='hidden' name='" + parameters.Items[index] + "' value= '" + index + "'/>");
                $("input[type=text]").css("height", "21px");
            }

        });
    }
    $("form").attr("action", "/StyleProperty/PropertyEidtPost/");

    if ($("#inputType").val() == 1) {          //单选框
        $(".deleteSelect").attr("disabled", "disabled");
        $("#inputType option[value='4']").remove();
        //$("#inputType option[value='3']").remove();
        $("#inputType option[value='2']").remove();
        $("#inputType option[value='0']").remove();
        $("#inputType option[value='1']").attr("selected", "selected");

    }
    if ($("#inputType").val() == 2) {          //复选框
        $(".deleteSelect").attr("disabled", "disabled");
        $("#inputType option[value='4']").remove();
        $("#inputType option[value='3']").remove();
        $("#inputType option[value='1']").remove();
        $("#inputType option[value='0']").remove();
        $("#inputType option[value='2']").attr("selected", "selected");
    }
    if ($("#inputType").val() == 3) {         //下拉框
        $(".deleteSelect").attr("disabled", "disabled");
        $("#inputType option[value='4']").remove();
        $("#inputType option[value='2']").remove();
        //$("#inputType option[value='1']").remove();
        $("#inputType option[value='0']").remove();
        $("#inputType option[value='3']").attr("selected", "selected");
    }
    if ($("#inputType").val() == 4) {         //输入框
        $("#inputType option[value='2']").remove();
        $("#inputType option[value='3']").remove();
        $("#inputType option[value='1']").remove();
        $("#inputType option[value='0']").remove();
        $("#inputType option[value='4']").attr("selected", "selected");
    }
}


function deleteProperty(result) {
    if (result == 0) {
        $.messager.alert("提示", "属性值已被使用不能删除", 'error');
        return;
    }
    if (result) {
        $.messager.alert("提示", "删除成功", 'info');
        $("input[id=" + result + "]").parent().parent().hide("slow");
    }
}
//验证中文名是否重名
function IsSameNameCH(propertityid, groupid, name) {
    var res = $.ajax({
        async: false,  //发送同步ajax请求，验证返回值
        type: "POST",
        url: "/StyleProperty/IsSamenameCh",
        data: { propertityid: propertityid, name: name, groupid: groupid }
    });
    return res.responseText == "0";
}
//验证英文名是否相同
function IsSameNameEN(propertityid, englishName) {
    var res = $.ajax({
        async: false,  //发送同步ajax请求，验证返回值
        type: "POST",
        url: "/StyleProperty/IsSamenameEn",
        data: { propertityid: propertityid, name: englishName }
    });
    return res.responseText == "0";
}

//添加成功后跳转
function AddSuccess(parameters) {
    if (parameters) {
        location.href("/StyleProperty/PropertyMaintenance");
    }

}