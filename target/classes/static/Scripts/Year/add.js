
$(function () {
    $("select").bind("change", function () {
        var newValue = $(this).val();
        var oldValue = $(this).attr("old-value");
        if (newValue === oldValue) {
            $(this).removeAttr("value-changed");
        } else {
            $(this).attr("value-changed", true);
        }
    });
    
    $("input[type=text]").bind("blur", function () {
        var newValue = $(this).val();
        var oldValue = $(this).attr("old-value");
        if (newValue === oldValue) {
            $(this).removeAttr("value-changed");
        } else {
            $(this).attr("value-changed", true);
        }
    });

    $("input[type=checkbox]").bind("click", function () {
        var items = $(this).siblings("input[type=checkbox]:checked");
        if ($(this).attr("checked")) {
            items = items.add(this);
        }
        var hid = $(this).siblings("input[type=hidden]");
        var values = "";
        items.each(function () {
            values += $(this).val();
            values += ",";
        });
        hid.val(values);
        if (hid.attr("old-value") == values) {
            hid.removeAttr("value-changed");
        } else {
            hid.attr("value-changed", true);
        }
    });
    
    $("input[type=radio]").bind("click", function () {
        var value = $(this).val();
        var hid = $(this).siblings("input[type=hidden]");
        hid.val(value);
        if (hid.attr("old-value") == value) {
            hid.removeAttr("value-changed");
        } else {
            hid.attr("value-changed", true);
        }
    });
    
    $("#tabYear input[type=radio]").bind("click", function () {
        var value = $(this).val();
        var hid = $(this).siblings("input[type=hidden]");
        hid.val(value);
        if (hid.attr("old-value") == value) {
            hid.removeAttr("value-changed");
        } else {
            hid.attr("value-changed", true);
            $("[_org]").hide();
            $("#y_" + value).show();
        }

    });
    //清空单选
    $("a[name=property_clear]").bind("click", function () {
        var r = $(this).siblings(":checked");
        r.removeAttr("checked");
        $(this).siblings("[type=hidden]").val("").attr("value-changed", true);
    });

    var html = '<div class="box"><input class="an_qd_big m_r" type="button" value="显示全部字段" id="btn_display"><input class="an_qd m_r" type="button" value="保 存" id="btn_submit"><input class="an_qd_big m_r" type="button" value="保存并退出" id="btn_submit_exit"><input class="an_qx" type="button" value="退 出" id="btn_exit"></div>';
    $("body").append(html);

    var tb = $("table[id^=y_]");
    if (tb.length > 0) {
        tb.find("select").css("margin-left", "15px");
    }

    var isAll = getQueryString("isAll");
    if (isAll == 0 || isAll == null) {
        $(".table_cp tr[id]").each(function () {
            $(this).hide();
            $("#btn_display").val("显示全部字段");
        });
    } else {
        $(".table_cp tr").each(function () {
            $(this).css("display", "table");
            $("#btn_display").val("显示常用字段");
        });
    }

    $("#btn_display").on("click", function () {
        if ($(this).val() == "显示全部字段") {
            $(".table_cp tr").each(function () {
                $(this).css("display", "table");
            });
        } else {
            $(".table_cp tr[id]").each(function () {
                $(this).hide();
            });
        }
        var content = $(this).val() == "显示全部字段" ? "显示常用字段" : "显示全部字段";
        $(this).val(content);
    });
    
    $("#btn_submit").on("click", function () {
        _save();
    });
    
    $("#btn_submit_exit").on("click", function () {
        var viewmodels = createViewModels(); //得到数据源
        var url = "/Year/Save";
        var res = $.ajax({
            beforeSend: function () {
                $.messager.progress({ text: '正在保存' });
            },
            async: true,
            url: url,
            data: JSON.stringify(viewmodels),
            type: 'POST',
            contentType: "application/json",
            dataType: "json",
            success: function () {
                $.messager.progress('close');
                $.messager.alert("提示", "操作成功", 'info', function () {
                    window.location.href = "/Model/GetBySearch/";
                });
            }
        });
    });
    
    $("#btn_exit").on("click", function () {
        $.messager.confirm("提示", "确定要不保存退出吗？", function (res) {
            if (res) {
                window.location.href = "/Model/GetBySearch/";
            }
        });
    });
});

function _save() {
    var viewmodels = createViewModels(); //得到数据源
    var url = "/Year/Save";
    var res = $.ajax({
        async: true,
        url: url,
        data: JSON.stringify(viewmodels),
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        success: function () {
            $.messager.progress('close');
            $.messager.alert("提示", "操作成功", 'info', function () {
                $.messager.progress({ text: '正在获取新数据' });
                var modelId = $("#model_id").val();
                var radioValue;
                $("#tabYear :radio").each(function (index) {  //function (index)这里有空格会使浏览器奔溃 并且不执行循环
                    if ($(this).prop("checked")) {
                        radioValue = index;
                        return false;
                    }
                });
                var isAll = $("#btn_display").val() == "显示全部字段" ? 0 : 1;
                window.location.href = "/Year/Add?modelId=" + modelId + "&radioValue=" + radioValue + "&isAll=" + isAll;
            });
        }
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function createViewModels() {
    var modelId = $("#model_id").val();
    var yearProperties = new Array();
    $("[_org]").each(function(index) {
        var year = $(this).attr("Id");
        $(this).find("[value-changed=true]").each(function(i) {
            var value = $(this).val();
            if (typeof (value) !== "undefined") {
                var modeId = $(this).attr("name").split("_")[3];
                var stylepropertyId = $(this).attr("name").split("_")[1];
                var propertyValue = value;
                var yearProperty = createYearProperty(modelId, year, stylepropertyId, propertyValue, modeId);
                yearProperties.push(yearProperty);
            }
        });
    });
    return yearProperties;
}

function createYearProperty(modelId, year, stylepropertyId, propertyValue, modeId) {
    var stylePropertyValues = { "year": year, "stylepropertyId": stylepropertyId, "propertyValue": propertyValue, "ModelId": modelId, "ModeId": modeId };
    return stylePropertyValues;
}

