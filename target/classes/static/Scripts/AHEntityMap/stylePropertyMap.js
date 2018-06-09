$(document).ready(function () {
    /**搜索按钮事件绑定*/
    $("#btnSearch").bind("click", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "参配名称") {
            queryParams.propertyName = "";
        } else {
            queryParams.propertyName = $.trim(masterBrandName);
        }
        $('#t_datalist').datagrid('reload');
    });
    //搜索框的得到焦点绑定事件
    $("#txtMasterBrand").bind("focus", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if (masterBrandName == "参配名称") {
            $("#txtMasterBrand").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtMasterBrand").bind("blur", function () {
        var masterBrandName = $("#txtMasterBrand").val();
        if ($.trim(masterBrandName) == "") {
            $("#txtMasterBrand").val("参配名称");
        }
    });
    //取消编辑绑定事件
    $("#cancelEdit").bind("click", function () {
        refreshDdl();
        $('#EditEntityMapForm').window('close');
    });
    //下拉框绑定事件
    $("#ddlAhPropertyGroup").change(function () {
        var value = $("#ddlAhPropertyGroup").val();
        if (value == -1) {
            $("#ddlAhProperty").empty().append("<option value='-1'>取消对应关系</option>");
        } else {
            if (value != "") {
                GetBasicProperty(5, value);
            } else {
                $("#ddlAhProperty").empty().append("<option value=''>请选择参配</option>");
            }
        }
    });
    $("#ddlXcPropertyGroup").change(function () {
        var value = $("#ddlXcPropertyGroup").val();
        if (value == -1) {
            $("#ddlXcProperty").empty().append("<option value='-1'>取消对应关系</option>");
        } else {
            if (value != "") {
                GetBasicProperty(4, value);
            } else {
                $("#ddlXcProperty").empty().append("<option value=''>请选择参配</option>");
            }
        }
    });
    $("#ddlPcPropertyGroup").change(function () {
        var value = $("#ddlPcPropertyGroup").val();
        if (value == -1) {
            $("#ddlPcProperty").empty().append("<option value='-1'>取消对应关系</option>");
        } else {
            if (value != "") {
                GetBasicProperty(1, value);
            } else {
                $("#ddlPcProperty").empty().append("<option value=''>请选择参配</option>");
            }
        }

    });
    $("#ddlShPropertyGroup").change(function () {
        var value = $("#ddlShPropertyGroup").val();
        if (value == -1) {
            $("#ddlShProperty").empty().append("<option value='-1'>取消对应关系</option>");
        } else {
            if (value != "") {
                GetBasicProperty(3, value);
            } else {
                $("#ddlShProperty").empty().append("<option value=''>请选择参配</option>");
            }
        }
    });
    $("#ddlQqPropertyGroup").change(function () {
        var value = $("#ddlQqPropertyGroup").val();
        if (value == -1) {
            $("#ddlQqProperty").empty().append("<option value='-1'>取消对应关系</option>");
        } else {
            if (value != "") {
                GetBasicProperty(2, value);
            } else {
                $("#ddlQqProperty").empty().append("<option value=''>请选择参配</option>");
            }
        }
    });
    //编辑提交绑定事件
    $("#submitEdit").bind("click", function () {
        var waitTime = 500;
        $.messager.progress({ text: '正在保存数据，请稍等' });
        window.setTimeout(function () {
            var result = savePropertyMap();
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

    RenderDate("t_datalist", "车型参配", 1, queryParams, columnsConfig);

});

function GetBasicProperty(companyId, propertyGroupId) {
    var companyStr = "";
    $.ajax({
        type: "POST",
        url: "/AHEntityMap/GetBasicPropertys?companyId=" + companyId + "&basicPropertyGroupId=" + propertyGroupId,
        success: function (data) {
            switch (companyId) {
                case 1:
                    companyStr = "Pc";
                    break;
                case 2:
                    companyStr = "Qq";
                    break;
                case 3:
                    companyStr = "Sh";
                    break;
                case 4:
                    companyStr = "Xc";
                    break;
                case 5:
                    companyStr = "Ah";
                    break;
                default:
            }
            var jQuerytargetId = $("#ddl" + companyStr + "Property");
            jQuerytargetId.empty();
            jQuerytargetId.append("<option value=''>请选择参配</option>");
            //处理数据
            if (data != "" && data != null) {
                var htmlString = "";
                for (var i = 0; i < data.length; i++) {
                    htmlString += "<option value='" + data[i].Id + "'>" + data[i].Name + "</option>";
                }
                jQuerytargetId.append(htmlString);
            }
        }
    });
}

function savePropertyMap() {
    var bitPropertyId = $("#hidden_entityId").val();
    var ahPropertyId = $("#ddlAhProperty").val();
    var xcPropertyId = $("#ddlXcProperty").val();
    var pcPropertyId = $("#ddlPcProperty").val();
    var shPropertyId = $("#ddlShProperty").val();
    var qqPropertyId = $("#ddlQqProperty").val();
    if (bitPropertyId > 0) {
        var url = "/AHEntityMap/EditPropertyMap";
        var result = $.ajax({
            async: false,
            url: url,
            data: {
                bitId: bitPropertyId
                , ahId: ahPropertyId == "" ? 0 : ahPropertyId
                , xcId: xcPropertyId == "" ? 0 : xcPropertyId
                , pcId: pcPropertyId == "" ? 0 : pcPropertyId
                , shId: shPropertyId == "" ? 0 : shPropertyId
                , qqId: qqPropertyId == "" ? 0 : qqPropertyId
            },
            type: 'POST',
        }).responseText == 'true';
        refreshDdl();
        return result;
    }
    refreshDdl();
    return false;
}
//清空下拉框
function refreshDdl() {
    $("#ddlAhPropertyGroup").val("");
    $("#ddlXcPropertyGroup").val("");
    $("#ddlPcPropertyGroup").val("");
    $("#ddlShPropertyGroup").val("");
    $("#ddlQqPropertyGroup").val("");
    $("#ddlAhProperty").empty().append("<option value=''>请选择参配</option>");
    $("#ddlXcProperty").empty().append("<option value=''>请选择参配</option>");
    $("#ddlPcProperty").empty().append("<option value=''>请选择参配</option>");
    $("#ddlShProperty").empty().append("<option value=''>请选择参配</option>");
    $("#ddlQqProperty").empty().append("<option value=''>请选择参配</option>");
}

var queryParams = { "propertyName": "" };

var columnsConfig = [[
    {
        field: 'bitID', title: '易车参配Id', width: fixWidth(0.05),
        formatter: function (value, row, index) {
            return row.BitStylePropertyId;
        }
    },

    {
        field: 'bitName', title: '易车参配名称', width: fixWidth(0.15),
        formatter: function (value, row, index) {
            return row.BitStylePropertyName;
        }
    },

    {
        field: 'ahName', title: '汽车之家',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.AhStylePropertyId != 0) {
                return row.AhStylePropertyName;
            }
            return "";
        }
    },
    {
        field: 'xcName', title: '爱卡',
        width: fixWidth(0.15),
        formatter: function (value, row, index) {
            if (row.XcStylePropertyId != 0) {
                return row.XcStylePropertyName;
            }
            return "";
        }
    },
    {
        field: 'pcName', title: '太平洋',
        width: fixWidth(0.1),
        formatter: function (value, row, index) {
            if (row.PcStylePropertyId != 0) {
                return row.PcStylePropertyName;
            }
            return "";
        }
    },
    {
        field: 'shName', title: '搜狐',
        width: fixWidth(0.1),
        formatter: function (value, row, index) {
            if (row.ShStylePropertyId != 0) {
                return row.ShStylePropertyName;
            }
            return "";
        }
    },
    {
        field: 'qqName', title: '腾讯',
        width: fixWidth(0.1),
        formatter: function (value, row, index) {
            if (row.QqStylePropertyId != 0) {
                return row.QqStylePropertyName;
            }
            return "";
        }
    },

    {
        field: 'action',
        title: '操作',
        width: fixWidth(0.1),
        formatter: function (value, row, index) {
            var s = '<input type="button" class="an_small s_l m_r" onclick="Edit(\'' + row.BitStylePropertyId + '\',\'' + row.BitStylePropertyName + '\')" value="编辑" />';
            return s;
        }
    }
]];

function Edit(propertyId, propertyName) {
    $("#hidden_entityId").val(propertyId);
    $("#entityName").html(propertyName);

    $.ajax(
        {
            url: "/AHEntityMap/GetCompanyPropertyesByBitPropertyId",
            data: { bitPropertyId: propertyId },
            type: "POST",
            success: function (data) {
                $(data).each(function (i, item) {
                    var companyId = item.CompanyId;
                    var properties = item.Properties;
                    var companyStr = switchCompany(companyId);
                    var groupId = "";
                    var htmlString = "";
                    var selectedId = "";
                    htmlString += "<option value=''>请选择参配</option>";
                    $(properties).each(function (a, property) {
                        groupId = property.PropertyGroupId;
                        if (property.IsRemoved == 1) selectedId = property.Id;
                        htmlString += "<option value='" + property.Id + "' >" + property.Name + "</option>";
                    });
                    $("#ddl" + companyStr + "PropertyGroup").val(groupId);
                    $("#ddl" + companyStr + "Property").empty().append(htmlString);
                    $("#ddl" + companyStr + "Property").val(selectedId);
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

function switchCompany(companyId) {
    var companyStr = "";
    switch (companyId) {
        case 1:
            companyStr = "Pc";
            break;
        case 2:
            companyStr = "Qq";
            break;
        case 3:
            companyStr = "Sh";
            break;
        case 4:
            companyStr = "Xc";
            break;
        case 5:
            companyStr = "Ah";
            break;
    }
    return companyStr;
}


function RenderDate(renderId, title, pageNumber, queryParams, columnsConfig) {
    $("#" + renderId).datagrid({
        rownumbers: true,
        title: title,
        pagination: true,
        nowrap: false,
        scrollbarSize: 0,
        url: "/AHEntityMap/GetStylePropertyMaps",
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

