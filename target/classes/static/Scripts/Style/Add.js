
$(function () {    
    
    $('form').submit(
        function () {
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
            //页面JS验证均通过 再执行此代码 否则再次点击无反应
            if ($(".field-validation-error").length == 0) {
                //防止表单重复提交
                $('input[type=submit]', this).attr('disabled', 'disabled');
            }
        });
    
    $("#saveFlag").val("");
    $("#saveAndMainTenPro").click(function () {
        $("#saveFlag").val("Jump");
        return true;
    });

    $("#MasterBrandId").on("change", function() {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
        var masterBrandId = $(this).val();
        if (masterBrandId) {
            $("#mabError").text("");
        }
        $("#MakeId option").remove();
        $("#MakeId").append("<option value=\"\">请选择品牌</option>");
        var url = "/Model/GetMakeDdl/" + masterBrandId;
        var optionHtml = new Array();
        $.getJSON(url, function(data) {
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
            $("#ModelId option").remove();
            $("#ModelId").append("<option value=\"\">请选择车系</option>");
        });
    });

    $("#MakeId").on("change", function() {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
        var makeId = $(this).val();
        $("#ModelId option").remove();
        $("#ModelId").append("<option value=\"\">请选择车系</option>");
        var param = { "makeId": makeId };
        var url = "/Style/GetModelDdl";
        var optionHtml = new Array();
        $.getJSON(url, param, function(data) {
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

        });
    });

    $("#ModelId").on("change", function () {
        $("#checkColor").html("");
        $("#checkNeiShi").html("");
        $("#checkXuanPeiBao").html("");
        $("#modid").val(this.value);
        //车身颜色和内饰颜色
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
            url: "/Style/GetModelPackage",
            type: "POST",
            data: { "modelId": $("#modid").val(), "year": $("#Year").val() },
            success: function (data) {
                if (data) {
                    var modelPackageArray = [];
                    for (var i = 0; i < data.length; i++) {
                        var modelPackage = data[i];
                        modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  />");
                        modelPackageArray.push("<label for='ckbXuanPeiBao" + modelPackage.Id + "'>" + modelPackage.Name + "</label>");
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
});





function yearChange(year) {
    if (year) {
        $("#yearError").text("");
    }
    //车身颜色和内饰颜色
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
                        neishiArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='neishiColor' type='checkbox' checked='checked' value='" + color.ColorId + "'/>");
                        neishiArray.push("<label for='ckb" + color.ColorId + "'>" + color.Name + "</label>");
                        var neishiValueArray = color.Value.split(",");
                        for (var j = 0; j < neishiValueArray.length; j++) {
                            neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neishiValueArray[j] + "'></div>");
                        }
                    } else {
                        cheShenArray.push("<input id='ckb" + color.ColorId + "' style='margin-right: 3px;vertical-align:middle;' name='bodyColor' type='checkbox' checked='checked' value='" + color.ColorId + "'/>");
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
        url: "/Style/GetModelPackage",
        type: "POST",
        data: { "modelId": $("#modid").val(), "year": year },
        success: function (data) {
            if (data) {
                var modelPackageArray = [];
                for (var i = 0; i < data.length; i++) {
                    var modelPackage = data[i];
                    modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"xuanPeiBao\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  />");
                    modelPackageArray.push("<label for='ckbXuanPeiBao" + modelPackage.Id + "'>" + modelPackage.Name + "</label>");
                }
                $("#checkXuanPeiBao").html(modelPackageArray.join(""));
            } else {
                $("#checkXuanPeiBao").html("");
            }
        }
    });
}

function DateTimeOnPicked() {
    $("#TimeToMarketError").text("");
}



function BaseInfoSave() {    
    var mabContent = $("#MasterBrandId option:selected").text();
    $("#hidMabName").val(mabContent);
    var makeContent = $("#MakeId option:selected").text();
    $("#hidMakeName").val(makeContent);
    var modelContent = $("#ModelId option:selected").text();
    $("#hidModelName").val(modelContent);
    return true;
}


