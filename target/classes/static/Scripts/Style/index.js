var queryParams = { "styleId": "", "styleName": "", "spell": "", "masterBrandId": "", "modelId": "", "year": "", "saleStatus": "", "productionStatus": "" };

$(function () {

    var columnsConfig = [
        [
            //{ field: 'ck', checkbox: true },
            { field: 'Id', title: 'ID', align: 'center', width: fixWidth(0.08) },
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
                title: '[ 品牌-车系 ] 车型名称',
                width: fixWidth(0.2),
                formatter: function (value, row, index) {
                    var str = new Array();
                    str.push('[' + row.MakeName + '-' + row.ModelName + ']<br/>');
                    str.push(row.Name);
                    return str.join("");
                }
            },
            { field: 'StyleBodyTypeName', align: 'center', title: '车身型式', width: fixWidth(0.08) },
            { field: 'FormatNowMsrp', align: 'center', title: '厂商指导价', width: fixWidth(0.1) },
            { field: 'FormatCreateTime', align: 'center', title: '创建时间', width: fixWidth(0.15) },
            {
                field: 'action',
                title: '操作',
                align: 'left',
                width: fixWidth(0.35),
                formatter: function (value, row, index) {
                    var innerHtml = [];
                    innerHtml.push('<span style="margin-left:6px;color:black;">车型：</span><a href="javascript:void(0)" onclick=Edit(' + row.Id + ')>概况</a> ');
                    innerHtml.push('<a href="javascript:void(0)" onclick=EditPropertyValue(' + row.Id + ')>参配</a> ');
                    //innerHtml.push('<a  href="javascript:void(null)" onclick=copyStyle(' + row.Id + ')>复制</a></span>');
                    var enable = '<select class="m_l juzhong" id="styleStatus" _id="1" modelId=' + row.ModelId + ' name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select><br class="clear"/>';
                    if (row.IsEnabled) {
                        enable = '<select class="m_l juzhong" id="styleStatus" _id="1" modelId=' + row.ModelId + ' name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select><br class="clear"/>';
                    }
                    innerHtml.push(enable);
                    innerHtml.push('<span style="margin-left:6px;color:black;">图片：</span>');
                    innerHtml.push('<a href="javascript:void(0)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + row.ModelId + '&styleId=' + row.Id + '&open=1")>新建</a> ');
                    innerHtml.push('<a href="javascript:void(0)" onclick=window.open("http://car.op.bitauto.com/PhotoManage/Album/List?modelId=' + row.ModelId + '&styleId=' + row.Id + '") id="tupian_' + row.Id + '">管理</a>');
                    innerHtml.push('<br/><span style="margin-left:6px;display: block;color:black;" id="shipin_' + row.Id + '">视频：</span>');
                    
                    return innerHtml.join("");
                }
            }
        ]
    ];

    RenderDate(columnsConfig);

    /*搜索框得到焦点绑定事件*/
    $("#txtSearch").on("focus", function () {
        $(this).css("color", "#1a161a");
        var searchContent = $("#txtSearch").val();
        if (searchContent == "车系名称，车型名称、ID") {
            $("#txtSearch").val("");
        }
    });
    //搜索框失去焦点绑定事件
    $("#txtSearch").on("blur", function () {
        var searchContent = $(this).val();
        if ($.trim(searchContent) == "") {
            $(this).css("color", "#CCCCCC");
            $("#txtSearch").val("车系名称，车型名称、ID");
        }
    });
    /**主品牌下拉列表change事件绑定*/
    $("#ddlMasterBrand").change(function () {
        var ddlMakeAndModel = $("#ddlMakeAndModel");
        $.ajax(
            {
                url: "/Style/GetMakeModelDdl?mabId=" + $("#ddlMasterBrand").val(),
                type: "GET",
                beforeSend: function () {
                    ddlMakeAndModel.empty();
                    ddlMakeAndModel.append("<option value='-1'>正在加载..</option>");
                },
                success: function (data) {
                    ddlMakeAndModel.empty();
                    ddlMakeAndModel.append("<option value='-1'>请选择品牌和车系</option>");
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
                    ddlMakeAndModel.append(htmlString);
                    queryParams.masterBrandId = $("#ddlMasterBrand").val();

                    queryParams.modelId = "";
                    $("#ddlYear").empty();
                    queryParams.year = "";
                    $("#ddlYear").append("<option value='-1'>请选择年款</option>");

                    $("#ddlStyle").empty();
                    queryParams.styleId = "";
                    queryParams.styleName = "";
                    $("#ddlStyle").append("<option value='-1'>请选择车型</option>");
                    $("#t_style").datagrid("load", queryParams);
                }
            }
        );
    });

    $("#btnBitchEdit").on("click", function () {
        var selected = $("#t_style").datagrid("getSelections");
        if (selected.length == 0) {
            $.messager.alert("提示", "请选择要修改参配的车型！", "error");
            return false;
        }
        var ids = new Array();
        $.each(selected, function (index, item) {
            ids.push(item.Id);
        });
        var url = "/StyleBatchEdit/batchedit?ids=" + ids.join("-");
        window.open(url);
    });

    $("#btn_addManu").on("click", function () {
        window.open("/Manufacturer/Add");
    });
    $("#btn_addMab").on("click", function () {
        window.open("/MasterBrand/Add");
    });
    $("#btn_addMake").on("click", function () {
        window.open("/Make/Add");
    });
    $("#btn_addModel").on("click", function () {
        window.open("/Model/Add");
    });
    $("#btn_addStyle").on("click", function () {
        window.open("/Style/Add");
    });

    $("li[id^='liMab']").on("click", function (e) {
        $(this).children("div").toggle();
    });
    $("li[id^='liMake']").on("click", function (e) {
        $(this).children("ul").toggle();
        e.stopPropagation();
    });
    
    
});

function RenderDate(columnsConfig) {

    $("#t_style").datagrid({
        rownumbers: true,
        pageSize: 20,
        title: "车型列表",
        pagination: true,
        scrollbarSize: 0,
        nowrap: false,
        url: "/Style/GetStyleDataSource/?content=" + $("#SearchCondition").val(),
        method: 'POST',
        columns: columnsConfig,
        fitColumns: true,
        onLoadSuccess: function() {

            function bindRowsEvent() {
                var panel = $('#t_style').datagrid('getPanel');
                var rows = panel.find('tr[datagrid-row-index]');
                rows.unbind('click').bind('click', function(e) {
                    return false;
                });
                rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function(e) {
                    var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                    if ($(this).prop('checked')) {
                        $('#t_style').datagrid('selectRow', index);
                    } else {
                        $('#t_style').datagrid('unselectRow', index);
                    }
                    e.stopPropagation();
                });
            }

            setTimeout(function() {
                bindRowsEvent();
            }, 10);
            //启用停用
            $('select[_id=1]').change(function() {
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
                        success: function(data) {
                            if (data.isDefault) {
                                $.messager.alert('提示', data.result, 'error', function() {
                                    $(me).val($(me).val() == "false" ? "true" : "false");
                                });
                            } else {
                                $.messager.confirm('提示', data.result, function(r) {
                                    if (r) {
                                        $.ajax({
                                            url: "/Style/SetEnableStatus",
                                            type: "POST",
                                            data: paraM,
                                            success: function(data) {
                                                if (data.result) {
                                                    $.messager.alert('提示', data.resultM, 'info', function () {
                                                        $("#t_style").datagrid("reload");
                                                    });
                                                } else {
                                                    $.messager.alert('提示', data.resultM, 'error', function() {
                                                        $("#t_style").datagrid("reload");
                                                    });
                                                }
                                            },
                                            error: function(data) {
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
                        success: function(data) {
                            if (data.result) {
                                $.messager.alert('提示', data.resultM, 'info', function() {
                                    $("#t_style").datagrid("reload");
                                });
                            } else {
                                $.messager.alert('提示', data.resultM, 'error', function() {
                                    $("#t_style").datagrid("reload");
                                });
                            }
                        },
                        error: function(data) {
                            $("#t_style").datagrid("reload");
                        }
                    });
                }
            });
            GetShiPinLink();
            GetTuPianLink();
        },
        rowStyler: function(index, row) {
            if (row.SaleStatus == "-1") {
                return 'background-color:#E6E6E6;';
            }
        }
    });
}


function Edit(id) {
    window.open('/Style/Edit?Id=' + id);
}

function EditPropertyValue(id) {
    window.open('/StylePropertyValue/EditPropertyValue?id=' + id);
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
                            $.messager.alert('提示', result.resultM, 'error');
                        }
                    });
                }
            });
        }
    }, "json");
}
//三合一图片接口
function GetTuPianLink() {
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
                    $("#tupian_" + styleId).html("管理(" + data.Data[i].AlbumCount + ")")
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
                    $("#shipin_" + styleId).html("视频：" + innerHtml.join(""));
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
    for (var i = 0; i < rows.length; i++) {
        ids[i] = rows[i][field];
    }
    var ids2 = ids.join(',');
    return ids2;
}
