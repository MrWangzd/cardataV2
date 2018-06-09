/// <reference path="../jquery-1.8.3.js" />
var colorType = $("#hidColorType").val();
function GetColorList(modelId, colorType) {
    var url = "/ModelColor/GetColorList";
    var data = { "id": modelId, "ColorType": colorType };
    $.get(url, data, function (res) {
        $("#div_content").html(res);
    });
}

//排序功能
function SetOrder(dataArray) {
    $.ajax({
        type: "POST",
        url: "/ModelColor/SetOrder",
        data: { "dataArray": JSON.stringify(dataArray) },
        success: function (res) {
            if (res) {
                $.messager.alert("提示", "排序操作成功", 'info', function () {
                    var modelId = $("#hid_modelId").val();
                    GetColorList(modelId, colorType);
                });
            } else {
                $.messager.alert("提示", "操作失败", 'error');
            }
        },
        error: function () {
            var modelId = $("#hid_modelId").val();
            GetColorList(modelId, colorType);
        }
    });
}

//标识：是否有处于编辑状态的颜色块
var colorIsEditFlag = false;

$(document).ready(function () {
    //获取颜色类型
    colorType = $("#hidColorType").val();

    $("#btn_addColor").click(function () {
        if ($("#div_content").attr("class") == "ui-sortable") {
            $.messager.alert("提示", "请点击取消颜色排序状态", 'info');
            return false;
        }
        if (colorIsEditFlag) {
            $.messager.alert("提示", "请优先保存正在编辑的颜色", 'info');
            return false;
        }
        colorIsEditFlag = true;
        var str = new Array();
        str.push('<div class="drag_color">');
        str.push('<p class="ys_x m_t">');
        str.push("<input type='input' id='txt_name' value='颜色名称'>");
        str.push("<input type='input' id='txt_value' readonly='readonly' value='颜色值'>");
        str.push('</p>');
        str.push('<p class="p_m">');
        str.push('<span class="s_l an_small" id="btn_save">保 存</span>');
        str.push('<span class="s_r an_small" id="btn_cancel">取 消</span>');
        str.push('</p>');
        str.push('</div>');
        $("#div_content ").append(str.join(""));
    });

    $("#btn_save").live("click", function () {
        var modelId = $("#hid_modelId").val();
        var name = $(this).closest("p").prev().find("input:eq(0)").val();
        var value = $(this).closest("p").prev().find("input:eq(1)").val();
        if ($.trim(name) == "颜色名称" || $.trim(name) == "") {
            $.messager.alert("提示", "颜色名称不能为空", 'error');
            return false;
        }
        if ($.trim(name).length > 15) {
            $.messager.alert("提示", "颜色名称输入不得多于15个字符", 'error');
            return false;
        }
        if ($.trim(value) == "颜色值" || $.trim(value) == "") {
            $.messager.alert("提示", "颜色值不能为空", 'error');
            return false;
        }
        var data = { "modelId": modelId, "name": $.trim(name), "value": $.trim(value), "colorType": colorType, "orderId": $(this).closest('.drag_color').index() };
        var url = "/ModelColor/Add";
        $.post(url, data, function (res) {
            if (res) {
                $.messager.alert("提示", "操作成功", 'info', function () {
                    GetColorList(modelId, colorType);
                    colorIsEditFlag = false;
                });
            } else {
                $.messager.alert("提示", "操作失败,请检查同车系下是否有重名", 'error');
            }
        });
    });
    
    $("#btn_cancel").live("click", function () {
        var me = this;
        $.messager.confirm("提示", "确定要取消此操作吗？", function (res) {
            if (res) {
                $(me).closest("div").remove();
                colorIsEditFlag = false;
            }
        });
    });

    $(".color_edit").live("click", function () {
        if ($("#div_content").attr("class") == "ui-sortable") {
            $.messager.alert("提示", "请点击取消颜色排序状态", 'info');
            return false;
        }
        if (colorIsEditFlag) {
            $.messager.alert("提示", "请优先保存正在编辑的颜色", 'info');
            return false;
        }
        colorIsEditFlag = true;

        var me = $(this);
        var url = "/ModelColor/Edit/";
        var colorId = $(this).siblings(":hidden").val();
        var data = { id: colorId };
        $.getJSON(url, data, function (res) {
            var str = new Array();
            str.push(jQuery.validator.format('<div class="bg_red" style="background-color: {0}">', res.Value));
            str.push('<p class="ys_x">');
            str.push(jQuery.validator.format('<input type="text" value="{0}">', res.Name));
            str.push(jQuery.validator.format('<input type="text" value="{0}" id="txt_value" readonly="readonly" >', res.Value));
            str.push('</p>');
            str.push('</div>');
            str.push('<p id="ys_x_bot" class="p_m" style="">');
            str.push(jQuery.validator.format('<input type="hidden" value="{0}"/>', res.Id));
            str.push('<span class="s_l an_small btn_save_edit" >保 存</span>');
            str.push('<span class="s_r an_small btn_cancel_edit" >取 消</span>');
            str.push('</p>');
            me.closest("div").html(str.join(""));
        });
    });

    $(".btn_cancel_edit").live("click", function () {
        $.messager.confirm("提示", "确定要取消此操作吗？", function (res) {
            if (res) {
                colorIsEditFlag = false;
                var modelId = $("#hid_modelId").val();
                GetColorList(modelId, colorType);
            }
        });
    });

    $(".btn_save_edit").live("click", function () {
        var url = "/ModelColor/Edit/";
        var colorId = $(this).siblings(":hidden").val();
        var name = $(this).closest("p").prev().find(":text:eq(0)").val();
        var value = $(this).closest("p").prev().find(":text:eq(1)").val();
        var modelId = $("#hid_modelId").val();
        if ($.trim(name) == "颜色名称" || $.trim(name) == "") {
            $.messager.alert("提示", "颜色名称不能为空", 'error');
            return false;
        }
        if ($.trim(name).length > 15) {
            $.messager.alert("提示", "颜色名称输入不得多于15个字符", 'error');
            return false;
        }
        if ($.trim(value) == "颜色值" || $.trim(value) == "") {
            $.messager.alert("提示", "颜色值不能为空", 'error');
            return false;
        }
        var data = { "id": colorId, "name": $.trim(name), "value": $.trim(value), "modelId": modelId, "colorType": colorType };
        $.post(url, data, function (res) {
            if (res) {
                $.messager.alert("提示", "操作成功", 'info', function () {
                    GetColorList(modelId, colorType);
                    colorIsEditFlag = false;
                });
            } else {
                $.messager.alert("提示", "操作失败,请检查同车系下是否有重名", 'error');
            }
        });
    });

    $(".color_delete").live("click", function () {
        if ($("#div_content").attr("class") == "ui-sortable") {
            $.messager.alert("提示", "请点击取消颜色排序状态", 'info');
            return false;
        }
        if (colorIsEditFlag) {
            $.messager.alert("提示", "请优先保存正在编辑的颜色", 'info');
            return false;
        }
        var colorId = $(this).siblings(":hidden").val();
        $.messager.confirm("提示", "将解除与本颜色关联的所有图片,是否继续删除本颜色？", function (res) {
            if (res) {
                var url = "/ModelColor/Delete/";
                var data = { "id": colorId };
                $.post(url, data, function (result) {
                    if (result) {
                        $.messager.alert("提示", "操作成功", 'info', function () {
                            var modelId = $("#hid_modelId").val();
                            GetColorList(modelId, colorType);
                        });
                    } else {
                        $.messager.alert("提示", "该颜色正在使用中，无法删除！", 'error');
                    }
                });
            }
        });
    });

    $("#txt_name").live("focus", function () {
        if ($.trim($(this).val()) == "颜色名称") {
            $(this).val("");
        }
    }).live("blur", function () {
        if ($.trim($(this).val()) == "") {
            $(this).val("颜色名称");
        }
    });
    $("#txt_value").live("focus", function () {
        if ($.trim($(this).val()) == "颜色值") {
            $(this).val("");
        }
        $(this).ColorPicker({
            onSubmit: function (hsb, hex, rgb, el) {
                $(el).val("#" + hex);
                $(el).ColorPickerHide();
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            }
        }).bind('keyup', function () {
            $(this).ColorPickerSetColor(this.value);
        });
    }).live("blur", function () {
        if ($.trim($(this).val()) == "") {
            $(this).val("颜色值");
        }
    });

    $("#div_content").sortable(
        {
            update: function (event, ui) {
                //var colorId = ui.item.find("[type=hidden]").val();
                //var orderId = ui.item.index() + 1;
                //SetOrder(colorId, orderId, colorType);


                var dataArray = [];
                var colorItems = $(this).find(".drag_color");
                for (var i = 1; i <= colorItems.length; i++) {
                    var colorId = colorItems.eq(i - 1).find("[type=hidden]").val();
                    if (!colorId) {
                        $.messager.alert("提示", "若排序生效需输入并保存颜色！", 'info');
                        return;
                    }
                    var data = { "ColorId": colorId, "OrderId": i, "ColorType": colorType };
                    dataArray.push(data);
                }
                SetOrder(dataArray);
            }
        }
    );
    $("#div_content").sortable("disable");

    $("#a_order").bind("click", function () {
        if (colorIsEditFlag) {
            $.messager.alert("提示", "请优先保存正在编辑的颜色", 'info');
            return false;
        }
        $(this).hide();
        $("#a_return").show();
        $("#div_content").sortable("enable");
    });

    $("#a_return").bind("click", function () {
        $(this).hide();
        $("#a_order").show();
        $("#div_content").sortable("disable");
    });

});