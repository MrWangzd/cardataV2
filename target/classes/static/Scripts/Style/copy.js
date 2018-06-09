$(function () {
    $("#StyleBodyType option").each(function (index) {
        if ($(this).val() == $("#styleBodyTypeHid").val()) {
            $(this).attr("selected", "selected");
        }
    });
    $('form').submit(function (e) {
        if (!$("#Year").val()) {
            $("#yearError").text("请选择年款");
            return false;
        }
        //销售状态是在产在销的时候上市时间和价格是必填项
        if ($("#VmSaleStatus").val() == "Selling") {
            if (!$("#TimeToMarket").val()) {
                $("#TimeToMarketError").text("销售状态为在产在销，上市时间是必填项");
                return false;
            }
            if (!$("#NowMsrp").val()) {
                $("#NowMsrpError").text("销售状态为在产在销，厂商指导价是必填项");
                return false;
            }
        }
        //页面JS验证均通过 再执行此代码 否则再次点击无反应
        if ($(".field-validation-error").length == 0) {
            //防止表单重复提交
            $('input[type=submit]', this).attr('disabled', 'disabled');
        } else {
            //防止先点击保存并维护参配 验证未通过 再点击保存出现跳转不对的问题
            $("#saveFlag").val("");
        }
    });

    $("#save").click(
        function () {
            $("#saveFlag").val("Jump");
            return SetMabMakeModelName($('#Name').val(), $('#modid').val(), $('#Year').val());
        }
    );
    
    //注册客户端事件
    regEvent();
    $("#Name").focus().blur();
    $("#NowMsrp").on("blur", function () {
        if ($(this).val()) {
            $("#NowMsrpError").text("");
        }
    });
});


//加载品牌信息
function loadMake(mabid) {
    var par = { "mabid": mabid };
    var optionHtml = new Array();
    $("#MakeId").empty();
    $.post("/Style/GetMakeDDL", par, function (data) {
        if (data) {
            var length = data.length;
            for (var i = 0; i < length; i++) {
                optionHtml.push("<option value=\"");
                optionHtml.push(data[i].Value);
                optionHtml.push("\" ");
                if (data[i].Selected) {
                    optionHtml.push(" selected ");
                }
                optionHtml.push(">");
                optionHtml.push(data[i].Text);
                optionHtml.push("</option>");
            }
            $("#MakeId").append(optionHtml.join(""));
        }
        loadModels($("#MakeId").val());
    }, "json");
}
//加载车系信息
function loadModels(makid) {
    if (!makid) {
        makid = 0;
    }
    var optionHtml = new Array();
    var par = { "makeid": makid };
    $.getJSON("/Style/GetModelDdl", par, function (data) {
        $("#ModelId").empty();
        if (data) {
            var length = data.length;
            for (var i = 0; i < length; i++) {
                optionHtml.push("<option value=\"");
                optionHtml.push(data[i].Value);
                optionHtml.push("\" ");
                if (data[i].Selected) {
                    optionHtml.push(" selected ");
                }
                optionHtml.push(">");
                optionHtml.push(data[i].Text);
                optionHtml.push("</option>");
            }
            $("#ModelId").append(optionHtml.join(""));
        }
        $("#ModelId").val($("#ModelId").val());
    }, "json");

}

//注册客户端事件
function regEvent() {
    $("#MasterBrandId").change(function () {
        $("#mabid").val(this.value);
        loadMake(this.value);
        $("#ModelId option").remove();
        $("#ModelId").append("<option value=\"\">请选择车系</option>");
    });
    $("#MakeId").change(function () {
        $("#makid").val(this.value);
        loadModels(this.value);
    });
    $("#ModelId").change(function () {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#modid").val(this.value);
        $.ajax({
            url: "/Style/GetStyleColor",
            type: "POST",
            data: { modelId: $("#modid").val(), year: $("#Year").val() },
            success: function (data) {
                if (data) {
                    var neishiArray = [];
                    var cheShenArray = [];
                    for (var i = 0; i < data.length; i++) {
                        var color = data[i];
                        if (color.ColorType == 0) {
                            cheShenArray.push("<input id='ckb" + color.Id + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' type='checkbox' checked='checked'  value='" + color.Id + "'/>");
                            cheShenArray.push("<label for='ckb" + color.Id + "'>" + color.Name + "</label>");
                            var cheShenValueArray = color.Value.split(",");
                            for (var j = 0; j < cheShenValueArray.length; j++) {
                                cheShenArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + cheShenValueArray[j] + "'></div>");
                            }
                        } else {
                            neishiArray.push("<input id='ckb" + color.Id + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' type='checkbox' checked='checked' value='" + color.Id + "'/>");
                            neishiArray.push("<label for='ckb" + color.Id + "'>" + color.Name + "</label>");
                            var neiShiValueArray = color.Value.split(",");
                            for (var m = 0; m < neiShiValueArray.length; m++) {
                                neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neiShiValueArray[m] + "'></div>");
                            }
                        }
                    }
                    $("#checkColor").append(cheShenArray.join(""));
                    $("#checkNeiShi").append(neishiArray.join(""));
                }
            }
        });
    });
}

function SetMabMakeModelName() {
    $("#Name").focus().blur();
    var nameOldValue = $("#Name").val();
    $("#Name").val(nameOldValue.trim());
    var mabContent = $("#MasterBrandId option:selected").text();
    $("#hidMabName").val(mabContent);
    var makeContent = $("#MakeId option:selected").text();
    $("#hidMakeName").val(makeContent);
    var modelContent = $("#ModelId option:selected").text();
    $("#hidModelName").val(modelContent);
    return true;
}

function yearChange(year) {
    if (year) {
        $("#yearError").text("");
    }
    $.ajax({
        url: "/Style/GetYearColor",
        type: "POST",
        data: { "modelId": $("#modid").val(), "year": year },
        success: function (data) {
            if (data) {
                var neishiArray = [];
                var cheShenArray = [];
                for (var i = 0; i < data.length; i++) {
                    var color = data[i];
                    if (color.ColorType == 1) {
                        neishiArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' checked='checked' type='checkbox' value='" + color.ColorId + "'/>");
                        neishiArray.push("<label for='ckb" + color.ColorId + "'>" + color.Name + "</label>");
                        var neishiValueArray = color.Value.split(",");
                        for (var j = 0; j < neishiValueArray.length; j++) {
                            neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neishiValueArray[j] + "'></div>");
                        }
                    } else {
                        cheShenArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' checked='checked' type='checkbox' value='" + color.ColorId + "'/>");
                        cheShenArray.push("<label for='ckb" + color.ColorId + "'>" + color.Name + "</label>");
                        cheShenArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + color.Value + "'></div>");
                    }
                }
                $("#checkColor").html(cheShenArray.join(""));
                $("#checkNeiShi").html(neishiArray.join(""));
            } else {
                $("#checkColor").html("");
                $("#checkNeiShi").html("");
            }
        }
    });
}

function DateTimeOnPicked() {
    $("#TimeToMarketError").text("");
}