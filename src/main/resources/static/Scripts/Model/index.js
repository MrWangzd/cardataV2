var queryParams = { "saleStatus": "", "productionStatus": "", "styleId": "", "modelId": "", "year": "" };
$(function () {

    BindDdlYear();

    /**批量删除*/
    $("#btnBitchRemove").click(function () {
        if (getChecked() > 0) {
            $.messager.confirm('提示', '确定要删除吗？', function (r) {
                if (r) {
                    var selected = $("#t_style").datagrid("getSelections");
                    var idString = "";
                    $.each(selected, function (index, item) {
                        idString += item.Id + "_";
                    });

                    var par = { "ids": idString.substring(0, idString.length - 1) };
                    $.post("/Style/AjaxIsDefaults", par, function (result) {
                        if (result.state == 0) {
                            $.post("/Style/AjaxAllDelete", par, function (data) {
                                if (data == "true") {
                                    $.messager.alert('提示', '全部删除成功!', 'info');
                                    $('#t_style').datagrid('reload');
                                } else {
                                    $.messager.alert('以下ID未删除成功', data, 'error');
                                }
                            });
                        }
                        else if (result.state == 1) {
                            $.messager.confirm('提示', result.result, function (r) {
                                if (r) {
                                    $.post("/Style/AjaxAllDelete", par, function (data) {
                                        if (data == "true") {
                                            $.messager.alert('提示', '全部删除成功!', 'info');
                                            $('#t_style').datagrid('reload');
                                        } else {
                                            $.messager.alert('以下ID未删除成功', data, 'error');
                                        }
                                    });
                                }
                            });
                        }
                        else if (result.state == 2) {
                            $.messager.alert('提示', result.result, "info");
                        }
                    });
                }
            });
        } else {
            $.messager.alert('提示', '请选择要删除的车型!', 'error');
        }
    });

    $("#btn_add").on("click", function () {
        location.href = "/Model/Add";
    });
    $("#btnBatchEdit").on("click", function () {
        var selected = $("#t_style").datagrid("getSelections");
        if (selected.length == 0) {
            $.messager.alert("提示", "请选择要修改参配的车型！", "error");
            return false;
        }
        var ids = new Array();
        $.each(selected, function (index, item) {
            ids.push(item.Id);
        });
        var url = "/StyleBatchEdit/BatchEditOpenPage?ids=" + ids.join("-");
        window.open(url);
    });
    
    $("#btnBatchEditBaseInfo").on("click", function () {
        var selected = $("#t_style").datagrid("getSelections");
        if (selected.length == 0) {
            $.messager.alert("提示", "请选择要修改的车型！", "error");
            return false;
        }
        var ids = new Array();
        $.each(selected, function (index, item) {
            ids.push(item.Id);
        });
        var url = "/StyleBatchEdit/BatchEditBaseInfo?ids=" + ids.join("-");
        window.open(url);
    });

    var columnsConfig = [[
        { field: 'ModelId', title: 'ID', width: fixWidth(0.1),align:'center' },
        {
            field: 'Name',
            title: '车系名称',
            width: fixWidth(0.2),
            align:'center',
            formatter: function(value, row, index) {
                var str = new Array();
                str.push(row.Name);
                return str.join("");
            }
        },
        { field: 'DisplayName', title: '显示名称', width: fixWidth(0.14), align: 'center'},
        { field: 'SaleStatus', title: '销售状态', width: fixWidth(0.1), align: 'center'},
        {
            field: 'action',
            title: '操作',
            width: fixWidth(0.56),
            formatter: function (value, row) {
                var str = new Array();
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)"   onclick="AddStyle(' + row.MasterBrandId + ',' + row.MakeId + ',' + row.ModelId + ',' + row.IsEnabled + ')" >添加车型</a>');
                str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" onclick="Edit(' + row.ModelId + ')">编辑</a>');
                str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" class="a_remove" onclick="SetRemovedStatus(' + row.ModelId + ',' + jQuery.isEmptyObject(row.StyleList) + ')">删除</a>');
                str.push('<a class="s_l an_small m_l an_margin" target="_blank" onclick=window.open("/SaleCount/AccordType?mabId=' + row.MasterBrandId + '&makeId=' + row.MakeId + '&csId=' + row.ModelId + '") href="javascript:void(0)">销量</a>');
                str.push('<a class="s_l an_small m_l an_margin" target="_blank" onclick=window.open("/Ncap/Index?mabId=' + row.MasterBrandId + '&makeId=' + row.MakeId + '&modelId=' + row.ModelId + '") href="javascript:void(0)">碰撞</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick=window.open("http://car.op.bitauto.com/photomanage/PanoAlbum/List?ModelId=' + row.ModelId + '") id="quanJing_model_' + row.ModelId + '">全景</a>');
                str.push(jQuery.validator.format('<a class=\"s_l an_big m_l an_margin\" href=\"javascript:void(null)\" onclick=\"ColorManage({0},\'{1}\')\" >颜色管理</a>', row.ModelId, row.ModelLatestYear));
                str.push(jQuery.validator.format('<a class=\"s_l an_big m_l an_margin\" href=\"javascript:void(null)\" onclick=\"PackageManage({0},\'{1}\')\" >选配包管理</a>', row.ModelId, row.ModelLatestYear));
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick="YearManage(' + row.ModelId + ')" >年款管理</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick="ModelMerge(' + row.ModelId + ')" >车系合并</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + row.ModelId + '") id="tupian_model_' + row.ModelId + '">图片</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" id="shipin_model_' + row.ModelId + '">视频</a>');
                str.push('<select class="s_l m_l an_margin juzhong" onchange="SetEnabledStatus(' + row.ModelId + ',this)">');
                var qiyong = row.IsEnabled ? "selected=selected" : "";
                var tingYong = row.IsEnabled ? "" : "selected=selected";
                str.push('<option value="true" ' + qiyong + ' >启用</option>');
                str.push('<option value="false" ' + tingYong + ' >停用</option>');
                str.push("</select>");
                return str.join("");
            }
        }
    ]];
    var columnsStyleConfig = [
        [
            { field: 'ck', checkbox: true },            
            {
                field: 'Year',
                title: '年款',
                align: 'center',
                width: fixWidth(0.08),
                formatter: function (value, row, index) {
                    if (row.Year == 0) {
                        return "未知款";
                    } else {
                        return row.Year + '款';
                    }
                }
            },
            {
                field: 'Name',
                align: 'center',
                title: '车型名称',
                width: fixWidth(0.2),
                formatter: function (value, row, index) {
                    var str = new Array();
                    str.push(row.Name);
                    return str.join("");
                }
            },
            { field: 'StyleBodyTypeName', align: 'center', title: '车身型式', width: fixWidth(0.08) },
            {
                field: 'FormatNowMsrp',
                align: 'center',
                title: '厂商指导价',
                width: fixWidth(0.1),
                formatter: function (value, row, index) {
                    if (row.VmSaleStatus == 0) {
                        if (row.FormatNowMsrp) {
                            return "未上市<br>" + row.FormatNowMsrp;
                        } else {
                            return "未上市";
                        }
                    } else {
                        return row.FormatNowMsrp;
                    }
                }
            },
            { field: 'StyleTagName', title: '上市标签', align: 'center', width: fixWidth(0.08) },
            { field: 'FormatCreateTime', align: 'center', title: '创建时间', width: fixWidth(0.15) },
            {
                field: 'action',
                title: '操作', 
                align: 'left',
                width: fixWidth(0.35),
                formatter: function (value, row, index) {
                    
                    //innerHtml.push('<a href="javascript:void(0)"  onclick=copyStyle(' + row.Id + ')>复制</a></span>');
                    
                    var innerHtml = [];
                    var modleId = $("#modelHiddenId").val();
                    innerHtml.push('<span style="margin-left:6px;color:black;">车型：</span><a href="javascript:void(0)" onclick=EditStyle(' + row.Id + ')>概况</a> ');
                    innerHtml.push('<a href="javascript:void(0)" onclick=EditPropertyValue(' + row.Id + ')>参配</a> ');
                    var enable = '<select class="m_l juzhong" id="styleStatus" _id="1" modelId=' + row.ModelId + ' name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select><br class="clear"/>';
                    if (row.IsEnabled) {
                        enable = '<select class="m_l juzhong" id="styleStatus" _id="1" modelId=' + row.ModelId + ' name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select><br class="clear"/>';
                    }
                    innerHtml.push(enable);                    
                    innerHtml.push('<span style="margin-left:6px;color:black;">图片：</span>');
                    innerHtml.push('<a href="javascript:void(0)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + modleId + '&styleId=' + row.Id + '&open=1")>新建</a> ');
                    innerHtml.push('<a href="javascript:void(0)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + modleId + '&styleId=' + row.Id + '") id="tupian_' + row.Id + '">管理</a>');
                    innerHtml.push('<a style="margin-left:4px;" href="javascript:void(0)" onclick=window.open("http://car.op.bitauto.com/photomanage/PanoAlbum/List?StyleId=' + row.Id + '") id="quanJing_' + row.Id + '">全景</a>');
                    innerHtml.push('<br/><span style="margin-left:6px;display: block;color:black;" id="shipin_' + row.Id + '">视频：</span>');


                   
                    return innerHtml.join("");
                }
            }
        ]
    ];
    queryParams.saleStatus = "0,1,3";
    $(".seacher-box :checkbox").change(function() {
        var saleStatusArray = [];
        $(".seacher-box :checkbox").each(function() {
            if ($(this).prop("checked")) {
                saleStatusArray.push($(this).val());
            }
        });
        queryParams.saleStatus = saleStatusArray.join(",");
        $("#t_style").datagrid("load", queryParams);
    });
    
    /**年款下拉列表change事件绑定*/
    $("#ddlYear").change(function () {
        var ddlStyle = $("#ddlStyle");
        var yearVal = $("#ddlYear").val() == "未知款" ? 0 : $("#ddlYear").val();
        $.ajax(
            {
                url: "/Style/GetStylesDdl?modId=" + $("#modelHiddenId").val() + "&year=" + yearVal,
                type: "GET",
                success: function (data) {
                    ddlStyle.empty();
                    ddlStyle.append("<option value='-1'>请选择车型</option>");
                    //处理数据
                    var htmlString = "";
                    for (var i = 0; i < data.length; i++) {
                        htmlString += "<option value='" + data[i].Id + "'>" + data[i].Name + "</option>";
                    }
                    ddlStyle.append(htmlString);
                    queryParams.styleId = "";
                    queryParams.year = yearVal;
                    $("#t_style").datagrid("load", queryParams);
                }
            }
        );
    });
    /**车型下拉列表change事件绑定*/
    $("#ddlStyle").change(function () {
        queryParams.styleId = $("#ddlStyle").val();
        $("#t_style").datagrid("load", queryParams);
    });
    RenderDate(columnsConfig);
    RenderStyleData(queryParams, columnsStyleConfig);
    //弹出层关闭
    $("#cancleBtn").click(function () {
        $('#addForm').window('close');
});
    //下拉框选择事件
    $("#MasterBrandId").on("change", function () {
        var masterId = $(this).val();
        $("#MakeId option").remove();
        $("#MakeId").append("<option value=''>请选择品牌</option>");
        $("#Id option").remove();
        $("#Id").append("<option value=''>请选择车系</option>").attr("disabled", "disabled");
        if (masterId <= 0) {
            return false;
        }
        var url = "/Model/GetMakeSelectList/" + masterId;
        var optionHtml = new Array();
        $.getJSON(url, function (data) {
            var length = data.length;
            for (var i = 0; i < length; i++) {
                optionHtml.push("<option value=\"");
                optionHtml.push(data[i].Value);
                optionHtml.push("\" ");
                if (data[i].Selected) {
                    optionHtml.push(" selected ");
                }
                optionHtml.push(">");
                optionHtml.push(data[i].Text);
                optionHtml.push("</option>");
            }
            $("#MakeId").append(optionHtml.join(""));
        });
    });
    $("#MakeId").on("change", function () {
        var makeId = $(this).val();
        $("#Id option").remove();
        $("#Id").append("<option value=''>请选择车系</option>");
        if (makeId <= 0) {
            return false;
        }
        var url = "/Model/GetModelSelectList/" + makeId;
        var optionHtml = new Array();
        $.getJSON(url, function (data) {
            var length = data.length;
            for (var i = 0; i < length; i++) {
                optionHtml.push("<option value=\"");
                optionHtml.push(data[i].Value);
                optionHtml.push("\" ");
                if (data[i].Selected) {
                    optionHtml.push(" selected ");
                }
                optionHtml.push(">");
                optionHtml.push(data[i].Text);
                optionHtml.push("</option>");
            }
            $("#Id").removeAttr("disabled").append(optionHtml.join(""));
        });
    });
});

function BindDdlYear() {
    var ddlYear = $("#ddlYear");
    $.ajax(
        {
            url: "/Style/GetYearsDdl?modId=" + $("#modelHiddenId").val(),
            type: "GET",
            beforeSend: function () {
                ddlYear.empty();
                ddlYear.append("<option value='0'>正在加载..</option>");
            },
            success: function (data) {
                ddlYear.empty();
                ddlYear.append("<option value='-1'>请选择年款</option>");
                //处理数据
                var htmlString = "";
                for (var i = 0; i < data.length; i++) {
                    var yearStr = data[i];
                    if (!yearStr) {
                        yearStr = '未知款';
                    }
                    htmlString += "<option value='" + yearStr + "'>" + yearStr + "</option>";
                }
                ddlYear.append(htmlString);
            }
        }
    );
}

function NeishiManage(id) {
    window.open("/ModelColor/NeiShi/" + id);
}

function ColorManage(id, modelLatestYear) {
    window.open("/ModelColor/?id=" + id + "&year=" + modelLatestYear);
}
function PackageManage(id, modelLatestYear) {
    window.open("/ModelPackage/?id=" + id + "&year=" + modelLatestYear);
}

function YearManage(id) {
    window.open("/Year/Add?modelId=" + id);
}

function Edit(id) {
    window.open("/Model/Edit/" + id);
}
function EditPropertyValue(id) {
    window.open('/StylePropertyValue/EditPropertyValue?id=' + id);
}

//点击旗下车型，直接连接到编辑车型
function EditStyle(id) {
    window.open('/Style/Edit?Id=' + id);
}

function preview(id) {
    window.open('/Style/StylePreview?id=' + id);
}

function copyStyle(id) {
    window.open("/Style/Copy/" + id);
}

function jiaoDui(id) {
    window.open('/AHStylePropertyCompare/ComparePropertyValue?id=' + id);
}

function removeStyle(id) {
    var para = { "id": id, "state": 1 };
    $.post("/Style/AjaxIsDefault", para, function (data) {
        if (data.isDefault) {
            $.messager.alert('提示', data.result, 'info');
        } else {
            $.messager.confirm('提示', data.result, function (r) {
                if (r) {
                    $.post("/Style/AjaxSetRemovedStatus", para, function (result) {
                        if (result.IsSuccess) {
                            $.messager.alert('提示', '删除成功!', 'info', function () {
                                $('#t_style').datagrid('reload');
                            });
                        } else {
                            $.messager.alert('提示', '删除失败', 'error');
                        }
                    });
                }
            });
        }
    }, "json");
}

function SetRemovedStatus(modelId) {
    $.messager.confirm("提示", "确定要删除吗？", function (res) {
        if (res) {
            var url = "/Model/Remove/";
            $.ajax({
                url: url,
                type: "POST",
                data: { id: modelId },
                success: function (data) {
                    if (data.IsSuccess) {
                        $.messager.alert("提示", "操作成功", 'info', function () {
                            $("#t_model").datagrid("load", queryParams);
                        });
                    } else {
                        $.messager.alert("提示", data.resultM, 'error');
                    }
                }
            });
        }
    });
}

function SetEnabledStatus(modelId, obj) {
    var enabledStatus = $(obj).val() == "true";
    var enableUrl = enabledStatus ? "/Model/SetEnableStatus" : "/Model/SetDisabledStatus";
    var suggestInfo = enabledStatus ? "确定要执行此操作吗？" : "车系下的车型都将被停用。确定要执行此操作吗？";
    $.messager.confirm("提示", suggestInfo, function (res) {
        if (res) {
            $.ajax({
                url: enableUrl,
                type: "POST",
                data: { id: modelId, enabledStatue: enabledStatus },
                success: function (data) {
                    if (data.result) {
                        $.messager.alert("提示", "操作成功", 'info', function () {
                            var locationHref = location.href;
                            location.href = locationHref;
                        });
                    } else {
                        $.messager.alert("提示", "操作失败: " + data.message, 'error', function () {
                            $("#t_model").datagrid("reload");
                        });
                    }
                },
                error: function (data) {
                    $("#t_model").datagrid("reload");
                }
            });
        } else {
            $(obj).val($(obj).val() == "false" ? "true" : "false");
        }
    });
}

function Preview(id) {
    window.open("/Model/PreView/" + id);
}

function RenderDate(columnsConfig) {
    $("#t_model").datagrid({
        scrollbarSize: 0,
        queryParams: queryParams,
        url: "/Model/GetModels/?id=" + $("#modelHiddenId").val(),
        method: 'get',
        fitColumns: true,
        columns: columnsConfig,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $("#t_model").datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $("#t_model").datagrid('selectRow', index);
                    } else {
                        $("#t_model").datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }
            setTimeout(function () {
                bindRowsEvent();
            }, 10);
            GetModelQuanJingLink();
            GetModelShiPinLink();
            GetModelTuPianLink();
        }
    });
}

function fixWidth(percent) {
    return $("#right").width() * percent;
}

function GetMakeSelectList(masterBrandId) {
    $("#MakeSel option:not(:first)").remove();
    queryParams.makeId = "";
    if (masterBrandId <= 0) {
        return false;
    }
    var url = "/Model/GetMakeSelectList/" + masterBrandId;
    var optionHtml = new Array();
    $.getJSON(url, function (data) {
        var length = data.length;
        for (var i = 0; i < length; i++) {
            optionHtml.push("<option value=\"");
            optionHtml.push(data[i].Value);
            optionHtml.push("\" ");
            if (data[i].Selected) {
                optionHtml.push(" selected ");
            }
            optionHtml.push(">");
            optionHtml.push(data[i].Text);
            optionHtml.push("</option>");
        }
        $("#MakeSel").append(optionHtml.join(""));
    });
}

function NeishiManage(id) {
    window.open("/ModelColor/NeiShi/" + id);
}

function CheShenManage(id) {
    window.open("/ModelColor/CheShen/" + id);
}

function YearManage(id) {
    window.open("/Year/Add?modelId=" + id);
}
//车系合并
function ModelMerge(id) {
    $('#addForm').window({
        modal: true
    });
    $('#addForm').window('open');
}
//合并操作返回结果
function resultMerge(data) {
    if (data && data["result"] == true) {
        $.messager.alert('提示', data["message"], 'info', function () {
            $('#addForm').window('close');
            $("#t_model").datagrid("reload");
            $("#t_style").datagrid("reload");
        });
    } else {
        $.messager.alert('提示', data["message"], 'error', function () {
            $('#addForm').window('close');
        });
    }
}
function startValidation()
{
    var modelId = $("#Id").val();
    if (modelId <= 0) {
        $.messager.alert('提示', "请选择车系", 'error');
        return false;
    }
    return true;
}

//计算选中数量
function getChecked() {
    var selected = $("#t_style").datagrid("getSelections");
    return selected.length;
}

function AddStyle(masterBrandId, makeId, modelId, isEnabled) {
    if (!isEnabled) {
        $.messager.alert('提示', '无法添加车型，该车系已停用', 'error');
    } else {
        var url = jQuery.validator.format('/Style/AddFromModel?masterBrandId={0}&makeId={1}&modelId={2}', masterBrandId, makeId, modelId);
        window.open(url);
    }

}

function RenderStyleData(queryParams, columnsConfig) {
    queryParams.modelId = $("#modelHiddenId").val();
    $("#t_style").datagrid({
        rownumbers: true,
        pageSize: 20,
        title: "车型列表",
        pagination: true,
        scrollbarSize: 0,
        nowrap: false,
        url: "/Model/GetStyleDataSource",
        method: 'POST',
        queryParams: queryParams,
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_style').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
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
            //启用停用
            $('select[_id=1]').change(function () {
                var me = this;
                var result = $(me).val();
                var id = me.attributes["name"].value;
                var paraM = { "id": id, "modelId": $(me).attr("modelId"), "status": result == "true" };
                var paraN = { "id": id, "state": 0 };

                if (result == "false") {
                    $.ajax({
                        url: "/Style/AjaxIsDefault",
                        type: "POST",
                        data: paraN,
                        success: function (data) {
                            if (data.isDefault) {
                                $.messager.alert('提示', data.result, 'error', function () {
                                    $(me).val($(me).val() == "false" ? "true" : "false");
                                });
                            } else {
                                $.messager.confirm('提示', data.result, function (r) {
                                    if (r) {
                                        $.ajax({
                                            url: "/Style/SetEnableStatus",
                                            type: "POST",
                                            data: paraM,
                                            success: function (data) {
                                                if (data.result) {
                                                    $.messager.alert('提示', data.resultM, 'info', function () {
                                                        var locationHref = location.href;
                                                        location.href = locationHref;
                                                    });
                                                } else {
                                                    $.messager.alert('提示', data.resultM, 'error', function () {
                                                        $("#t_style").datagrid("reload");
                                                    });
                                                }
                                            },
                                            error: function (data) {
                                                $("#t_style").datagrid("reload");
                                            }
                                        });
                                    } else {
                                        $(me).val($(me).val() == "false" ? "true" : "false");
                                    }
                                });
                            }
                        }
                    });
                } else {
                    $.ajax({
                        url: "/Style/SetEnableStatus",
                        type: "POST",
                        data: paraM,
                        success: function (data) {
                            if (data.result) {
                                $.messager.alert('提示', data.resultM, 'info', function () {
                                    $("#t_style").datagrid("reload");
                                });
                            } else {
                                $.messager.alert('提示', data.resultM, 'error', function () {
                                    $("#t_style").datagrid("reload");
                                });
                            }
                        },
                        error: function (data) {
                            $("#t_style").datagrid("reload");
                        }
                    });
                }
            });
            GetShiPinLink();
            GetTuPianLink();
            GetQuanJingLink();
        },
        rowStyler: function (index, row) {
            if (!row.IsEnabled) {
                return 'color:blue;';
            }
            if (row.VmSaleStatus == 2) {
                //停产在销
                return 'color:green;';
            }
            if (row.VmSaleStatus == 3) {
                //停产停销
                return 'color:#BCBCBC;';
            }
        }
    });
}
//三合一全景接口
function GetQuanJingLink() {
    var ids = GetStyleIds();
    if (ids == null || ids == "") {
        return;
    }    
    var url = "http://webapi.photo.bitauto.com/photoApi/capi/car/v1/style/GetPanoAlbumCount";
    $.ajax({
        url: url,
        data: { "styleIds": ids },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data.Data) != "undefined" && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {
                    var styleId = data.Data[i].StyleId;
                    if (typeof ($("#quanJing_" + styleId)) == "undefined") {
                        continue;
                    }
                    $("#quanJing_" + styleId).html("全景(" + data.Data[i].AlbumCount + ")");
                }
            }
        }
    });
}
//三合一图片接口
function GetTuPianLink()
{
    var ids = GetStyleIds();
    if (ids == null || ids == "") {
        return;
    }
    var url = "http://webapi.photo.bitauto.com/PhotoApi/api/v1/style/GetAlbumCount";
    $.ajax({
        url: url,
        data: { styleIds: ids },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data.Data) != "undefined" && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {
                    var styleId = data.Data[i].StyleId;
                    if (typeof ($("#tupian_" + styleId)) == "undefined") {
                        continue;
                    }
                    $("#tupian_" + styleId).html("管理(" + data.Data[i].AlbumCount + ")");
                }
            }
        }
    });
}
//三合一视频接口
function GetShiPinLink() {
    var ids = GetStyleIds();
    if (ids == null || ids == "") {
        return;
    }
    $.ajax({
        url: " http://v.bitauto.com/restfulapi/typecollection/GetCollectionByCarId?apikey=460ad6f3-8216-469f-9b1c-52cffa5d812c",
        type: "GET",
        data: { carids: ids },
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data) != "undefined" && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var styleId = data[i].CarId;
                    if (typeof ($("#shipin_" + styleId)) == "undefined") {
                        continue;
                    }
                    var innerHtml = [];
                    var name = data[i].Name;
                    //if (data[i].Num > 0) {
                    //    name = name + "(" + data[i].Num + ")";
                    //}
                    innerHtml.push('<a href="javascript:void(0)" onclick=window.open("' + data[i].Link + '")>' + name + '</a> ');
                    $("#shipin_" + styleId).html("视频："+ innerHtml.join(""));
                    $("#shipin_" + styleId).show();
                }
            }
        }
    });
}
function GetStyleIds() {
    var rows = $("#t_style").datagrid('getRows');//获取所有数据行
    var field = 'Id';
    var ids = new Array();
    for (var i = 0; i < rows.length; i++)
    {
        ids[i] = rows[i][field];
    }
    var ids2 = ids.join(',');
    return ids2;
}
//三合一图片接口
function GetModelTuPianLink() {
    var ids = GetModelIds();
    if (ids == null || ids == "") {
        return;
    }
    var url = "http://webapi.photo.bitauto.com/PhotoApi/api/v1/model/GetAlbumCount";
    $.ajax({
        url: url,
        data: { modelIds: ids },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data.Data) != "undefined" && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {
                    var modelId = data.Data[i].ModelId;
                    if (typeof ($("#tupian_model_" + modelId)) == "undefined") {
                        continue;
                    }
                    $("#tupian_model_" + modelId).html("图片(" + data.Data[i].AlbumCount + ")")
                }
            }
        }
    });
}
//三合一全景接口
function GetModelQuanJingLink() {
    var ids = GetModelIds();
    if (ids == null || ids == "") {
        return;
    }
    var url = "http://webapi.photo.bitauto.com/photoApi/capi/car/v1/model/GetPanoAlbumCount";
    $.ajax({
        url: url,
        data: { "modelIds": ids },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data.Data) != "undefined" && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {
                    var modelId = data.Data[i].ModelId;
                    if (typeof ($("#quanJing_model_" + modelId)) == "undefined") {
                        continue;
                    }
                    $("#quanJing_model_" + modelId).html("全景(" + data.Data[i].AlbumCount + ")");
                }
            }
        }
    });
}
//三合一视频接口
function GetModelShiPinLink() {
    var ids = GetModelIds();
    if (ids == null || ids == "") {
        return;
    }
    $.ajax({
        url: "http://v.bitauto.com/restfulapi/typecollection/GetCollectionByCsid?apikey=460ad6f3-8216-469f-9b1c-52cffa5d812c",
        type: "GET",
        data: { csids: ids },
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            if (typeof (data) != "undefined" && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var csId = data[i].CsId;
                    if (typeof ($("shipin_model_" + csId)) == "undefined") {
                        continue;
                    }
                    $("#shipin_model_" + csId).html("视频(" + data[i].Num + ")");
                    $("#shipin_model_" + csId).attr("onclick", "ShiPin('" + data[i].Link + "')");
                }
            }
        }
    });
}
function ShiPin(link) {
    window.open(link);
}
function GetModelIds() {
    var rows = $("#t_model").datagrid('getRows');//获取所有数据行
    var field = 'ModelId';
    var ids = new Array();
    for (var i = 0; i < rows.length; i++) {
        ids[i] = rows[i][field];
    }
    var ids2 = ids.join(',');
    return ids2;
}


