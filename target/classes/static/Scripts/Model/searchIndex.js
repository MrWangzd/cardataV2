$(function () {
    $("#btn_add").on("click", function () {
        location.href = "/Model/Add";
    });
    //弹出层关闭
    $("#cancleBtn").click(function () {
        $('#addForm').window('close');
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
        { field: 'DisplayName', title: '显示名称', width: fixWidth(0.14), align: 'center' },
        { field: 'SaleStatus', title: '销售状态', width: fixWidth(0.1), align: 'center' },
        {
            field: 'action',
            title: '操作',
            width: fixWidth(0.56),
            formatter: function(value, row) {
                var str = new Array();
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)"   onclick="AddStyle(' + row.MasterBrandId + ',' + row.MakeId + ',' + row.ModelId + ',' + row.IsEnabled + ')" >添加车型</a>');
                str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" onclick="Edit(' + row.ModelId + ')">编辑</a>');
                str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" class="a_remove" onclick="SetRemovedStatus(' + row.ModelId + ',' + jQuery.isEmptyObject(row.StyleList) + ')">删除</a>');
                str.push('<a class="s_l an_small m_l an_margin" target="_blank" onclick=window.open("/SaleCount/AccordType?mabId=' + row.MasterBrandId + '&makeId=' + row.MakeId + '&csId=' + row.ModelId + '") href="javascript:void(0)">销量</a>');
                //str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" onclick="Preview(' + row.ModelId + ')">预览</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick=window.open("http://car.op.bitauto.com/photomanage/PanoAlbum/List?ModelId=' + row.ModelId + '") id="quanJing_model_' + row.ModelId + '">全景</a>');
                str.push('<a class="s_l an_small m_l an_margin" href="javascript:void(null)" onclick=window.open("/Ncap/Index?mabId=' + row.MasterBrandId + '&makeId=' + row.MakeId + '&modelId=' +row.ModelId + '")>碰撞</a>');
                str.push(jQuery.validator.format('<a class=\"s_l an_big m_l an_margin\" href=\"javascript:void(null)\" onclick=\"ColorManage({0},\'{1}\')\" >颜色管理</a>', row.ModelId, row.ModelLatestYear));
                str.push(jQuery.validator.format('<a class=\"s_l an_big m_l an_margin\" href=\"javascript:void(null)\" onclick=\"PackageManage({0},\'{1}\')\" >选配包管理</a>', row.ModelId, row.ModelLatestYear));
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick="YearManage(' + row.ModelId + ')" >年款管理</a>');
                str.push(jQuery.validator.format('<a class=\"s_l an_big m_l an_margin\" href=\"javascript:void(null)\" onclick=\"ModelMerge({0},{1},{2},\'{3}\')\" >车系合并</a>', row.MasterBrandId, row.MakeId, row.ModelId, row.DisplayName));
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick="LookStyle(' + row.ModelId + ')">查看车型</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + row.ModelId + '") id="tupian_model_' + row.ModelId + '">图片</a>');
                str.push('<a class="s_l an_big m_l an_margin" href="javascript:void(null)" id="shipin_model_' + row.ModelId + '">视频</a>');
                str.push('<select class="s_l m_l m_t_s juzhong" onchange="SetEnabledStatus(' + row.ModelId + ',this)">');
                var qiyong = row.IsEnabled ? "selected=selected" : "";
                var tingYong = row.IsEnabled ? "" : "selected=selected";
                str.push('<option value="true" ' + qiyong + ' >启用</option>');
                str.push('<option value="false" ' + tingYong + ' >停用</option>');
                str.push("</select>");
                return str.join("");
            }
        }
    ]];
    RenderDate(columnsConfig);
});

//下拉框选择事件
function MabSelChange(source) {
    var masterId = $(source).val();
    $("#makeSel option:gt(0)").remove();
    $("#modelSel option:gt(0)").remove();
    if (masterId <= 0) {
        return;
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
        $("#makeSel").append(optionHtml.join(""));
    });
}
function MakeSelChange(source) {
    var makeId = $(source).val();
    $("#modelSel option:gt(0)").remove();
    if (makeId <= 0) {
        return;
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
        $("#modelSel").removeAttr("disabled").append(optionHtml.join(""));
    });
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
//车系合并
function ModelMerge(mabId,makeId,modelId, displayName) {
    $("#lblDisplayName1,#lblDisplayName2,#lblDisplayName3").text(displayName);
    $("#lblModelId").text(modelId);
    $("#sourceid").val(modelId);
    $('#addForm').window({
        modal: true
    });
    $('#addForm').window('open');

    $("#mabSel option:gt(0)").remove();
    //$("#mabSel").append("<option>请选择主品牌</option>");
    $("#makeSel option:gt(0)").remove();
    //$("#makeSel").append("<option>请选择品牌</option>");
    $("#modelSel option:gt(0)").remove();
    //$("#modelSel").append("<option>请选择车系</option>");
    var url = "/Model/MergeFormDdl/";
    var data = { "mabId": mabId, "makeId": makeId };
    $.get(url, data, function (res) {
        $(res.mabs).each(function () {
            if ($(this)[0].Id == mabId) {
                $("#mabSel").append("<option selected=selected value=" + $(this)[0].Id + ">" + $(this)[0].Name + "</option>");
            } else {
                $("#mabSel").append("<option value=" + $(this)[0].Id + ">" + $(this)[0].Name + "</option>");
            }
        });
        $(res.makes).each(function () {
            if ($(this)[0].Id == makeId) {
                $("#makeSel").append("<option selected=selected value=" + $(this)[0].Id + ">" + $(this)[0].Name + "</option>");
            } else {
                $("#makeSel").append("<option value=" + $(this)[0].Id + ">" + $(this)[0].Name + "</option>");
            }
        });
        $(res.models).each(function () {
            if ($(this)[0].Id == modelId) {
                $("#modelSel").append("<option value=" + $(this)[0].Id + " selected=selected>" + $(this)[0].Name + "</option>");
            } else {
                $("#modelSel").append("<option value=" + $(this)[0].Id + ">" + $(this)[0].Name + "</option>");
            }
        });
    });


}
//合并操作返回结果
function resultMerge(data) {
    if (data && data["result"] == true) {
        $.messager.alert('提示', data["message"], 'info', function () {
            $('#addForm').window('close');
            $("#t_model").datagrid("reload");
        });
    } else {
        $.messager.alert('提示', data["message"], 'error', function () {
            $('#addForm').window('close');
        });
    }
}
function startValidation() {
    var modelId = $("#Id").val();
    if (modelId <= 0) {
        $.messager.alert('提示', "请选择车系", 'error');
        return false;
    }
    return true;
}
function Edit(id) {
    window.open("/Model/Edit/" + id);
}

function LookStyle(id) {
    window.open("/Model/GetByTree/?id=" + id);
}

//点击旗下车型，直接连接到编辑车型
function EditStyle(id) {
    window.open('/Style/Edit?Id=' + id);
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
                            $("#t_model").datagrid("load");
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
                data: { id: modelId },
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
        rownumbers: true,
        scrollbarSize: 0,
        pagination: true,
        url: "/Model/GetSearchModels/?content="+$("#SearchCondition").val(),
        pageSize: 20,
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
            GetQuanJingLink();
            GetShiPinLink();
            GetTuPianLink();
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

function AddStyle(masterBrandId, makeId, modelId, isEnabled) {
    if (!isEnabled) {
        $.messager.alert('提示', '无法添加车型，该车系已停用', 'error');
    } else {
        var url = jQuery.validator.format('/Style/AddFromModel?masterBrandId={0}&makeId={1}&modelId={2}', masterBrandId, makeId, modelId);
        window.open(url);
    }

}
//三合一图片接口
function GetTuPianLink() {
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
                    $("#tupian_model_" + modelId).html("图片(" + data.Data[i].AlbumCount + ")");
                }
            }
        }
    });
}
//三合一全景接口
function GetQuanJingLink() {
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
function GetShiPinLink() {
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
                    $("#shipin_model_" + csId).attr("onclick", "ShiPin('"+data[i].Link+"')");
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
