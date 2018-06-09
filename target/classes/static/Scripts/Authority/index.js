$(function () {
    var queryParams = { "ControllerName": "", "authorityName": "" };
    function loadSelect(o) {
        $.messager.confirm("提示", "确定要执行该操作吗？", function (res) {
            if (res) {
                var result = o.value;
                var id = o.attributes["name"].value;
                var par = { "Id": id, "status": result };
                $.ajax({
                    url: "/Authority/SetStatus",
                    type: "POST",
                    data: par,
                    success: function (data) {
                        $.messager.alert('提示', '状态改变成功!', 'info');
                    },
                    error: function (data) {
                        $("#tbAuthority").datagrid("reload");
                    }
                });
            }
            $('#tbAuthority').datagrid('reload');
        });
    }

    var role = (function (module) {
        var self = module;
        module.init = function (options) {
            initEvent();
            loadList();
        }
        var initEvent = function () {
            //搜索框得到焦点绑定事件
            $("#txtAuthority").bind("focus", function () {
                var authorityName = $("#txtAuthority").val();
                if (authorityName == "权限名称") {
                    $("#txtAuthority").val("");
                }
            });
            //搜索框失去焦点绑定事件
            $("#txtAuthority").bind("blur", function () {
                var authorityName = $("#txtAuthority").val();
                if ($.trim(authorityName) == "") {
                    $("#txtAuthority").val("权限名称");
                }
            });
            $("#btnSearch").bind("click", function () {
                var authorityName = $("#txtAuthority").val();

                if (authorityName == "权限名称") {
                    queryParams.authorityName = "";
                } else {
                    queryParams.authorityName = $.trim(authorityName);
                }
                $("#tbAuthority").datagrid("load", queryParams);
            });
            /**主品牌下拉列表change事件绑定*/
            $("#ddlController").change(function () {
                queryParams.ControllerName = $(this).find("option:selected").text();
                $("#tbAuthority").datagrid("load", queryParams);
            });
        }
        var loadList = function () {
            $('#tbAuthority').datagrid({
                url: '/Authority/GetAuthorityList',
                rownumbers: true,
                queryParams: queryParams,
                pagination: true,
                scrollbarSize: 0,
                fitColumns: true,
                method: 'get',
                columns: [[
                        { field: 'ck', checkbox: true },
                        { field: 'Id', title: 'ID', width: fixWidth(0.1) },
                        { field: 'Name', title: '权限名称', width: fixWidth(0.20) },
                        { field: 'Controller', title: '控制器', width: fixWidth(0.20) },
                        { field: 'Action', title: '方法', width: fixWidth(0.20) },
                        {
                            field: 'action1', title: '操作', width: fixWidth(0.25),
                            formatter: function (value, row, index) {
                                var k;
                                var s = '<input type="button" name="Submit2" value="编辑" class="an_small s_l m_r an_margin" onclick="javascript:Edit(' + row.Id + ')"/>' +
                                      '<input type="button" name="Submit3" value="删除"  class="an_small s_l m_r an_margin" onclick="javascript:Delete(' + row.Id + ');"/>';
                                if (row.IsEnabled) {
                                    k = '<select class="an_margin_t6" id="AuthorityStatus" _id="1" name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select><br class="clear"/>';
                                } else {
                                    k = '<select class="an_margin_t6" id="AuthorityStatus" _id="1" name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select><br class="clear"/>';
                                }
                                return s + '&nbsp' + k;
                            }
                        }
                ]],
                onLoadSuccess: function () {
                    function bindRowsEvent() {
                        var panel = $('#tbAuthority').datagrid('getPanel');
                        var rows = panel.find('tr[datagrid-row-index]');
                        rows.unbind('click').bind('click', function (e) {
                            return false;
                        });
                        rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                            var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                            if ($(this).prop('checked')) {
                                $('#tbAuthority').datagrid('selectRow', index);
                            } else {
                                $('#tbAuthority').datagrid('unselectRow', index);
                            }
                            e.stopPropagation();
                        });
                    }

                    setTimeout(function () {
                        bindRowsEvent();
                    }, 10);

                    $('select[_id=1]').change(function () {
                        loadSelect(this);
                    });
                }
            });
        }
        return module;
    })(role || {});

    role.init();
})

function Edit(authorityId) {
    window.location.href = "/Authority/Edit?authorityId=" + authorityId;
}

function Delete(authorityId) {
    $.messager.confirm("提示", "确定要删除该权限吗？", function (res) {
        if (res) {
            $.ajax({
                url: "/Authority/Delete",
                type: "POST",
                data: { authorityId: authorityId },
                success: function (data) {
                    if (data) {
                        $.messager.alert("提示", "操作成功");
                        $('#tbAuthority').datagrid('reload');
                    } else {
                        $.messager.alert("提示", "操作失败");
                    }
                }
            });
        }
    });
};

/**批量移出状态*/
function Del() {
    var selected = $("#tbAuthority").datagrid("getSelections");
    var autIds = new Array();
    $.each(selected, function (index, item) {
        autIds.push(parseInt(item.Id));
    });
    if (autIds.length > 0) {
        $.messager.confirm("提示", "确定要删除该权限吗？", function (res) {
            if (res) {
                $.ajax({
                    url: "/Authority/BitchDelete",
                    type: "POST",
                    traditional: true,
                    data: { authorityIds: autIds },
                    success: function (data) {
                        if (data) {
                            $.messager.alert("提示", "操作成功");
                            $("#tbAuthority").datagrid('reload');
                        } else {
                            $.messager.alert("提示", "操作失败");
                            $("#tbAuthority").datagrid('reload');
                        }
                    }
                });
            }
        });

    }
    else {
        $.messager.alert("提示", "请选择要删除的权限");
    }
};