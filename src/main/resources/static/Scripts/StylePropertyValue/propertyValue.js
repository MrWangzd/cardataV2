var StyleProtertyValue = function () {
};

StyleProtertyValue.prototype.Init = function () {
    $("select").bind("change", function () {
        var newValue = $(this).val();
        var oldValue = $(this).attr("old-value");
        if (newValue === oldValue) {
            $(this).removeAttr("value-changed");
        } else {
            $(this).attr("value-changed", true);
        }
        //前台展示参数验证
        var trr = this.parentNode;
        var divFrontMessage = $(trr).find('.frontProperty_message');
        if (divFrontMessage != null && divFrontMessage.length > 0) {
            if (newValue != "" && newValue.length > 0) {
                divFrontMessage[0].style.display = "none";
            } else {
                divFrontMessage[0].style.display = "block";
            }
        }


    });
    $("input[type=text]").bind("blur", function () {
        if ($(this).attr("id") == "txt_665") {
            return;
        }
        if ($(this).attr("class") == "Wdate valid") {
            return;
        }
        if ($(this).closest("tr").children().eq(0).text() == "车型全称") {
            return;
        }
        if ($(this).closest("tr").children().eq(0).text() == "指导价") {
            return;
        }
        var newValue = $(this).val();
        var oldValue = $(this).attr("old-value");
        
        //正则验证
        var zhegnzeResult = ZhengZeValidate(newValue, this.parentNode);
        if (!zhegnzeResult) {
            return;
        }
        //验证是否前台展示项
        IsQianTaiValidate(newValue, this.parentNode);

        if (newValue === oldValue) {
            $(this).removeAttr("value-changed");
            
        } else {
            $(this).attr("value-changed", true);
        }
        
        //乘员人数（区间）
        if ($(this).attr("id") == "txt_951") {
            var column = $("[name^=style_951]").index($(this));
            var currentInput = $("[name^=style_665]").eq(column);
            //给665赋值 第一个整数
            if (newValue.indexOf(",") > 0) {
                currentInput.val(newValue.split(",")[0]); //因为有批量编辑 所以使用column定位取值
            } else if (newValue.indexOf("-") > 0) {
                currentInput.val(newValue.split("-")[0]);
            } else {
                currentInput.val(newValue);
            }
            //正则验证
            ZhengZeValidate(currentInput.val(), currentInput.parent().parent());
            //验证是否前台展示项
            IsQianTaiValidate(currentInput.val(), currentInput.parent().parent());
            
            //if (newValue === oldValue) {
            //    currentInput.removeAttr("value-changed");
            //} else {
            //    currentInput.attr("value-changed", true);
            //}
            currentInput.attr("value-changed", true);
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
    //清空单选
    $("a[name=property_clear]").bind("click", function () {
        var r = $(this).siblings(":checked");
        r.removeAttr("checked");
        $(this).siblings("[type=hidden]").val("").attr("value-changed", true);
    });
    //操作按钮
    

};

function ZhengZeValidate(newValue,tr) {
    var hiddenInput = $(tr).find('.dataExpress')[0];
    var hidderDiv = $(tr).find(".dataExpress_message")[0];
    var dataExpress = hiddenInput.value;
    hidderDiv.style.display = "none";
    if (newValue != "" && newValue.length > 0) {
        if (dataExpress != "" && dataExpress.length > 0) {
            if (dataExpress.substring(0, 1) == "/" && dataExpress.substring(dataExpress.length - 1) == "/") {
                dataExpress = dataExpress.substring(1, dataExpress.length - 1);
            }
            var reg = new RegExp(dataExpress);
            if (!reg.test(newValue)) {
                hidderDiv.style.display = "block";
                return false;
            }
        }
    }
    return true;
}

function IsQianTaiValidate(newValue,tr) {
    var divFrontMessage = $(tr).find(".frontProperty_message");
    if (divFrontMessage != null && divFrontMessage.length > 0) {
        if (newValue != "" && newValue.length > 0) {
            divFrontMessage[0].style.display = "none";
        } else {
            divFrontMessage[0].style.display = "block";
        }
    }
}
