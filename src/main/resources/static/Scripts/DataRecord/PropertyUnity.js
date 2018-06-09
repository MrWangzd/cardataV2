var sectionData = {
    "section1": [{ "Name": "MoreThanEightyFiveCount", "Value": "85%以上" }],
    "section2": [{ "Name": "SeventyToEightyFiveCount", "Value": "70%-85%" }],
    "section3": [{ "Name": "FiftyToSeventyCount", "Value": "50%-70%" }],
    "section4": [{ "Name": "LessThanFiftyCount", "Value": "50%以下" }]
};
$(document).ready(function () {
    $("#accordDayId").attr("checked", true);
    var date = new Date();
    var startTime = CurentTime(date.getFullYear(), date.getMonth() + 1, 1);
    var endTime = CurentTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    $('#startDate').datebox('setValue', startTime);
    $('#endDate').datebox('setValue', endTime);
    $("#allStyles").attr("checked", true);
    var queryParamsInit = { "Accord": "accordDay", "StartTime": startTime, "EndTime": endTime, "AxisYtype": "allStyles" }; //初始化的值
    var columnsConfig = [[
        { field: 'Createtime', title: '日期', width: getWidth(0.2) },
        { field: sectionData.section1[0].Name, title: sectionData.section1[0].Value, width: getWidth(0.2) },
        { field: sectionData.section2[0].Name, title: sectionData.section2[0].Value, width: getWidth(0.2) },
        { field: sectionData.section3[0].Name, title: sectionData.section3[0].Value, width: getWidth(0.2) },
        { field: sectionData.section4[0].Name, title: sectionData.section4[0].Value, width: getWidth(0.2) }
    ]];

    var colChartTitle = "参配完整度-全部车型";
    Draw(queryParamsInit, columnsConfig, colChartTitle);

    $("#outPutChart").bind("click", function () {
        var accord = $("input[name=Accord]:checked").val();
        var isAccordDay = accord == "accordDay";
        var validateResult = ValidateTime(isAccordDay);
        if (!validateResult) {
            return false;
        }
        var params = GetQueryParams();
        var queryParams = { "Accord": params.Accord, "StartTime": params.StartTime, "EndTime": params.EndTime, "AxisYtype": params.AxisYtype, "AxisYvalue": params.AxisYvalue };
        Draw(queryParams, columnsConfig, params.ChnTitle);
    });

    $("#exportData").bind("click", function () {
        var carType = $("input[name=carType]:checked").val();
        var url = carType == "allStyles" ? "/DataRecord/ExportAllStylesData/" : "/DataRecord/ExportData/";
        $("form").attr("action", url);
        $("form").submit();
    });
});


function GetQueryParams() {
    var accord = $("input[name=Accord]:checked").val();
    var axisYtype = "";
    var axisYvalue = "";
    var chnTitle = "";
    var carType = $("input[name=carType]:checked").val();
    switch (carType) {
        case "allStyles":
            axisYtype = "allStyles";
            chnTitle = "参配完整度-全部车型";
            break;
        case "modellevel":
            axisYtype = "modellevel";
            axisYvalue = $("#modelLevelSelectId option:selected").val();
            var chnValue = $("#modelLevelSelectId option:selected").text();
            chnTitle = "参配完整度-车身级别:" + chnValue;
            break;
        case "focus":
            axisYtype = "focus";
            axisYvalue = $("#accordFocus option:selected").val() + '-';
            var chnFocus = $("#accordFocus option:selected").text();
            chnTitle = "参配完整度-关注度区间" + chnFocus;
            break;
        case "spellFirst":
            axisYtype = "spellFirst";
            var start = $("[name=spell] option:selected")[0].value;
            var end = $("[name=spell] option:selected")[1].value;
            axisYvalue = start + "-" + end;
            var startChnSpell = $("[name=spell] option:selected")[0].innerHTML;
            var endChnSpell = $("[name=spell] option:selected")[1].innerHTML;
            chnTitle = "参配完整度-首字母区间:" + startChnSpell + "-" + endChnSpell;
            break;
        default:
    }
    var startTime = $('#startDate').datebox('getValue');
    var endTime = $('#endDate').datebox('getValue');
    var queryParams = { "Accord": accord, "StartTime": startTime, "EndTime": endTime, "AxisYtype": axisYtype, "AxisYvalue": axisYvalue, "ChnTitle": chnTitle }; //页面参数
    return queryParams;
}

function ValidateTime(accordDay) {
    var startTime = $('#startDate').datebox('getValue');
    var endTime = $('#endDate').datebox('getValue');
    $("#errerMessage").html("");
    $("#spellErrerMessage").html("");
    if (startTime > endTime) {
        $("#errerMessage").html("起始日期不得大于结束日期");
        return false;
    }
    var chaTime = GetChaTime(startTime, endTime, accordDay);
    if (chaTime > 30) {
        var errorMessage = "所选日期区间不得大于30个月";
        if (accordDay)
            errorMessage = "所选日期区间不得大于30天";

        $("#errerMessage").html(errorMessage);
        return false;
    }
    var boolCheck = $("#rabSpellFirst").is(":checked");
    if (boolCheck) {
        var start = $("[name=spell] option:selected")[0].value;
        var end = $("[name=spell] option:selected")[1].value;
        if (start > end) {
            var spellErrerMessage = "首字母大于尾字母";
            $("#spellErrerMessage").html(spellErrerMessage);
            return false;
        }
    }
    return true;
}

function Draw(queryParamsInit, columnsConfig, chnTitle) {
    //再次调用 使用返回的数据得到x轴需要的数据
    $.ajax({
        type: "POST",
        url: "/DataRecord/AjaxGetProIntegritySource",
        data: queryParamsInit,
        success: function (data) {
            var xData = new Array();
            var yLessThanFiftyData = new Array();
            var yFiftyToSeventyData = new Array();
            var ySeventyToEightyFiveData = new Array();
            var yMoreThanEightyFiveData = new Array();
            for (var i = 0; i < data.length; i++) {
                xData[i] = data[i].Createtime;
                yLessThanFiftyData[i] = parseInt(data[i].LessThanFiftyCount);
                yFiftyToSeventyData[i] = parseInt(data[i].FiftyToSeventyCount);
                ySeventyToEightyFiveData[i] = parseInt(data[i].SeventyToEightyFiveCount);
                yMoreThanEightyFiveData[i] = parseInt(data[i].MoreThanEightyFiveCount);
            }
            RenderData("dataChange", "易车网参配完善情况", queryParamsInit, columnsConfig);
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: chnTitle
                },
                xAxis: {
                    categories: xData
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '参配完整度'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: sectionData.section4[0].Value,
                    data: yLessThanFiftyData,
                    stack: 'male'
                }, {
                    name: sectionData.section3[0].Value,
                    data: yFiftyToSeventyData,
                    stack: 'male'
                }, {
                    name: sectionData.section2[0].Value,
                    data: ySeventyToEightyFiveData,
                    stack: 'male'
                }, {
                    name: sectionData.section1[0].Value,
                    data: yMoreThanEightyFiveData,
                    stack: 'male'
                }]
            });
        }
    });
}

function RenderData(renderId, title, queryParams, columnsConfig) {
    $("#" + renderId).datagrid({
        fitColumns: true,
        scrollbarSize: 0,
        title: title,
        url: "/DataRecord/AjaxGetProIntegritySource",
        queryParams: queryParams,
        columns: columnsConfig
    });
}

function CurentTime(year, month, day) {
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + "";
    return (clock);
}

function getWidth(percent) {
    return ($("#right").width()) * percent;
}

function GetChaTime(startTime, endTime, isDay) {

    var s1 = new Date(startTime.replace(/-/g, "/"));
    var s2 = new Date(endTime.replace(/-/g, "/"));

    var days = s2.getTime() - s1.getTime();
    var time;
    if (isDay) {
        time = parseInt(days / (1000 * 60 * 60 * 24));
    } else {
        time = parseInt(days / (1000 * 60 * 60 * 24 * 30));
    }
    return time;
}



