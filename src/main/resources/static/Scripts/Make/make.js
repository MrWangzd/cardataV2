/// <reference path="../jquery-1.8.3.js" />

//品牌
var Make = function (renderId) {
     this.RenderId = renderId;
};

 Make.prototype.Add = function () {
     window.location.href = '/Make/Add';
 };
 Make.prototype.Edit = function (id) {
     window.open( '/Make/Edit?Id=' + id);
 };
 Make.prototype.Preview = function (id) {
     window.open( '/Make/Preview?Id=' + id);
 };
 Make.prototype.AddModel = function (id, isEnabled, masterBrandId) {
     if (!isEnabled) {
         $.messager.alert('提示', '无法添加车系，该品牌已停用', 'error');
     } else {
         window.open('/Model/AddFromMake?makeId=' + id + "&masterBrandId=" + masterBrandId);
     }
 };
 Make.prototype.EditModel = function (id) {
     //window.open( '/Model/Edit?Id=' + id);
     window.open('/Model/GetByTree?Id=' + id);
 };
 Make.prototype.Remove = function (id, modelsCount) {
     var para = { "id": id };
     $.messager.confirm('提示', '确定要删除吗？', function (r) {
         if (r) {
             $.post("/Make/AjaxSetRemovedStatus", para, function (data) {
                 if (data.IsSuccess) {
                     $.messager.alert('提示', '删除成功!', 'info', function () {
                         $("#t_make").datagrid('reload');
                     });
                 } else {
                     $.messager.alert('提示', '无法删除,旗下有车系存在', 'error');
                 }
             }, "json");
         }
     });
 };
 Make.prototype.ChangeStatus = function (o) {
     var me = this;
     var result = o.value;
     var id = o.attributes["name"].value;
     var para = { "id": id };
     var enableUrl = result == "true" ? "/Make/SetEnableStatus" : "/Make/SetDisabledStatus";
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
 Make.prototype.GetMakeList = function () {
     var me = this;
     $("#" + me.RenderId).datagrid("load");
 };
/**批量移出状态*/
 Make.prototype.BitchRemove = function (makeIds) {
     if (getChecked() > 0) {
         $.messager.confirm('提示', '确定要删除吗？', function (r) {
             if (r) {
                 var selected = $("#t_make").datagrid("getSelections");
                 var idString = "";
                 $.each(selected, function (index, item) {
                     idString += item.Id + "_";
                 });

                 var par = { "ids": idString.substring(0, idString.length - 1) };
                 $.post("/Make/AjaxAllDelete", par, function (result) {
                     if (result.result == true) {
                         $.messager.alert('提示', '全部删除成功!', 'info');
                         $('#t_make').datagrid('reload');
                     } else {
                         $.messager.alert('提示', "编号" + result.resultMsg + "未删除成功,检查旗下车系是否已删除", 'info', function () {
                             $('#t_make').datagrid('reload');
                         });
                     }
                 });
             }
         });
     } else {
         $.messager.alert('提示', '请选择要删除的品牌!', 'info');
     }
 };
 Make.prototype.RenderDate = function (renderId, title, pageNumber, columnsConfig, pagination) {
     var hasRowNumbers = $("#PageType").val() == "List";
     var content = $("#SearchCondition").val();
     var url = "/Make/GetMakeDataSource/?content=" + content;
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
                var panel = $('#t_make').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function (e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_make').datagrid('selectRow', index);
                    } else {
                        $('#t_make').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function () {
                bindRowsEvent();
            }, 10);

            $('select[_id=1]').change(function () {
                var me = this;
                var suggestInfo = $(me).val() == "false" ? "品牌下的车系、车型都将被停用。确定要执行此操作吗？" : "确定要执行此操作吗？";
                $.messager.confirm('提示', suggestInfo, function (res) {
                    if (res) {
                        make.ChangeStatus(me);
                    } else {
                        $(me).val($(me).val() == "false" ? "true" : "false");
                    }
                });
            });

            $(".sortMvpModel").sortable(
                {
                    update: function(event, ui) {
                        //var makeId = ui.item.find("#makeIdHidden").val();
                        //var modelId = ui.item.find("#modelIdHidden").val();
                        //var orderId = ui.item.index() + 1;
                        //$.ajax({
                        //    type: "POST",
                        //    url: "/Make/SortModel",
                        //    data: { "makeId": makeId, "modelId": modelId, "orderId": orderId },
                        //    error: function() {
                        //        $("#t_make").datagrid('reload');
                        //    }
                        //});
                        var data="";
                        var divDrags = ui.item.parent().children();
                        $(divDrags).each(function(index) {
                            var modelId = $(this).find("#modelIdHidden").val();
                            var para = modelId + "=" + index + ",";
                            data += para;
                        });
                        $.ajax({
                            type: "POST",
                            url: "/Make/SortModel",
                            data: { "data": data },
                            error: function() {
                                $("#t_make").datagrid('reload');
                            }
                        });
                    }
                }
            );
            if ($("#hidDragSort").val() == "-1") {
                $(".sortMvpModel").sortable("disable");
                $('a[_id=2]').each(function (index, domEle) {
                    $(domEle).bind("click", function () {
                        var id = $(domEle).attr("_value");
                        editModel(id);
                    });
                });
            } else {
                $(".sortMvpModel").sortable("enable");
                $('a[_id=2]').each(function (index, domEle) {
                    $(domEle).unbind("click");
                });
            }
        }
    });
};


