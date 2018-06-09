$(function () {
    var columnsConfig = [[
        { field: 'ck', checkbox: true, width: fixWidth(0.06) },
        { field: 'Id', title: 'Id', hidden: true, width: fixWidth(0.06) },
        { field: 'Name', title: '域用户名', width: fixWidth(0.1) },
        {
            field: 'EmailAdress',
            title: '邮箱地址',
            width: fixWidth(0.1),
            formatter: function(value, row, index) {
                return row.Name + "@yiche.com";
            }
        },
        { field: 'ReceiverCompany', title: '所属业务线', width: fixWidth(0.1) },
        { field: 'LogCategory', title: '邮件预警内容', width: fixWidth(0.2) },
        { field: 'Description', title: '描述', width: fixWidth(0.1) },
        { field: 'UserStatus', title: '用户状态', width: fixWidth(0.1) },
        {
            field: 'action',
            title: '操作',
            width: fixWidth(0.28),
            formatter: function(value, row, index) {
                var htmlArray = [];
                htmlArray.push(jQuery.validator.format('<input type=\"button\" onclick=Edit(\"{0}\") value=\"编辑\" class="an_small s_l m_r m_l"/>', row.Id));
                htmlArray.push(jQuery.validator.format('<input type=\"button\" onclick=Delete(\"{0}\") value=\"删除\" class="an_small s_l m_r m_l"/>', row.Id));
                if (row.IsEnabled) {
                    htmlArray.push(jQuery.validator.format('<select class="sec" id="emailReceiverStatus" _id="1" name=\"{0}\"><option value="1" selected="selected">启用</option><option value="0">停用</option></select>', row.Id));
                } else {
                    htmlArray.push(jQuery.validator.format('<select class="sec" id="emailReceiverStatus" _id="1" name=\"{0}\"><option value="1">启用</option><option value="0" selected="selected">停用</option></select>', row.Id));
                }
                return htmlArray.join("");
            }
        }
    ]];
    /**搜索按钮事件绑定*/
    $("#btnSearch").on("click", function () {
        var emailLogReceiverName = $("#txtEmailLogReceiver").val();
        if (emailLogReceiverName == "域用户名") {
            queryParams.nameOrEmail = "";
        } else {
            queryParams.nameOrEmail = $.trim(emailLogReceiverName);
        }
        $("#t_emailLogReceiver").datagrid("load", queryParams);
    });
    //搜索框得到焦点绑定事件
    $("#txtEmailLogReceiver").on("focus", function () {
        var emailLogReceiverName = $("#txtEmailLogReceiver").val();
        if (emailLogReceiverName == "域用户名") {
            $("#txtEmailLogReceiver").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtEmailLogReceiver").on("blur", function () {
        var emailLogReceiverName = $("#txtEmailLogReceiver").val();
        if ($.trim(emailLogReceiverName) == "") {
            $("#txtEmailLogReceiver").val("域用户名");
        }
    });
    /**批量删除*/
    $("#btnBitchDelete").click(function () {
        if (getChecked() > 0) {
            $.messager.confirm('提示', '确定要删除吗？', function (r) {
                if (r) {
                    DelEmailList();
                }
            });
        } else {
            $.messager.alert('提示', '请选择要删除的项!', 'info');
        }
    });
    /**添加*/
    $("#btn_add").on("click", function (res) {
        window.location.href = "/EmailLogReceiver/Add";
    });
    /**加载表单*/
    RenderDate(1, queryParams, columnsConfig);
});

var queryParams = { "nameOrEmail": "" };

function Delete(id) {
    $.messager.confirm('提示', '确定要删除吗？', function (r) {
        if (r) {
            var par = { "id": id };
            $.post("/EmailLogReceiver/DeleteEmail", par, function (result) {
                if (result == 'True') {
                    $.messager.alert('提示', '删除成功!', 'info', function () {
                        //window.location.href = "/EmailLogReceiver/Index";
                        $("#t_emailLogReceiver").datagrid('reload');
                    });
                }
            });
        }
    });
}

function Edit(id) {
    window.location.href = '/EmailLogReceiver/Edit?Id=' + id;
}

function allDelete() {
    if (getChecked() > 0) {
        $.messager.confirm('提示', '确定要删除吗？', function (r) {
            if (r) {
                DelEmailList();
            }
        });
    } else {
        $.messager.alert('提示', '请选择要删除的项!', 'info');
    }
}

function DelEmailList() {
    var selected = $("#t_emailLogReceiver").datagrid("getSelections");
    var idString = "";
    $.each(selected, function (index, item) {
        idString += item.Id + "_";
    });

    var par = { "emailIds": idString.substring(0, idString.length - 1) };
    $.post("/EmailLogReceiver/MultiSetEmailStatus", par, function (data) {
        if (data == "true") {
            $.messager.alert('提示', '全部删除成功!', 'info');
            $('#t_emailLogReceiver').datagrid('reload');
        } else {
            $.messager.alert('提示', "编号" + data + "未删除成功", 'info');
        }
        $('#t_emailLogReceiver').datagrid('reload');
    }, "json");
}

/*common函数*/
//计算选中数量
function getChecked() {
    var selected = $("#t_emailLogReceiver").datagrid("getSelections");
    return selected.length;
}

function RenderDate(pageNumber, queryParams, columnsConfig) {
    $("#t_emailLogReceiver").datagrid({
        rownumbers: true,
        title: "邮件通知列表",
        pagination: true,
        nowrap: false,
        scrollbarSize: 0,
        url: "/EmailLogReceiver/GetEmailDataSource",
        queryParams: queryParams,
        pageNumber: pageNumber,
        method: 'get',
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_emailLogReceiver').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_emailLogReceiver').datagrid('selectRow', index);
                    } else {
                        $('#t_emailLogReceiver').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);
            //启用停用
            $('select[_id=1]').change(function () {
                var id = $(this).attr("name");
                var para = { "id": id, "isEnabled": $(this).val() };
                $.ajax({
                    url: "/EmailLogReceiver/SetEmailEnabledStatus",
                    type: "POST",
                    data: para,
                    success: function (data) {
                        if (data) {
                            $.messager.alert('提示', '状态改变成功!', 'info', function () {
                                $("#t_emailLogReceiver").datagrid("reload");
                            });
                        }
                    },
                    error: function (data) {
                        $("#t_emailLogReceiver").datagrid("reload");
                    }
                });
            });
        }
    });
}

