var colorType = $("#hidColorType").val();
function GetColorList(modelId,colorType) {
    var url = "/ModelColor/GetColorList";
    var data = { "id": modelId, "ColorType": colorType };
    $.get(url, data, function (res) {
        $("#div_content").html(res);
    });
}

//标识：是否有处于编辑状态的颜色块
var colorIsEditFlag = false;

function SetOrder(dataArray) {
    $.ajax({
        type: "POST",
        url: "/ModelColor/SetOrder",
        data: { "dataArray":JSON.stringify(dataArray) },
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
        str.push("<div class=\"wx_box drag_color\">");
        str.push("<div class=\"name_input_box\">");
        str.push("<input id=\"txt_name\" type=\"text\" value=\"颜色名称\" class=\"name_input\" style=\"color:gray\" >");
        str.push("</div>");
        str.push("<ul>");
        str.push("<li>");
        str.push("<div class=\"color_box\">");
        str.push("<input id=\"txt_value\" type=\"text\" value=\"颜色值\" readonly=\"readonly\" class=\"color_input\" style=\"color:gray\" >");
        str.push("</div>");
        str.push("<span class=\"button removeColorCss\" style=\"display:none;\" >删除</span>");
        str.push("</li>");
        str.push("<li class=\"vcenter\"><span class=\"button addColorCss\">新增</span></li>");
        str.push("</ul>");
        str.push("<div class=\"save_box\">");
        str.push("<span class=\"button button_left btn_save\">保存</span>");
        str.push("<span id=\"btn_cancel\" class=\"button button_right \">取消</span>");
        str.push("</div>");
        str.push("</div>");
        $("#div_content").append(str.join(""));
    });

    $(".btn_save").live("click", function () {
        var url = "/ModelColor/Add/";
        var name = $(this).parent().prev().prev().children().eq(0).val();
        if ($.trim(name) == "颜色名称" || $.trim(name) == "") {
            $.messager.alert("提示", "颜色名称不能为空", 'error');
            return false;
        }
        if ($.trim(name).length > 50) {
            $.messager.alert("提示", "颜色名称输入不得多于50个字符", 'error');
            return false;
        }
        var liTags = $(this).parent().prev().children("li[class!=vcenter]");
        
        var validateResult = true;
        var colorValueArray = [];
        $(liTags).each(function () {
            var colorValue = $(this).find("input").eq(0).val();
            if ($.trim(colorValue) == "颜色值" || $.trim(colorValue) == "") {
                $.messager.alert("提示", "颜色值不能为空", 'error');
                validateResult = false;
                return false;
            } else {
                colorValueArray.push($.trim(colorValue));
            }
        });
        if (!validateResult) {
            return false;
        }

        var data = { "name": $.trim(name), "value": colorValueArray.join(","), "modelId": $("#hid_modelId").val(), "colorType": $("#hidColorType").val(), "orderId": parseInt($(this).closest('.drag_color').index())-1 };
        $.post(url, data, function (res) {
            if (res) {
                $.messager.alert("提示", "操作成功", 'info', function () {
                    GetColorList($("#hid_modelId").val(), $("#hidColorType").val());
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
                $(me).parent().parent().remove();
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

        var ulTags = $(this).parent().prev();//包含色块的容器
        var divTag = ulTags.prev();
        var oldPValue = divTag.text();
        var liTags = ulTags.children("li");
        if (liTags.length == 0) {
            ulTags.prev().html("<input id=\"txt_name\" type=\"text\" value=\"" + oldPValue  + "\" class=\"name_input\"  >");
            ulTags.html("<li><div class=\"color_box\"><input id=\"txt_value\" type=\"text\" value=\"颜色值\" readonly=\"readonly\" class=\"color_input\"></div><span class=\"button removeColorCss\" style=\"display:none;\">删除</span></li>");
        } else {
            divTag.html("<input type=\"text\" value=\"" + oldPValue + "\" />");
            $(ulTags.children("li")).each(function () {
                var oldColorValue = $(this).find("em").eq(0).text();
                $(this).children("div").eq(0).html("<input id=\"txt_value\" readonly=\"readonly\" type=\"text\" value=\"" + oldColorValue + "\" class=\"color_input\"></input>");
                if (ulTags.children("li").length > 1) {
                    $(this).append("<span class=\"button removeColorCss\">删除</span>");
                } else {
                    $(this).append("<span class=\"button removeColorCss\" style=\"display:none\" >删除</span>");
                }
            });
        }
        if (liTags.length < 6) {
            ulTags.append("<li class=\"vcenter\"><span class=\"button addColorCss\">新增</span></li>");
        } else {
            ulTags.append("<li style=\"display:none;\" class=\"vcenter\"><span style=\"display:none;\" class=\"button addColorCss\">新增</span></li>");
        }
        $(this).text("保存").attr("class", "button button_left btn_save_edit");
        $(this).next().text("取消").attr("class", "button button_right btn_cancel_edit");
    });

    $(".addColorCss").live("click", function () {
        var ulTags = $(this).closest("ul");//包含色块的容器
        var liTags = ulTags.children("li");
        var prevLiTag = $(this).parent().prev();
        if (liTags.length == 1) { //色块中只有1个值且为未选颜色的色块
            var inputValue = prevLiTag.find("input").eq(0).val();
            if (inputValue != "颜色值") {
                prevLiTag.find("span").eq(0).show();//显示删除按钮
            }
        }
        if (prevLiTag.find("input").eq(0).val() == "颜色值") {
            $.messager.alert("提示", "有未选择色值的色块", 'info');
            return;
        }
        
        var liHtml = [];
        liHtml.push("<li>");
        liHtml.push("<div class=\"color_box\">");
        liHtml.push("<input id=\"txt_value\" type=\"text\" value=\"颜色值\" readonly=\"readonly\" class=\"color_input\" style=\"color:gray\" >");
        liHtml.push("</div>");
        liHtml.push("<span class=\"button removeColorCss\">删除</span>");
        liHtml.push("</li>");
        prevLiTag.children("span").eq(0).show();
        $(liHtml.join("")).insertBefore($(this).parent());
        var length = $(this).parent().siblings("li").length;
        if (length == 6) {
            $(this).parent().hide();
        }
    });

    $(".removeColorCss").live("click", function () {
        var parentTag = $(this).parent();
        var liTags = parentTag.siblings("li[class!=vcenter]");
        parentTag.siblings("li[class=vcenter]").show();
        parentTag.siblings("li[class=vcenter]").children("span").show();
        parentTag.remove();
        if (liTags.length == 1) {
            liTags.eq(0).children("span").eq(0).hide();
        }
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
        var colorId = $(this).siblings(":hidden").val();
        var name = $(this).parent().prev().prev().children("input").eq(0).val();
        if ($.trim(name) == "颜色名称" || $.trim(name) == "") {
            $.messager.alert("提示", "颜色名称不能为空", 'error');
            return false;
        }
        if ($.trim(name).length > 50) {
            $.messager.alert("提示", "颜色名称输入不得多于50个字符", 'error');
            return false;
        }
        var liTags = $(this).parent().prev().children("li[class!=vcenter]");
        if (liTags.length == 0) {
            $.messager.alert("提示", "颜色值不能为空", 'error');
            return false;
        }

        var validateResult = true;
        var colorValueArray = [];
        $(liTags).each(function () {
            var colorValue = $(this).find("input").eq(0).val();
            if ($.trim(colorValue) == "颜色值" || $.trim(colorValue) == "") {
                $.messager.alert("提示", "颜色值不能为空", 'error');
                validateResult = false;
                return false;
            } else {
                colorValueArray.push($.trim(colorValue));
            }
        });

        if (!validateResult) {
            return false;
        }
        
        var data = { "id": colorId, "name": $.trim(name), "value": colorValueArray.join(","), "modelId": $("#hid_modelId").val(), "colorType": $("#hidColorType").val() };
        var url = "/ModelColor/Edit/";
        $.post(url, data, function (res) {
            if (res) {
                $.messager.alert("提示", "操作成功", 'info', function () {
                    colorIsEditFlag = false;
                    GetColorList($("#hid_modelId").val(), $("#hidColorType").val());
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
        $(this).removeAttr("style");
        if ($.trim($(this).val()) == "颜色名称") {
            $(this).val("");
        }
    }).live("blur", function () {
        if ($.trim($(this).val()) == "") {
            $(this).val("颜色名称");
            $(this).attr("style", "color:gray");
        }
    });
    
    $("#txt_value").live("focus", function () {
        if ($.trim($(this).val()) == "颜色值") {
            $(this).val("");
        }
        $(this).ColorPicker({
            onSubmit: function (hsb, hex, rgb, el) {
                $(el).removeAttr("style");
                $(el).val("#" + hex);
                $(el).closest("li").attr("style", "background-color: #"+hex);
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