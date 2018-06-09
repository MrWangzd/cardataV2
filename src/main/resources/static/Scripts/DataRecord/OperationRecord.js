$(document).ready(function () {
    $("#accordDayId").attr("checked", true);
    $("#accordModelId").attr("checked", true);
    $("#rabAddId").attr("checked", true);

    var columnsConfig = [[
        { field: 'Updatetime', title: '日期', width: getWidth(0.4) },
        { field: 'YicheOpCount', title: '易车车系新增', width: getWidth(0.3) },
        { field: 'AutoHomeOpCount', title: '汽车之家车系新增', width: getWidth(0.3) }
    ]];

    var date = new Date();
    var startTime = CurentTime(date.getFullYear(), date.getMonth() + 1, 1);
    var endTime = CurentTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    $('#startDate').datebox('setValue', startTime);
    $('#endDate').datebox('setValue', endTime);
    var queryParamsInit = { "Accord": "accordDay", "StartTime": startTime, "EndTime": endTime, "OperateType": "add", "CarType": "accordModel" };
    var chartTitle = "车系数据新增折线图";
    var dataGridTitle = "车系数据新增";
    Draw(queryParamsInit, columnsConfig, chartTitle, dataGridTitle);


    $("#submitData").bind("click", function () {
        var accord = $("input[name=total]:checked").val();
        startTime = $('#startDate').datebox('getValue');
        endTime = $('#endDate').datebox('getValue');
        $("#errerMessage").html("");
        var s1 = new Date(startTime);
        var s2 = new Date(endTime);
        if (s1 > s2) {
            $("#errerMessage").html("起始日期不得大于结束日期");
            return false;
        }
        if (accord == "accordDay") {
            if (GetChaTime(startTime, endTime, true) > 30) {
                $("#errerMessage").html("所选日期区间不得大于30天");
                return false;
            }
        } else {
            if (GetChaTime(startTime, endTime, false) > 30) {
                $("#errerMessage").html("所选日期区间不得大于30个月");
                return false;
            }
        }
        var operateType = $("input[name=operateType]:checked").val();
        var carType = $("input[name=carType]:checked").val();

        var operateTypeChn = operateType == "add" ? "新增" : "修改";
        var carTypeChn = carType == "accordModel" ? "车系" : "车型";
        var chartTitleInner = carTypeChn + "数据" + operateTypeChn + "折线图";
        var dataGridTitleInner = carTypeChn + "数据" + operateTypeChn;
        var queryParams = { "Accord": accord, "StartTime": startTime, "EndTime": endTime, "OperateType": operateType, "CarType": carType };
        columnsConfig = [[
            { field: 'Updatetime', title: '日期', width: getWidth(0.4) },
            { field: 'YicheOpCount', title: '易车网' + carTypeChn + operateTypeChn, width: getWidth(0.3) },
            { field: 'AutoHomeOpCount', title: '汽车之家' + carTypeChn + operateTypeChn, width: getWidth(0.3) }
        ]];
        Draw(queryParams, columnsConfig, chartTitleInner, dataGridTitleInner);
    });
});

function RenderData(renderId, title, queryParams, columnsConfig) {
    $("#" + renderId).datagrid({
        fitColumns: true,
        scrollbarSize: 0,
        title: title,
        url: "/DataRecord/GetOpRecordSource",
        queryParams: queryParams,
        columns: columnsConfig
    });
}

function getWidth(percent) {
    return ($("#right").width()) * percent;
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

function Draw(queryParamsInit, columnsConfig, chartTitle, dataGridTitle) {
    //再次调用 使用返回的数据得到x轴需要的数据
    $.ajax({
        type: "POST",
        url: "/DataRecord/GetOpRecordSource",
        data: queryParamsInit,
        success: function (data) {
            if (data.length && data.length > 0) {
                var xData = new Array();
                var yAutoHomeData = new Array();
                var yYiCheData = new Array();
                for (var i = 0; i < data.length; i++) {
                    xData[i] = data[i].Updatetime;
                    yAutoHomeData[i] = data[i].AutoHomeOpCount;
                    yYiCheData[i] = data[i].YicheOpCount;
                }
                $('#container').highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: chartTitle
                    },
                    xAxis: {
                        categories: xData
                    },
                    yAxis: {
                        min: 0,
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: '汽车之家',
                        marker: {
                            symbol: 'square'
                        },
                        data: yAutoHomeData
                    }, {
                        name: '易车网',
                        marker: {
                            symbol: 'diamond'
                        },
                        data: yYiCheData
                    }]
                });
                RenderData("dataChange", dataGridTitle, queryParamsInit, columnsConfig);
            } else {
                $.messager.alert('提示', '暂无数据!', 'info', function () {
                });
                $('#container').highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: chartTitle
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        min: 0,
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: '汽车之家',
                        marker: {
                            symbol: 'square'
                        },
                        data: []
                    }, {
                        name: '易车网',
                        marker: {
                            symbol: 'diamond'
                        },
                        data: []
                    }]
                });
                RenderData("dataChange", dataGridTitle, queryParamsInit, columnsConfig);
            }
        }
    });
}