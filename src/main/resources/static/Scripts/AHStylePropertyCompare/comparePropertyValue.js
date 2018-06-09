$(document).ready(function () {
    //绑定竟品公司的主品牌品牌车款下拉列表 开始
    //太平洋汽车
    $("#ddlPcMasterBrand").change(function () {
        GetBasicMakeAndModelDDL(1);
    });

    $("#ddlPcModel").change(function () {
        GetBasicYearDDL(1);
    });

    $("#ddlPcYear").change(function () {
        GetBasicStyleDDL(1);
    });

    //汽车之家
    $("#ddlAhMasterBrand").change(function () {
        GetBasicMakeAndModelDDL(5);
    });

    $("#ddlAhModel").change(function () {
        GetBasicYearDDL(5);
    });

    $("#ddlAhYear").change(function () {
        GetBasicStyleDDL(5);
    });

    //爱卡汽车
    $("#ddlXcMasterBrand").change(function () {
        GetBasicMakeAndModelDDL(4);
    });

    $("#ddlXcModel").change(function () {
        GetBasicYearDDL(4);
    });

    $("#ddlXcYear").change(function () {
        GetBasicStyleDDL(4);
    });

    //搜狐汽车
    $("#ddlShMasterBrand").change(function () {
        GetBasicMakeAndModelDDL(3);
    });

    $("#ddlShModel").change(function () {
        GetBasicYearDDL(3);
    });

    $("#ddlShYear").change(function () {
        GetBasicStyleDDL(3);
    });

    //腾讯汽车
    $("#ddlQqMasterBrand").change(function () {
        GetBasicMakeAndModelDDL(2);
    });

    $("#ddlQqModel").change(function () {
        GetBasicYearDDL(2);
    });

    $("#ddlQqYear").change(function () {
        GetBasicStyleDDL(2);
    });

    // 绑定竟品公司的主品牌品牌车款下拉列表 结束

    // 在页面加载完成后将竟品数据间的相同属性进行比较，并标记不同的品牌
    checkDifferent();

    // 修改本车系参配按钮事件绑定
    $("#btn_batchEdit").bind("click", function () {
        var styleId = $("#style_id").val();
        $.ajax(
            {
                url: "/AHStylePropertyCompare/GetStyleIds",
                data: { "styleId": styleId },
                type: "POST",
                success: function (data) { 
                    window.location.href = "/StyleBatchEdit/batchedit?ids=" + data;
                }
            });
    });
});

//校对模式下编辑参配，标识相同或不同
function checkDifferent() {
    var tds = $("td[class='checkdifferent']");
    for (var i = 0; i < tds.length; i++) {
        var td = tds[i];
        var childSelect = $(td).find("select");
        var childInput = $(td).find("input[type='text']");
        if (childSelect.length > 0) {
            $(childSelect[0]).change(function () {
                var value = $(this).find("option:selected").text();
                var thisTd = $(this)[0].parentNode;
                var nextTds = $(thisTd).nextAll("td");
                for (var j = 0; j < nextTds.length; j++) {
                    //var tdValue = nextTds[j].textContent;
                    var tdValue = "";
                    if ($.browser.msie) {
                        tdValue = nextTds[j].innerText;
                    } else {
                        tdValue = nextTds[j].textContent;
                    }
                    if (value != null && value != "") {
                        if (value == "有") {
                            value = "●";
                        }
                        if (value == "无") {
                            value = "-";
                        }
                        if (value == "选配") {
                            value = "○";
                        }
                        if (tdValue != "" && value != tdValue) {
                            $(nextTds[j]).css("background-color", "#FF0000");
                        } else {
                            $(nextTds[j]).css("background-color", "white");
                        }
                    }
                }
            });
        }
        if (childInput.length > 0) {
            $(childInput[0]).bind("blur", function () {
                var value = $(this).val();
                var thisTd = $(this)[0].parentNode;
                var nextTds = $(thisTd).nextAll("td");
                for (var j = 0; j < nextTds.length; j++) {
                    //var tdValue = nextTds[j].textContent;
                    var tdValue = "";
                    if ($.browser.msie) {
                        tdValue = nextTds[j].innerText;
                    } else {
                        tdValue = nextTds[j].textContent;
                    }
                    if (value != null && value != "") {
                        if (tdValue != "" && value != tdValue) {
                            $(nextTds[j]).css("background-color", "#FF0000");
                        } else {
                            $(nextTds[j]).css("background-color", "white");
                        }
                    }
                }
            });
        }
    }
}

// 获取品牌和子品牌数据并绑定下拉列表
function GetBasicMakeAndModelDDL(companyid) {

    var companyStr = switchCompany(companyid);
    var jQuerytargetId = $("#ddl" + companyStr + "Model");
    var mabid = $("#ddl" + companyStr + "MasterBrand").val();
    if (mabid == "") {
        $("#ddl" + companyStr + "Model").empty().append("<option value=''>请选择品牌和车系</option>");
        $("#ddl" + companyStr + "Year").empty().append("<option value=''>年款</option>");
        $("#ddl" + companyStr + "Style").empty().append("<option value=''>请选择车型</option>");
        return;
    }
    if (mabid == -1) {  //表示取消对应关系
        $("#ddl" + companyStr + "Model").empty().append("<option value='-1'>取消对应关系</option>");
        $("#ddl" + companyStr + "Year").empty().append("<option value='-1'>取消对应关系</option>");
        $("#ddl" + companyStr + "Style").empty().append("<option value='-1'>取消对应关系</option>");
        return;
    }
    $.ajax(
        {
            url: "/AHStylePropertyCompare/GetBasicModelDdl",
            data: { mabId: mabid, companyId: companyid },
            type: "POST",
            beforeSend: function () {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>正在加载..</option>");
            },
            success: function (data) {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>请选择品牌和车系</option>");
                //处理数据
                var htmlString = "";
                if (data) {
                    for (var item in data) {
                        htmlString += "<optgroup label=" + item + " style=''></optgroup>";
                        for (var models in data[item]) {
                            htmlString += "<option value='" + models + "'>" + data[item][models] + "</option>";
                        }
                    }
                }
                jQuerytargetId.append(htmlString);
                $("#ddl" + companyStr + "Year").empty();
                $("#ddl" + companyStr + "Year").append("<option value=''>年款</option>");
                $("#ddl" + companyStr + "Style").empty();
                $("#ddl" + companyStr + "Style").append("<option value=''>请选择车型</option>");
            }
        }
    );
}

// 获取年款数据并绑定下拉列表
function GetBasicYearDDL(companyid) {
    var companyStr = switchCompany(companyid);
    var jQuerytargetId = $("#ddl" + companyStr + "Year");
    var modelid = $("#ddl" + companyStr + "Model").val();
    if (modelid == -1 || modelid == "") {
        $("#ddl" + companyStr + "Year").empty().append("<option value=''>年款</option>");
        $("#ddl" + companyStr + "Style").empty().append("<option value=''>请选择车型</option>");
        return;
    }
    $.ajax(
        {
            url: "/AHStylePropertyCompare/GetBasicYearDdl",
            data: { modelId: modelid, companyId: companyid },
            type: "POST",
            beforeSend: function () {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>正在加载..</option>");
            },
            success: function (data) {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>年款</option>");
                //处理数据
                if (data != "" && data != null) {
                    var htmlString = "";
                    for (var i = 0; i < data.length; i++) {
                        htmlString += "<option value='" + data[i] + "'>" + data[i] + "</option>";
                    }
                    jQuerytargetId.append(htmlString);
                }
                $("#ddl" + companyStr + "Style").empty();
                $("#ddl" + companyStr + "Style").append("<option value=''>请选择车型</option>");
            }
        }
    );
}

// 绑定车型数据的下拉列表
function GetBasicStyleDDL(companyid) {
    var companyStr = switchCompany(companyid);
    var jQuerytargetId = $("#ddl" + companyStr + "Style");
    var modelid = $("#ddl" + companyStr + "Model").val();
    var years = $("#ddl" + companyStr + "Year").val();
    $.ajax(
        {
            url: "/AHStylePropertyCompare/GetBasicStyleDdl",
            data: { modelId: modelid, companyId: companyid, year: years },
            type: "POST",
            beforeSend: function () {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>正在加载..</option>");
            },
            success: function (data) {
                jQuerytargetId.empty();
                jQuerytargetId.append("<option value=''>请选择车型</option>");
                //处理数据
                if (data != "" && data != null) {
                    var htmlString = "";
                    for (var i = 0; i < data.length; i++) {
                        htmlString += "<option value='" + data[i].Id + "'>" + data[i].Name + "</option>";
                    }
                    jQuerytargetId.append(htmlString);
                }
            }
        }
    );
}

// 通过企业Id获取公司的简称
function switchCompany(companyId) {
    var companyStr = "";
    switch (companyId) {
        case 1:
            companyStr = "Pc";
            break;
        case 2:
            companyStr = "Qq";
            break;
        case 3:
            companyStr = "Sh";
            break;
        case 4:
            companyStr = "Xc";
            break;
        case 5:
            companyStr = "Ah";
            break;
    }
    return companyStr;
}
