//具有二级级别的车系级别分类
var secondLevelArr = new Array("Car", "Suv", "Mpv", "Sports", "MiniTruck", "Bus", "Pickup", "MiniVan");
$(function () {
    $("#MasterBrandId").on("change", function () {
        var masterBrandId = $(this).val();
        GetMakeSelectList(masterBrandId);
    });

    $("[id^=use_]").on("click", function () {
        var uses = new Array();
        $("[id^=use_]:checked").each(function () {
            uses.push($(this).val());
        });
        $("#Use").val(uses.join(","));
    });
    $(".an_qx").on("click", function () {
        var id = $("#Id").val();
        var url = "/Model/CancelEdit/";
        var data = { id: id };
        $.post(url, data, function (res) {
            window.location.href = "/Model/GetByTree/?id=" + id;
        });
    });
    //Mask
    $("#editPath").click(function () {
        $("#maskDiv").hide();
    });

    $("#Name").on("blur", function () {
        var name = $(this).val();
        var url = "/Model/GetAllSpell/";
        var data = { "name": name };
        $.post(url, data, function (res) {
            $("#AllSpell").val(res);
        });
    });

    $("#ModelLevelSel").on("change", function () {
        var modelLevelVal = $(this).val();
        GetOptionHtml(modelLevelVal);
    });

    $("#ModelLevelSecondSel").on("change", function () {
        if ($(this).val() != "0") {
            $("#modelLevelSecondMessage").hide();
        }
    });

    $('form').submit(function () {
        var modelLevelVal = $("#ModelLevelSel").val();
        var modelLevelSecondVal = 0;
        if ($("#ModelLevelSecondSel") && $("#ModelLevelSecondSel").is(":visible")) { //如果没有选择二级选项  (注：选微面的时候没有二级选项)
            modelLevelSecondVal = $("#ModelLevelSecondSel").val();
            if (modelLevelSecondVal == 0) {
                $("#modelLevelSecondMessage").show();
                return false;
            }
        }
        //如果一级级别选的是轿车 表单提交时 二级级别的值赋给一级级别
        if (modelLevelVal == -1) {
            modelLevelVal = $("#ModelLevelSecondSel").val();
            modelLevelSecondVal = 0;
        }
        $("#hidModelLevel").val(modelLevelVal);
        $("#hidModelLevelSecond").val(modelLevelSecondVal);
        //页面JS验证均通过 再执行此代码 否则再次点击无反应
        if ($(".field-validation-error").length == 0) {
            //防止表单重复提交
            $('input[type=submit]', this).attr('disabled', 'disabled');
        }
    });
});


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

function GetMakeSelectList(masterBrandId) {
    $("#MakeId option").remove();
    $("#MakeId").append("<option value=''>请选择品牌</option>");
    if (masterBrandId <= 0) {
        return false;
    }
    var url = "/Model/GetMakeSelectList/" + masterBrandId;
    var optionHtml = new Array();
    $.getJSON(url, function (data) {
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
    });
}

function GetOptionHtml(modelLevelVal) {
    var modelLevelSecondSel = $("#ModelLevelSecondSel");
    var optionHtmlArray = [];
    switch (modelLevelVal) {
        case "-1":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"1\">微型车</option>");
            optionHtmlArray.push("<option value=\"2\">小型车</option>");
            optionHtmlArray.push("<option value=\"3\">紧凑型车</option>");
            optionHtmlArray.push("<option value=\"4\">中型车</option>");
            optionHtmlArray.push("<option value=\"5\">中大型车</option>");
            optionHtmlArray.push("<option value=\"6\">豪华车</option>");
            modelLevelSecondSel.show();
            $("#modelLevelSecondMessage").show();
            modelLevelSecondSel.html(optionHtmlArray.join(""));
            break;
        case "7":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"1\">小型SUV</option>");
            optionHtmlArray.push("<option value=\"2\">紧凑型SUV</option>");
            optionHtmlArray.push("<option value=\"3\">中型SUV</option>");
            optionHtmlArray.push("<option value=\"4\">大型SUV</option>");
            optionHtmlArray.push("<option value=\"5\">全尺寸SUV</option>");
            modelLevelSecondSel.show();
            $("#modelLevelSecondMessage").show();
            modelLevelSecondSel.html(optionHtmlArray.join(""));
            break;
        case "8":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"14\">小型MPV</option>");
            optionHtmlArray.push("<option value=\"15\">紧凑型MPV</option>");
            optionHtmlArray.push("<option value=\"16\">中型MPV</option>");
            optionHtmlArray.push("<option value=\"17\">大型MPV</option>");
            $("#ModelLevelSecondSel").show();
            $("#modelLevelSecondMessage").show();
            $("#ModelLevelSecondSel").html(optionHtmlArray.join(""));
            break;
        case "9":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"18\">小型跑车</option>");
            optionHtmlArray.push("<option value=\"19\">中型跑车</option>");
            optionHtmlArray.push("<option value=\"20\">大型跑车</option>");
            $("#ModelLevelSecondSel").show();
            $("#modelLevelSecondMessage").show();
            $("#ModelLevelSecondSel").html(optionHtmlArray.join(""));
            break;
        case "15":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"11\">轻型卡车</option>");
            optionHtmlArray.push("<option value=\"12\">中型卡车</option>");
            optionHtmlArray.push("<option value=\"13\">重型卡车</option>");
            $("#ModelLevelSecondSel").show();
            $("#modelLevelSecondMessage").show();
            $("#ModelLevelSecondSel").html(optionHtmlArray.join(""));
            break;;
        case "14":
            optionHtmlArray.push("<option value=\"0\">请选择</option>");
            optionHtmlArray.push("<option value=\"6\">轻型客车</option>");
            optionHtmlArray.push("<option value=\"8\">大型客车</option>");
            $("#ModelLevelSecondSel").show();
            $("#modelLevelSecondMessage").show();
            $("#ModelLevelSecondSel").html(optionHtmlArray.join(""));
            break;
        default:
            $("#modelLevelSecondMessage").hide();
            $("#ModelLevelSecondSel").hide();
    }
}
