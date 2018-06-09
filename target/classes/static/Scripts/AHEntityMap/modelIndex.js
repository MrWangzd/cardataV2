
$(document).ready(function () {
    /**搜索按钮事件绑定*/
    $("#btnSearch").bind("click", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "车系名称/ID") {
            queryParams.modelName = "";
        } else {
            queryParams.modelName = $.trim(masterBrandName);
        }
        $('#t_datalist').datagrid('reload');
    });
    //搜索框的得到焦点绑定事件
    $("#txtMasterBrand").bind("focus", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "车系名称/ID") {
            $("#txtMasterBrand").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtMasterBrand").bind("blur", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if ($.trim(masterBrandName) == "") {
            $("#txtMasterBrand").val("车系名称/ID");
        }
    });

    //编辑提交绑定事件
    $("#submitEdit").bind("click", function () {
        var waitTime = 500;

        $.messager.progress({ text: '正在保存数据，请稍等' });
        window.setTimeout(function () {
            var result = saveEntityMap();
            $.messager.progress('close');
            if (result) {
                $.messager.alert("提示", "操作成功", 'info', function () {
                });
            } else {
                $.messager.alert("提示", jQuery.validator.format("操作失败,{0}", "error"), "error", function () {
                });
            }
            $.messager.progress('close');
            $('#EditEntityMapForm').window('close');
            $('#t_datalist').datagrid('reload');
        }, waitTime);
    });
    //取消编辑绑定事件
    $("#cancelEdit").bind("click", function () {
        refreshDdl();
        $('#EditEntityMapForm').window('close');
    });

    RenderDate("t_datalist", "车系列表", 1, queryParams, columnsConfig);

});

var queryParams = { "modelName": "", "spell": "" };

var queryUrl = "/AHEntityMap/GetModels";  //获取数据列表url，当选择显示汽车之家未匹配数据时，会改变

var columnsConfig = [[
    //{
    //    field: 'BitModelId', title: '车系ID', width: fixWidth(0.1),
    //    formatter: function (value, row, index) {
    //        if (row.BitModelId > 0) {
    //            return row.BitModelId;
    //        } else {
    //            return "";
    //        }
    //    }
    //},
    {
        field: 'BitModelName',
        title: '易车车系名称',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.BitModelName != null && row.BitModelName.length > 0) {
                return '[' + row.BitMakeName + ']<br>' + row.BitModelName;
            }
            return "";
        }
    },

    {
        field: 'AhModelName',
        title: '汽车之家',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.AhModelName != null && row.AhModelName.length > 0) {
                return '[' + row.AhMakeName + '] <br>' + row.AhModelName;
            }
            return "";
        }
    },

    {
        field: 'XcModelName',
        title: '爱卡',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.XcModelName != null && row.XcModelName.length > 0) {
                return '[' + row.XcMakeName + '] <br>' + row.XcModelName;
            }
            return "";
        }
    },

    {
        field: 'PcModelName',
        title: '太平洋',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.PcModelName != null && row.PcModelName.length > 0) {
                return '[' + row.PcMakeName + '] <br>' + row.PcModelName;
            }
            return "";
        }
    },

    {
        field: 'ShModelName',
        title: '搜狐',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.ShModelName != null && row.ShModelName.length > 0) {
                return '[' + row.ShMakeName + '] <br>' + row.ShModelName;
            }
            return "";
        }
    },

    {
        field: 'QqModelName',
        title: '腾讯',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.QqModelName != null && row.QqModelName.length > 0) {
                return '[' + row.QqMakeName + '] <br>' + row.QqModelName;
            }
            return "";
        }
    },
    {
        field: 'action',
        title: '操作',
        width: fixWidth(0.05),
        formatter: function (value, row, index) {
            var s = '<input type="button" class="an_small s_l m_r" onclick="Edit(\'' + row.BitModelId + '\',\'' + row.BitModelName.toString() + '\',\'' + row.BitMakeName + '\')"    value="编辑" />';
            return s;
        }
    }
]];

function RenderDate(renderId, title, pageNumber, queryParams, columnsConfig) {
    $("#" + renderId).datagrid({
        rownumbers: true,
        title: title,
        pagination: true,
        nowrap: false,
        scrollbarSize: 0,
        url: queryUrl,
        queryParams: queryParams,
        pageNumber: pageNumber,
        method: 'post',
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_masterBrand').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_datalist').datagrid('selectRow', index);
                    } else {
                        $('#t_datalist').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);

            $('select[_id=1]').change(function () {
                var me = this;
                $.messager.confirm('提示', '确定要执行此操作吗？', function (res) {
                    if (res) {
                        masterBrand.ChangeStatus(me);
                    } else {
                        $(me).val($(me).val() == "false" ? "true" : "false");
                    }
                });
            });
        }
    });
};



function Edit(bitId, bitModelName, bitMakeName) {

    $("#hidden_entityId").val(bitId);
    $("#entityName").html(bitMakeName + '-' + bitModelName);
    if (!bitId > 0) {
        alert("此状态下不能编辑！");
        return;
    }

    $.ajax(
        {
            url: "/AHEntityMap/GetCompanyModelsByBitModelId",
            data: { bitModelId: bitId },
            type: "POST",
            success: function (data) {
                //jQuerytargetId.empty();
                //jQuerytargetId.append("<option value=''>请选择品牌和车系</option>");
                $(data).each(function (i, masterBrand) {
                    var companyId = masterBrand.CompanyId;
                    var masterBrandId = masterBrand.MasterBrandId;
                    var companyStr = switchCompany(companyId);
                    $("#ddl" + companyStr + "MasterBrand").val(masterBrandId);
                    var makes = masterBrand.Makes;
                    var htmlString = "";
                    var selectedId = "";
                    htmlString += "<option value=''>请选择品牌和车系</option>";
                    $(makes).each(function (a, make) {
                        htmlString += "<optgroup label=" + make.MakeName + " style=''></optgroup>";
                        var serials = make.Serials;
                        $(serials).each(function (b, model) {
                            if (model.IsRemoved == 1)
                                selectedId = model.Id;
                            htmlString += "<option value='" + model.Id + "' >" + model.Name + "</option>";
                        });
                    });
                    $("#ddl" + companyStr + "Model").empty().append(htmlString);
                    $("#ddl" + companyStr + "Model").val(selectedId);
                    //jQuerytargetId.append(htmlString);
                });
            }
        }
    );

    var waitTime = 500;
    $.messager.progress({ text: '正在请求数据，请稍等' });
    window.setTimeout(function () {
        $.messager.progress('close');
    }, waitTime);
    $("#EditEntityMapForm").window('open');
}

function saveEntityMap() {
    var bitModelId = $("#hidden_entityId").val();
    var ahModelId = $("#ddlAhModel").val();
    var xcModelId = $("#ddlXcModel").val();
    var pcModelId = $("#ddlPcModel").val();
    var shModelId = $("#ddlShModel").val();
    var qqModelId = $("#ddlQqModel").val();
    if (bitModelId > 0) {
        var url = "/AHEntityMap/EditModelEntityMap";
        var result = $.ajax({
            async: false,
            url: url,
            data: {
                bitId: bitModelId
                , ahId: ahModelId == "" ? 0 : ahModelId
                , xcId: xcModelId == "" ? 0 : xcModelId
                , pcId: pcModelId == "" ? 0 : pcModelId
                , shId: shModelId == "" ? 0 : shModelId
                , qqId: qqModelId == "" ? 0 : qqModelId
            },
            type: 'POST',
        }).responseText == 'true';
        refreshDdl();
        return result;
    }
    refreshDdl();
    return false;
}
//将弹出框中的下拉框恢复初始状态
function refreshDdl() {
    $("#ddlAhMasterBrand").val("");
    $("#ddlXcMasterBrand").val("");
    $("#ddlPcMasterBrand").val("");
    $("#ddlShMasterBrand").val("");
    $("#ddlQqMasterBrand").val("");
    $("#ddlAhModel").empty().append("<option value=''>请选择品牌和车系</option>");
    $("#ddlXcModel").empty().append("<option value=''>请选择品牌和车系</option>");
    $("#ddlPcModel").empty().append("<option value=''>请选择品牌和车系</option>");
    $("#ddlShModel").empty().append("<option value=''>请选择品牌和车系</option>");
    $("#ddlQqModel").empty().append("<option value=''>请选择品牌和车系</option>");
}



