$(function () {
    //搜索框得到焦点绑定事件
    $("#txtContent").bind("focus", function () {
        var content = $("#txtContent").val();
        if (content == "主品牌/品牌/车系/车型ID") {
            $("#txtContent").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtContent").bind("blur", function () {
        var content = $("#txtContent").val();
        if ($.trim(content) == "") {
            $("#txtContent").val("主品牌/品牌/车系/车型ID");
        }
    });

    $('#tbStyleData').datagrid({
        pageSize: 20,
        rownumbers: true,
        pagination: true,
        scrollbarSize: 0,
        url: '/DataReport/GetStyleData',
        fitColumns: true,
        columns: [[
                { field: 'Id', title: '车型ID', width: fixWidth(0.125), align: 'center' },
                { field: 'Operation', title: '操作', width: fixWidth(0.125), align: 'center' },
                { field: 'Memo', title: '车型信息', width: fixWidth(0.4) },
                { field: 'OperateTime', title: '操作时间', width: fixWidth(0.15) },
                { field: 'UserName', title: '操作员', width: fixWidth(0.125),align:'center' }
        ]],
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#tbStyleData').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#tbStyleData').datagrid('selectRow', index);
                    } else {
                        $('#tbStyleData').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);
        }
    });
    //加载用户的下拉列表
    GetUserDropdownList();

    $("#btnSearch").click(function () {
        search();
    });
    if (typeof window.searchDataDate !== "undefined") {
        $("#startDate").datebox("setValue", window.searchDataDate.startDate);
        $("#endDate").datebox("setValue", window.searchDataDate.endDate);
    }

    //在第57行给按钮绑定事件时已经执行过数据加载
    //setTimeout(function () {
    //    search();
    //}, 10);
});
function search() {
    var userId = $("#userSelect").val();
    var startDate = $("#startDate").datebox('getValue');
    var endDate = $("#endDate").datebox('getValue');
    var content = $("#txtContent").val();
    var styleType = $("input[name='styleType']:checked").val();
    var par = { "userId": userId, "startDate": startDate, "endDate": endDate, "content": content, "styleType": styleType };
    if (content == "主品牌/品牌/车系/车型ID") {
        par.content = "";
    } else {
        par.content = $.trim(content);
    }
    $("#tbStyleData").datagrid("load", par);
}

function GetUserDropdownList() {
    var jQuerytargetId = $("#userSelect");
    $.ajax(
    {
        url: "/User/GetUserNameList",
        type: "POST",
        beforeSend: function () {
            jQuerytargetId.empty();
            jQuerytargetId.append("<option value='0'>正在加载..</option>");
        },
        success: function (data) {
            jQuerytargetId.empty();

            jQuerytargetId.append("<option value='0'>请选择用户</option>");
            //处理数据
            var htmlString = "";
            for (var i = 0; i < data.length; i++) {
                htmlString += "<option value='" + data[i].Id + "'>" + data[i].DisplayName + "</option>";
            }
            //加载显示数据
            jQuerytargetId.append(htmlString);
            $("#userSelect option").each(function () {
                if ($(this).val() == 0) {
                    $(this).attr("selected", "selected");
                }
            });
        }
    }
);
}

