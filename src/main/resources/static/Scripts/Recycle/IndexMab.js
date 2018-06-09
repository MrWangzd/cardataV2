$(function () {
    var columnsConfig = [[
        //{ field: 'ck', checkbox: true },
        { field: 'EntityId', title: 'ID', width: fixWidth(0.1), align: 'center' },
        { field: 'EntityName', title: '主品牌名称', width: fixWidth(0.3), align: 'center' },
        {
            field: 'FormatDeleteTime',
            title: '删除时间',
            width: fixWidth(0.3),
            align: 'center'
        },
        { field: 'Operator', title: '操作员', width: fixWidth(0.3), align: 'center' }
        //{
        //    field: 'action',
        //    title: '操作',
        //    align: 'center',
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
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "主品牌名称") {
            queryParams.mabName = "";
        } else {
            queryParams.mabName = $.trim(masterBrandName);
        }
        $("#t_masterBrand").datagrid("load", queryParams);
    });
    //搜索框得到焦点绑定事件
    $("#txtMasterBrand").bind("focus", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "主品牌名称") {
            $("#txtMasterBrand").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtMasterBrand").bind("blur", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if ($.trim(masterBrandName) == "") {
            $("#txtMasterBrand").val("主品牌名称");
        }
    });
    /**批量还原*/
    $("#btnBitchRecover").click(function () {
        if (getChecked() > 0) {
            $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
                if (r) {
                    RecoverMasterBrandList();
                }
            });
        } else {
            $.messager.alert('提示', '请选择要还原的主品牌!', 'info');
        }
    });
    /**批量删除*/
    //$("#btnBitchDelete").click(function () {
    //    if (getChecked() > 0) {
    //        $.messager.confirm('提示', '此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
    //            if (r) {
    //                DelMasterBrandList();
    //            }
    //        });
    //    } else {
    //        $.messager.alert('提示', '请选择要删除的主品牌!', 'info');
    //    }
    //});
    /**加载表单*/
    RenderDate(1, queryParams, columnsConfig);
});

var queryParams = { "mabName": "" };


/*common函数*/
//function Delete(mabId) {
//    var par = { "mabId": mabId };
//    $.messager.confirm('提示', '删除主品牌将主品牌下所有品牌、车系、车型全部删除，此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
//        if (r) {
//            var img = $("#ico" + mabId).get(0);
//            img.style.visibility = "visible";
//            $.post("/RecycleMab/AjaxDeleteMab", par, function (data) {
//                if (data.IsSuccess) {
//                    $.messager.alert('提示', '删除成功', 'info', function () {
//                        $('#t_masterBrand').datagrid('reload');
//                    });
//                }
//            }, "json");
//        }
//    });
//}

function Recover(mabId) {
    var par = { "mabId": mabId };
    $.messager.confirm('提示', '确定要还原吗？', function (r) {
        if (r) {
            var img = $("#ico" + mabId).get(0);
            img.style.visibility = "visible";
            $.post("/RecycleMab/AjaxRecoverMasterBrand", par, function (data) {
                if (data.IsSuccess) {
                    $.messager.alert('提示', '还原成功', 'info', function () {
                        $('#t_masterBrand').datagrid('reload');
                    });
                } else {
                    $.messager.alert('提示', data.ErrorMessage, 'error', function () {
                        $('#t_masterBrand').datagrid('reload');
                    });
                }
            }, "json");
        }
    });
}

//function AllDelete() {
//    if (getChecked() > 0) {
//        $.messager.confirm('提示', '删除主品牌将主品牌下所有品牌、车系、车型全部删除，此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
//            if (r) {
//                DelMasterBrandList();
//            }
//        });
//    } else {
//        $.messager.alert('提示', '请选择要删除的主品牌!', 'info');
//    }
//}
//function AllRecover() {
//    if (getChecked() > 0) {
//        $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
//            if (r) {
//                RecoverMasterBrandList();
//            }
//        });
//    } else {
//        $.messager.alert('提示', '请选择要还原的主品牌!', 'info');
//    }
//}
function RecoverMasterBrandList() {
    var selected = $("#t_masterBrand").datagrid("getSelections");
    var idString = "";
    $.each(selected, function (index, item) {
        var img = $("#ico" + item.EntityId).get(0);
        img.style.visibility = "visible";
        idString += item.EntityId + "_";
    });

    var par = { "mabIds": idString.substring(0, idString.length - 1) };
    $.post("/RecycleMab/BatchRecoverMab", par, function (data) {
        if (data != "true") {
            $.messager.alert('提示', '主品牌ID为' + data + '的主品牌未还原成功!', 'info', function () {
                $('#t_masterBrand').datagrid('reload');
            });
            removeChecked();
        } else {
            $.messager.alert('提示', '还原成功!', 'info', function () {
                $('#t_masterBrand').datagrid('reload');
            });
            removeChecked();
        }
    }, "json");
}
//function DelMasterBrandList() {
//    var selected = $("#t_masterBrand").datagrid("getSelections");
//    var idString = "";
//    $.each(selected, function (index, item) {
//        var img = $("#ico" + item.EntityId).get(0);
//        img.style.visibility = "visible";
//        idString += item.EntityId + "_";
//    });

//    var par = { "mabIds": idString.substring(0, idString.length - 1) };
//    $.post("/RecycleMab/BatchDeleteMab", par, function (data) {
//        if (data != "true") {
//            $.messager.alert('提示', '主品牌ID为' + data + '的主品牌未删除成功!', 'info', function () {
//                $('#t_masterBrand').datagrid('reload');
//            });
//            removeChecked();
//        } else {
//            $.messager.alert('提示', '删除成功!', 'info', function () {
//                $('#t_masterBrand').datagrid('reload');
//            });
//            removeChecked();
//        }
//    }, "json");
//}

//计算选中数量
function getChecked() {
    var selected = $("#t_masterBrand").datagrid("getSelections");
    return selected.length;
}
//批量删除或批量还原后，消除 全选框 的选定状态
function removeChecked() {
    $("#datalist [type=checkbox]").attr("checked", false);

}

function RenderDate(pageNumber, queryParams, columnsConfig) {
    $("#t_masterBrand").datagrid({
        rownumbers: true,
        title: "主品牌回收站列表",
        pagination: true,
        scrollbarSize: 0,
        url: "/RecycleMab/AjaxGetMabDataSource",
        queryParams: queryParams,
        pageNumber: pageNumber,
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_masterBrand').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function () {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_masterBrand').datagrid('selectRow', index);
                    } else {
                        $('#t_masterBrand').datagrid('unselectRow', index);
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


