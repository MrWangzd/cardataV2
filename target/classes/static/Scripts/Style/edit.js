$(function () {

    $("#StyleBodyType option").each(function (index) {
        if ($(this).val() == $("#styleBodyTypeHid").val()) {
            $(this).attr("selected", "selected");
        }
    });
    $("#hidRanLiao").val($("#OilFuelTypeId").val());
    $("#saveFlag").val("");
    $("#save").click(
        function () {
            $("#saveFlag").val("Jump");
            return true;
        }
    );
    $("#MasterBrandId").change(function () {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
        $("#mabid").val(this.value);
        var mabIdValue = this.value;
        if (!this.value) {
            mabIdValue = -1;
        }
        var par = { "mabid": mabIdValue };
        var optionHtml = new Array();
        $("#MakeId option").remove();
        $("#MakeId").append("<option value=''>请选择品牌</option>");
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
        }, "json");
        $("#ModelId option").remove();
        $("#ModelId").append("<option value=\"\">请选择车系</option>");
    });
    $("#MakeId").change(function () {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
        $("#makid").val(this.value);
        var optionHtml = new Array();
        var par = { "makeid": this.value };
        $.getJSON("/Style/GetModelDdl", par, function (data) {
            $("#ModelId option").remove();
            $("#ModelId").append("<option value=''>请选择车系</option>");
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

    });
    $("#ModelId").change(function () {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
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
                        if (color.ColorType == 1) {
                            neishiArray.push("<input id='ckb" + color.Id + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' type='checkbox' checked='checked' value='" + color.Id + "'/>");
                            neishiArray.push("<label for='ckb" + color.Id + "'>" + color.Name + "</label>");
                            var neishiValueArray = color.Value.split(",");
                            for (var j = 0; j < neishiValueArray.length; j++) {
                                neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neishiValueArray[j] + "'></div>");
                            }
                        } else {
                            cheShenArray.push("<input id='ckb" + color.Id + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' type='checkbox' checked='checked' value='" + color.Id + "'/>");
                            cheShenArray.push("<label for='ckb" + color.Id + "'>" + color.Name + "</label>");
                            cheShenArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + color.Value + "'></div>");
                        }
                    }
                    $("#checkColor").append(cheShenArray.join(""));
                    $("#checkNeiShi").append(neishiArray.join(""));
                }
            }
        });
        //选配包
        $.ajax({
            url: "/Style/GetModelPackageNew",
            type: "POST",
            data: { "modelId": $("#modid").val(), "styleId": $("#vehid").val(), "year": $("#originYear").val(), "modifyYear": $("#Year").val() },
            success: function (data) {
                if (data) {
                    var modelPackageArray = [];
                    for (var i = 0; i < data.totalPackages.length; i++) {
                        var modelPackage = data.totalPackages[i];
                        if (data.checkedPackages && data.checkedPackages.contains(modelPackage.Id)) {
                            modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.PackageId + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.PackageId + "\"  checked='checked'/>");
                        } else {
                            modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.PackageId + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.PackageId + "\"  />");
                        }
                        modelPackageArray.push("<label for='ckbXuanPeiBao" + modelPackage.PackageId + "'>" +modelPackage.Name + "</label>");
                    }
                    $("#checkXuanPeiBao").html(modelPackageArray.join(""));
                } else {
                    $("#checkXuanPeiBao").html("");
                }
            }
        });
    });
    $("#NowMsrp").on("blur", function () {
        if ($(this).val()) {
            $("#NowMsrpError").text("");
        }
    });
    $("#btnBack").click(function () {
        window.location.href = "/Style/Index";
    });
    //Mask
    $("#editPath").click(function () {
        $("#maskDivForStyle").hide();
    });

    //关闭页面时记录日志
    var styleId = $("#vehid").val();
    LeavePage(styleId, "Style", 0);
});

function yearChange(year) {
    if (year) {
        $("#yearError").text("");
    }
    $.ajax({
        url: "/Style/GetYearColorNew",
        type: "POST",
        data: { "modelId": $("#modid").val(), "styleId": $("#vehid").val(), "modifyYear": year, "year": $("#originYear").val() },
        success: function (data) {
            if (data) {
                var neishiArray = [];
                var cheShenArray = [];
                for (var i = 0; i < data.totalColors.length; i++) {
                    var color = data.totalColors[i];
                    if (color.ColorType == 1) {
                        //当前年款下有选中的颜色
                        if (data.checkedColors && data.checkedColors.contains(color.ColorId)) {
                            neishiArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' type='checkbox' checked='checked' value='" + color.ColorId + "'/>");
                        } else {
                            neishiArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' type='checkbox' value='" + color.ColorId + "'/>");
                        }
                        neishiArray.push("<label for='ckb" + color.ColorId + "'>" + color.Name + "</label>");
                        var neishiValueArray = color.Value.split(",");
                        for (var j = 0; j < neishiValueArray.length; j++) {
                            neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neishiValueArray[j] + "'></div>");
                        }
                    } else {
                        //当前年款下有选中的颜色
                        if (data.checkedColors && data.checkedColors.contains(color.ColorId)) {
                            cheShenArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' type='checkbox' checked='checked' value='" + color.ColorId + "'/>");
                        } else {
                            cheShenArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' type='checkbox' value='" + color.ColorId + "'/>");
                        }
                        
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
    //选配包
    $.ajax({
        url: "/Style/GetModelPackageNew",
        type: "POST",
        data: { "modelId": $("#modid").val(), "styleId": $("#vehid").val(), "modifyYear": year, "year": $("#originYear").val() },
        success: function (data) {
            if (data) {
                var modelPackageArray = [];
                for (var i = 0; i < data.totalPackages.length; i++) {
                    var modelPackage = data.totalPackages[i];
                    //当前年款下有选中的颜色
                    if (data.checkedPackages && data.checkedPackages.contains(modelPackage.Id)) {
                        modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  checked='checked'/>");
                    } else {
                        modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  />");
                    }
                    modelPackageArray.push("<label for='ckbXuanPeiBao" + modelPackage.Id + "'>" + modelPackage.Name + "</label>");
                }
                $("#checkXuanPeiBao").html(modelPackageArray.join(""));
            } else {
                $("#checkXuanPeiBao").html("");
            }
        }
    });
}

function SetValue() {
    var mabContent = $("#MasterBrandId option:selected").text();
    $("#hidMabName").val(mabContent);
    var makeContent = $("#MakeId option:selected").text();
    $("#hidMakeName").val(makeContent);
    var modelContent = $("#ModelId option:selected").text();
    $("#hidModelName").val(modelContent);
    $("#leavePage").val(1);


    if (!$("#Year").val()) {
        $("#yearError").text("请选择年款");
        return false;
    }
    //指导价验证
    var nowMsrp = $("#NowMsrp").val();
    if (nowMsrp) {
        var patt = /^\d+(\.\d+)?$/;
        var result = patt.test(nowMsrp);
        if (!result) {
            $("#NowMsrpError").text("指导价输入有误");
            return false;
        }
    }
    //销售状态是在产在销的时候上市时间和价格是必填项
    if ($("#VmSaleStatus").val() == "1") {
        if (!$("#TimeToMarket").val()) {
            $("#TimeToMarketError").text("销售状态为在产在销，上市时间是必填项");
            return false;
        }
        if (!$("#NowMsrp").val()) {
            $("#NowMsrpError").text("销售状态为在产在销，厂商指导价是必填项");
            return false;
        }
    }

    var oldRanLiao = $("#hidRanLiao").val();
    var newRanLIao = $("#OilFuelTypeId").val();
    if (oldRanLiao != newRanLIao) {
        $.messager.defaults = { ok: "仍然保存", cancel: "取消" };
        $.messager.confirm('提示', "燃料类型一旦更改，参配表可能会发生变化 数据不可恢复！", function (r) {
            if (r) {
                $('form').submit();
            }
        });
        return false;
    } else {
        return true;
    }
}

function DateTimeOnPicked() {
    $("#TimeToMarketError").text("");
}

//给array 添加contains 方法
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};