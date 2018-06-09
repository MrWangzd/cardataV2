/// <reference path="../jquery-1.8.3.js" />
//厂商
var Manufacturer = function (renderId) {
    this.RenderId = renderId;
};
Manufacturer.prototype.GetManufacturerList = function () {
    var me = this;
    $("#" + me.RenderId).datagrid("load", queryParams);
};
Manufacturer.prototype.GetManufacturerListBySpell = function (spell, manufacturerName) {
    var me = this;
    queryParams.spell = spell;
    queryParams.manufacturerName = manufacturerName;
    me.GetManufacturerList();
};
Manufacturer.prototype.Add = function () {
    window.location.href = "/Manufacturer/Add";
};
Manufacturer.prototype.Edit = function (id) {
    window.open('/Manufacturer/Edit?Id=' + id);
};
Manufacturer.prototype.Preview = function (id) {
    window.open('/Manufacturer/Preview?Id=' + id);
};
Manufacturer.prototype.AddMake = function (id, isEnabled) {
    if (!isEnabled) {
        $.messager.alert('提示', '无法添加品牌，该厂商已停用', 'error');
    } else {
        window.open('/Make/Add?manufacturerId=' + id);
    }
};
Manufacturer.prototype.EditMake = function (id) {
    window.open('/Make/Edit?Id=' + id);
};
Manufacturer.prototype.Remove = function (id, makesCount) {
    var para = { "entityId": id };
    $.messager.confirm('提示', '确定要删除吗？', function (r) {
        if (r) {
            $.post("/Manufacturer/AjaxSetRemovedStatus", para, function (data) {
                if (data.result) {
                    $.messager.alert('提示', '删除成功!', 'info', function () {
                        $("#t_manufacturer").datagrid('reload');
                    });
                } else {
                    $.messager.alert('提示', '无法删除，旗下有品牌存在', 'error');
                }
            }, "json");
        }
    });
};
Manufacturer.prototype.ChangeStatus = function (o) {
    var me = this;
    var result = o.value;
    var id = o.attributes["name"].value;
    var para = { "entityId": id, "isEnable": result == "true" };
    $.ajax({
        url: "/Manufacturer/SetEnableStatus",
        type: "POST",
        data: para,
        success: function (data) {
            if (data.result) {
                $.messager.alert('提示', data.resultMsg, 'info', function () {
                    $("#" + me.RenderId).datagrid("reload");
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
Manufacturer.prototype.BitchRemove = function () {
    if (getChecked() > 0) {
        $.messager.confirm('提示', '确定要删除吗？', function (r) {
            if (r) {
                var selected = $("#t_manufacturer").datagrid("getSelections");
                var idString = "";
                $.each(selected, function (index, item) {
                    idString += item.Id + "_";
                });

                var par = { "entityIds": idString.substring(0, idString.length - 1) };
                $.post("/Manufacturer/AjaxAllDelete", par, function (data) {
                    if (data.result) {
                        $.messager.alert('提示', '全部删除成功!', 'info', function () {
                            $('#t_manufacturer').datagrid('reload');
                        });
                    } else {
                        $.messager.alert('提示', "编号" + data.resultMsg + "未删除成功,检查旗下品牌是否已删除", 'error', function () {
                            $('#t_manufacturer').datagrid('reload');
                        });
                    }
                });
            }
        });
    } else {
        $.messager.alert('提示', '请选择要删除的厂商!', 'info');
    }
};
Manufacturer.prototype.RenderDate = function (renderId, title, pageNumber, columnsConfig) {
    $("#" + renderId).datagrid({
        rownumbers: true,
        title: title,
        pagination: true,
        nowrap: false,
        scrollbarSize: 0,
        url: "/Manufacturer/GetManufacturerDataSource/?content="+$("#SearchCondition").val(),
        pageNumber: pageNumber,
        pageSize: 20,
        method: 'get',
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function () {
            function bindRowsEvent() {
                var panel = $('#t_manufacturer').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_manufacturer').datagrid('selectRow', index);
                    } else {
                        $('#t_manufacturer').datagrid('unselectRow', index);
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
                        manufacturer.ChangeStatus(me);
                    } else {
                        $(me).val($(me).val() == "false" ? "true" : "false");
                    }
                });
            });
        }
    });
};



