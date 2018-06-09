$(function () {
    var columnsConfig = [[
        //{ field: 'ck', checkbox: true },
        { field: 'EntityId', title: 'ID', width: fixWidth(0.1), align: 'center' },
        { field: 'EntityName', title: '车系名称', width: fixWidth(0.3), align: 'center' },
        { field: 'FormatDeleteTime', title: '删除时间', width: fixWidth(0.3), align: 'center' },
        { field: 'Operator', title: '操作员', width: fixWidth(0.3), align: 'center' }
        //{
        //    field: 'action',
        //    align: 'center',
        //    title: '操作',
        //    width: fixWidth(0.2),
        //    formatter: function(value, row, index) {
        //        var htmlArray = [];
        //        htmlArray.push(jQuery.validator.format('<img id=ico{0} src="/Content/Images/loading.gif" class="juzhong an_margin" style="visibility:hidden" />', row.EntityId));
        //        htmlArray.push(jQuery.validator.format('<input type="button" class="an_small m_r an_margin" onclick="Recover({0})" value="还原" />', row.EntityId));
        //        //htmlArray.push(jQuery.validator.format('<input type="button" class="an_big m_r an_margin" onclick="Delete({0})" value="彻底删除" />', row.EntityId));
        //        return htmlArray.join("");
        //    }
        //}
    ]];
    /**搜索按钮事件绑定*/
    $("#btnSearch").bind("click", function () {
        var modelName = $("#txtModel").val();
        if (modelName == "车系名称") {
            queryParams.modelName = "";
        } else {
            queryParams.modelName = $.trim(modelName);
        }
        $("#t_model").datagrid("load", queryParams);
    });
    //搜索框得到焦点绑定事件
    $("#txtModel").bind("focus", function () {
        var modelName = $("#txtModel").val();
        if (modelName == "车系名称") {
            $("#txtModel").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtModel").bind("blur", function () {
        var modelName = $("#txtModel").val();
        if ($.trim(modelName) == "") {
            $("#txtModel").val("车系名称");
        }
    });
    /**批量还原*/
    $("#btnBitchRecover").click(function () {
        if (getChecked() > 0) {
            $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
                if (r) {
                    RecoverModelList();
                }
            });
        } else {
            $.messager.alert('提示', '请选择要还原的车系!', 'info');
        }
    });
    /**批量删除*/
    //$("#btnBitchDelete").click(function () {
    //    if (getChecked() > 0) {
    //        $.messager.confirm('提示', '此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
    //            if (r) {
    //                DelModelList();
    //            }
    //        });
    //    } else {
    //        $.messager.alert('提示', '请选择要删除的车系!', 'info');
    //    }
    //});
    /**加载表单*/
    RenderDate(1, queryParams, columnsConfig);
});

var queryParams = { "modelName": "" };


/*common函数*/
//function Delete(modelId) {
//    var par = { "modelId": modelId };
//    $.messager.confirm('提示', '删除车系将车系下所有车型全部删除，此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
//        if (r) {
//            var img = $("#ico" + modelId).get(0);
//            img.style.visibility = "visible";
//            $.post("/RecycleModel/AjaxDeleteModel", par, function (data) {
//                if (data.IsSuccess) {
//                    $.messager.alert('提示', '删除成功！', 'info', function () {
//                        $('#t_model').datagrid('reload');
//                    });
//                }
//            }, "json");
//        }
//    });
//}

function Recover(modelId) {
    var par = { "modelId": modelId };
    $.messager.confirm('提示', '确定要还原吗？', function (r) {
        if (r) {
            var img = $("#ico" + modelId).get(0);
            img.style.visibility = "visible";
            $.post("/RecycleModel/AjaxRecoverModel", par, function (dataM) {
                if (dataM.IsSuccess) {
                    $.messager.alert('提示', '还原成功', 'info', function () {
                        $('#t_model').datagrid('reload');
                    });
                } else {
                    $.messager.alert('提示', dataM.ErrorMessage, 'error', function () {
                        $('#t_model').datagrid('reload');
                    });
                }
            }, "json");
        }
    });
}


//function AllDelete() {
//    if (getChecked() > 0) {
//        $.messager.confirm('提示', '删除车系将车系下所有车型全部删除，此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
//            if (r) {
//                DelModelList();
//            }
//        });
//    } else {
//        $.messager.alert('提示', '请选择要删除的主品牌!', 'info');
//    }
//}
function AllRecover() {
    if (getChecked() > 0) {
        $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
            if (r) {
                RecoverModelList();
            }
        });
    } else {
        $.messager.alert('提示', '请选择要还原的车系!', 'info');
    }
}
function RecoverModelList() {
    var selected = $("#t_model").datagrid("getSelections");
    var idString = "";
    $.each(selected, function (index, item) {
        var img = $("#ico" + item.EntityId).get(0);
        img.style.visibility = "visible";
        idString += item.EntityId + "_";
    });

    var par = { "modIds": idString.substring(0, idString.length - 1) };
    $.post("/RecycleModel/BatchRecoverMod", par, function (data) {
        if (data != "true") {
            $.messager.alert('提示', '车系ID为' + data + '的车系未还原成功,请检查该车系所属品牌是否已还原', 'info', function () {
                $('#t_model').datagrid('reload');
            });
            removeChecked();
        } else {
            $.messager.alert('提示', '还原成功!', 'info', function () {
                $('#t_model').datagrid('reload');
            });
            removeChecked();
        }
    }, "json");
}
//function DelModelList() {
//    var selected = $("#t_model").datagrid("getSelections");
//    var idString = "";
//    $.each(selected, function (index, item) {
//        var img = $("#ico" + item.EntityId).get(0);
//        img.style.visibility = "visible";
//        idString += item.EntityId + "_";
//    });

//    var par = { "modIds": idString.substring(0, idString.length - 1) };
//    $.post("/RecycleModel/BatchDelMod", par, function (data) {
//        if (data != "true") {
//            $.messager.alert('提示', '车系ID为' + data + '的车系未删除成功!', 'info', function () {
//                $('#t_model').datagrid('reload');
//            });
//            removeChecked();
//        } else {
//            $.messager.alert('提示', '删除成功!', 'info', function () {
//                $('#t_model').datagrid('reload');
//            });
//            removeChecked();
//        }
//    }, "json");
//}

//计算选中数量
function getChecked() {
    var selected = $("#t_model").datagrid("getSelections");
    return selected.length;
}
//批量删除或批量还原后，消除 全选框 的选定状态
function removeChecked() {
    $("#datalist [type=checkbox]").attr("checked", false);

}

function RenderDate(pageNumber, queryParams, columnsConfig) {
    $("#t_model").datagrid({
        rownumbers: true,
        title: "车系回收站列表",
        pagination: true,
        scrollbarSize: 0,
        url: "/RecycleModel/AjaxGetModelDataSource",
        queryParams: queryParams,
        pageNumber: pageNumber,
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_model').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function () {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_model').datagrid('selectRow', index);
                    } else {
                        $('#t_model').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);

        }
    });
};


