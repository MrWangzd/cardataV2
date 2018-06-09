$(function () {
    $('#tbStyleMonthData').datagrid({
        pageSize: 20,
        rownumbers: true,
        pagination: true,
        scrollbarSize: 0,
        url: '/DataReport/GetStyleMonthData',
        fitColumns: true,
        columns: [[
            {
                field: 'Date',
                title: '时间',
                width: fixWidth(0.25),
                formatter: function (value, row, index) {
                    //return '<a href="#" onclick="DataReport()">' + row.Date + '</a>';
                    return '<a href="#" onclick="DataReport(\'' + row.Date + '\')">' + row.Date + '</a>';
                }
            },
            { field: 'AddCount', title: '添加车型数', width: fixWidth(0.25) },
            { field: 'EditCount', title: '修改车型数', width: fixWidth(0.25) },
            { field: 'Total', title: '合计', width: fixWidth(0.25) }
        ]],
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#tbStyleMonthData').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#tbStyleMonthData').datagrid('selectRow', index);
                    } else {
                        $('#tbStyleMonthData').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }
            setTimeout(function () {
                bindRowsEvent();
            }, 10);
        }
    });


    GetYearDorpdownList();
    $("#yearSelect").change(function () {
        var year = $("#yearSelect").val();
        var par = { "year": year };
        $("#tbStyleMonthData").datagrid("load", par);
    });
});

function DataReport(data) {
    window.location.href = "/DataReport/Index?data=" + data;
}

function GetYearDorpdownList() {
    var jQuerytargetId = $("#yearSelect");
    $.ajax(
    {
        url: "/DataReport/GetStyleYears",
        type: "POST",
        beforeSend: function () {
            jQuerytargetId.empty();
            jQuerytargetId.append("<option value='0'>正在加载..</option>");
        },
        success: function (data) {
            jQuerytargetId.empty();

            jQuerytargetId.append("<option value=''>请选择年</option>");
            //处理数据
            var htmlString = "";
            for (var mab in data) {

                htmlString += "<option value='" + data[mab] + "'>" + data[mab] + "</option>";
            }
            //加载显示数据
            jQuerytargetId.append(htmlString);

        }
    });
    }