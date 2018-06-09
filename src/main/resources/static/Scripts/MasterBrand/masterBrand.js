/// <reference path="../jquery-1.8.3.js" />

//厂商
var MasterBrand = function (renderId) {
    this.RenderId = renderId;
};
MasterBrand.prototype.Add = function () {
    window.location.href = '/MasterBrand/Add';
};
MasterBrand.prototype.Edit = function (id) {
    window.open( '/MasterBrand/Edit?masterBrandId=' + id);
};
MasterBrand.prototype.Preview = function (id) {
    window.open( '/MasterBrand/Preview?Id=' + id);
};
MasterBrand.prototype.AddMake = function (id, isEnabled) {
    if (!isEnabled) {
        $.messager.alert('提示', '无法添加品牌，该主品牌已停用', 'error');
    } else {
        window.open('/Make/Add?masterBrandId=' + id);
    }
};
MasterBrand.prototype.EditMake = function (id) {
    window.open('/Make/Edit?Id=' + id);
};
MasterBrand.prototype.Remove = function(id) {
    var para = { "entityId": id };
    var me = this;
    $.messager.confirm('提示', '确定要删除吗？', function(r) {
        if (r) {
            $.post("/MasterBrand/AjaxRemove", para, function (data) {
                if (data.result) {
                    $.messager.alert('提示', '操作成功!', 'info', function() {
                        $("#" + me.RenderId).datagrid("reload");
                    });
                } else {
                    $.messager.alert('提示', '无法删除，旗下有品牌存在', 'error');
                }
            }, "json");
        }
    });
};
MasterBrand.prototype.ChangeStatus = function (o) {
    var me = this;
    var result = o.value;
    var id = o.attributes["name"].value;
    var para = { "id": id };
    var enableUrl = result == "true" ? "/MasterBrand/SetEnableStatus" : "/MasterBrand/SetDisabledStatus";
    $.ajax({
        url: enableUrl,
        type: "POST",
        data: para,
        success: function (data) {
            if (data.result) {
                $.messager.alert('提示', data.resultMsg, 'info', function () {
                    var locationHref = location.href;
                    location.href = locationHref;
                });
            } else {
                $.messager.alert('提示', jQuery.validator.format("{0}", data.resultMsg), 'error', function () {
                    $("#" + me.RenderId).datagrid("reload");
                });
            }
        },
        error: function (data) {
            $("#" + me.RenderId).datagrid("reload");
        }
    });
};
MasterBrand.prototype.GetMasterBrandList = function () {
    var me = this;
    $("#" + me.RenderId).datagrid("load");
};

MasterBrand.prototype.RenderDate = function (renderId, title, pageNumber, columnsConfig, pagination) {
    var hasRowNumbers = $("#PageType").val() == "List";
    var content = $("#SearchCondition").val();
    var url = "/MasterBrand/GetMasterBrands/?content=" + content;
    $("#" + renderId).datagrid({
        rownumbers: hasRowNumbers,
        pageSize: 20,
        title: title,
        pagination: pagination,
        nowrap: false,
        scrollbarSize: 0,
        url: url,
        pageNumber: pageNumber,
        method: 'get',
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

            $('select[_id=1]').change(function () {
                var me = this;
                var suggestInfo = $(me).val() == "false" ? "主品牌下的品牌、车系、车型都将被停用。确定要执行此操作吗？" : "确定要执行此操作吗？";
                $.messager.confirm('提示', suggestInfo, function (res) {
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

function Del(masterBrandId) {
    $.get("/MasterBrand/Delete?masterBrandId=" + masterBrandId, function () {
        window.location.href = "/MasterBrand";
    });
}

function Edit(masterBrandId) {
    window.location.href = "/MasterBrand/Edit?masterBrandId=" + masterBrandId;
}

function SetStatus(masterBrandId, status) {   
    $.get("/MasterBrand/SetStatus?id=" + masterBrandId + "&status=" + status, function () {
        window.location.href = "/MasterBrand";
    });
}

function Preview(masterBrandId) {
    window.location.href = "/MasterBrand/Preview?masterBrandId=" + masterBrandId;
}
