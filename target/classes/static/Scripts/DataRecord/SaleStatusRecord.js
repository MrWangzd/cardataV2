$(document).ready(function () {
    var modelTitle = "";
    var styleTitle = "";
    var para = "";
    var columnsConfig = [[
        { field: 'SaleStatus', title: '销售状态', width: getWidth(0.37) },
        { field: 'Count', title: '数量', width: getWidth(0.3) },
        { field: 'Percent', title: '占比', width: getWidth(0.3) }
    ]];

    $("#selectbtn").bind("click", function() {
        var date = $("#selectDate").datebox("getValue");
        if (date != "") {
            para = { "CarType": "车系", "updateTime": date };
            modelTitle = date.substr(5, 2) + "月" + date.substr(8, 2) + "日易车网车系销售状态统计";
            RenderData("modelSaleStatus", modelTitle, para, columnsConfig);

            para = { "CarType": "车型", "updateTime": date };
            styleTitle = date.substr(5, 2) + "月" + date.substr(8, 2) + "日易车网车型销售状态统计";
            RenderData("styleSaleStatus", styleTitle, para, columnsConfig);
        }
    });

    /**加载表单*/
    var myDate = new Date();
    var lastDayTime = CurentTime(myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate() - 1);
    $('#selectDate').datebox('setValue', lastDayTime);
    modelTitle = (myDate.getMonth() + 1) + "月" + (myDate.getDate() - 1) + "日易车网车系销售状态统计";
    para = { "CarType": "车系", "updateTime": lastDayTime };
    RenderData("modelSaleStatus", modelTitle, para, columnsConfig);
    
    styleTitle = (myDate.getMonth() + 1) + "月" + (myDate.getDate() - 1) + "日易车网车型销售状态统计";
    para = { "CarType": "车型", "updateTime": lastDayTime };
    RenderData("styleSaleStatus", styleTitle, para, columnsConfig);
});

function RenderData(renderId, title, queryParams, columnsConfig) {
    $("#" + renderId).datagrid({
        fitColumns: false,
        scrollbarSize: 0,
        title: title,
        url: "/DataRecord/GetSaleStatusSource",
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

 