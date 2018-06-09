$(function () {
    var columnsConfig = [[
        //{ field: 'ck', checkbox: true },
        { field: 'EntityId', title: '车型ID', width: fixWidth(0.1), align: 'center' },
        {
            field: 'EntityName',
            title: '车系+车型名称 所属品牌',
            width: fixWidth(0.4),
            align: 'center',
            formatter: function(value, row,index) {
                return row.ModelName + "|" + row.EntityName + "|" + row.MakeName;
            }
        },
        { field: 'FormatDeleteTime', title: '删除时间', width: fixWidth(0.3), align: 'center' },
        { field: 'Operator', title: '操作员', width: fixWidth(0.2), align: 'center' }
        //{
        //    field: 'action',
        //    title: '操作',
        //    align: 'center',
        //    width: fixWidth(0.2),
        //    formatter: function (value, row, index) {
        //        var htmlArray = [];
        //        htmlArray.push(jQuery.validator.format('<img id=ico{0} src="/Content/Images/loading.gif" class="juzhong an_margin" style="visibility:hidden" />', row.EntityId));
        //        htmlArray.push(jQuery.validator.format('<input type="button" class="an_small m_r an_margin" onclick="Recover({0},{1})" value="还原" />', row.EntityId,row.ModelId));
        //        //htmlArray.push(jQuery.validator.format('<input type="button" class="an_big m_r an_margin" onclick="Delete({0})" value="彻底删除" />', row.EntityId));
        //        return htmlArray.join("");
        //    }
        //}
    ]];
    //为主品牌添加 change事件
    $("#ddlMasterBrand").change(function () {
        GetModelDdl();
    });
    //为品牌和车系添加 change事件
    $("#ddlMakeAndModel").change(function () {
        Search();
    });
    /**搜索按钮事件绑定*/
    $("#btnSearch").bind("click", function () {
        queryParams.modId = "";
        queryParams.mabId = "";
        var styleName = $("#txtStyle").val();
        if (styleName == "车型名称") {
            queryParams.styleName = "";
        } else {
            queryParams.styleName = $.trim(styleName);
        }
        $("#t_style").datagrid("load", queryParams);
    });
    //搜索框得到焦点绑定事件
    $("#txtStyle").bind("focus", function () {
        var styleName = $("#txtStyle").val();
        if (styleName == "车型名称") {
            $("#txtStyle").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtStyle").bind("blur", function () {
        var styleName = $("#txtStyle").val();
        if ($.trim(styleName) == "") {
            $("#txtStyle").val("车型名称");
        }
    });
    /**批量还原*/
    $("#btnBitchRecover").click(function () {
        if (getChecked() > 0) {
            $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
                if (r) {
                    RecoverStyleList();
                }
            });
        } else {
            $.messager.alert('提示', '请选择要还原的车型!', 'info');
        }
    });
    /**批量删除*/
    //$("#btnBitchDelete").click(function () {
    //    if (getChecked() > 0) {
    //        $.messager.confirm('提示', '此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
    //            if (r) {
    //                DelStyleList();
    //            }
    //        });
    //    } else {
    //        $.messager.alert('提示', '请选择要删除的车型!', 'info');
    //    }
    //});
    /**加载表单*/
    RenderDate(1, queryParams, columnsConfig);
});

var queryParams = { "styleName": "", "mabId": "", "modId": "" };

/*common函数*/
function GetModelDdl() {
    queryParams.modId = "";
    var jQuerytargetId = $("#ddlMakeAndModel");
    $.ajax(
            {
                url: "/RecycleStyle/GetMakeModelDdl?mabId=" + $("#ddlMasterBrand").val(),
                type: "GET",
                beforeSend: function () {
                    jQuerytargetId.empty();
                    jQuerytargetId.append("<option value='0'>正在加载..</option>");
                },
                success: function (data) {
                    jQuerytargetId.empty();
                    jQuerytargetId.append("<option value='0'>请选择品牌和车系</option>");
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
                    queryParams.mabId = ($("#ddlMasterBrand").val());
                    $("#t_style").datagrid("load", queryParams);
                }
            }
        );
}

function Search() {
    var modId = $("#ddlMakeAndModel").val();
    queryParams.modId = modId;
    $("#t_style").datagrid("load", queryParams);
}

//function Delete(styleId) {
//    var par = { "styleId": styleId };
//    $.messager.confirm('提示', '确定要删除吗？', function (r) {
//        if (r) {
//            var img = $("#ico" + styleId).get(0);
//            img.style.visibility = "visible";
//            $.post("/RecycleStyle/AjaxDeleteStyle", par, function (data) {
//                if (data.IsSuccess) {
//                    $.messager.alert('提示', '删除成功', 'info', function () {
//                        $('#t_style').datagrid('reload');
//                    });
//                }
//            }, "json");
//        }
//    });
//}

function Recover(styleId, modelId) {
    var par = { "styleId": styleId, "modelId": modelId };
    $.messager.confirm('提示', '确定要还原吗？', function(r) {
        if (r) {
            var img = $("#ico" + styleId).get(0);
            img.style.visibility = "visible";
            $.post("/RecycleStyle/AjaxRecoverStyle", par, function(dataM) {
                if (dataM.IsSuccess) {
                    $.messager.alert('提示', '还原成功', 'info', function() {
                        $('#t_style').datagrid('reload');
                    });
                } else {
                    $.messager.alert('提示', dataM.ErrorMessage, 'info', function() {
                        $('#t_style').datagrid('reload');
                    });
                }
            }, "json");
        }
    });
}


//function AllDelete() {
//    if (getChecked() > 0) {
//        $.messager.confirm('提示', '此操作为物理删除，不可恢复！确定要删除吗？', function (r) {
//            if (r) {
//                DelStyleList();
//            }
//        });
//    } else {
//        $.messager.alert('提示', '请选择要删除的车型!', 'info');
//    }
//}
function AllRecover() {
    if (getChecked() > 0) {
        $.messager.confirm('提示', '确定要全部还原吗？', function (r) {
            if (r) {
                RecoverStyleList();
            }
        });
    } else {
        $.messager.alert('提示', '请选择要还原的车型!', 'info');
    }
}
function RecoverStyleList() {
    var selected = $("#t_style").datagrid("getSelections");
    var idString = "";
    $.each(selected, function (index, item) {
        var img = $("#ico" + item.EntityId).get(0);
        img.style.visibility = "visible";
        idString += item.EntityId + "_";
    });

    var par = { "styleIds": idString.substring(0, idString.length - 1) };

    $.post("/RecycleStyle/BatchRecoverStyle", par, function (data) {
        if (data != "true") {
            $.messager.alert('提示', '车型ID为' + data + '的车型未还原成功,请检查该车型所属车系是否已还原或已存在该车型', 'info');
        } else {
            $.messager.alert('提示', '还原成功!', 'info');
        }
        $('#t_style').datagrid('reload');
        //批量删除或批量还原后，消除 全选框 的选定状态
        $("#datalist [type=checkbox]").attr("checked", false);
    }, "json");
}
//function DelStyleList() {
//    var selected = $("#t_style").datagrid("getSelections");
//    var idString = "";
//    $.each(selected, function (index, item) {
//        var img = $("#ico" + item.EntityId).get(0);
//        img.style.visibility = "visible";
//        idString += item.EntityId + "_";
//    });

//    var par = { "styleIds": idString.substring(0, idString.length - 1) };
//    $.post("/RecycleStyle/BatchDelStyle", par, function (data) {
//        if (data != "true") {
//            $.messager.alert('提示', '车型ID为' + data + '的车型未删除成功!', 'info', function () {
//                $('#t_style').datagrid('reload');
//            });
//        } else {
//            $.messager.alert('提示', '删除成功!', 'info', function () {
//                $('#t_style').datagrid('reload');
//            });
//        }
//        //批量删除或批量还原后，消除 全选框 的选定状态
//        $("#datalist [type=checkbox]").attr("checked", false);
//    }, "json");
//}

//计算选中数量
function getChecked() {
    var selected = $("#t_style").datagrid("getSelections");
    return selected.length;
}


function RenderDate(pageNumber, queryParams, columnsConfig) {
    $("#t_style").datagrid({
        rownumbers: true,
        title: "车型回收站列表",
        pagination: true,
        scrollbarSize: 0,
        url: "/RecycleStyle/AjaxGetStyleDataSource",
        queryParams: queryParams,
        pageNumber: pageNumber,
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_style').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function () {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_style').datagrid('selectRow', index);
                    } else {
                        $('#t_style').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);

            $('select[_id=1]').change(function () {
                model.ChangeStatus(this);
            });
        }
    });
};


