/*
* seonameDataUrl:异步请求列表数据的Url
* editUrl:编辑后提交的Url
* searchText:检索框默认文字
* titleName:当前界面名称的title显示名称
* seoTitlename:当前界面SEO名的title显示名称
* syncDataType:同步数据的类型
*/
var SeoName = function (seonameDataUrl, editUrl, searchText, titleName, seoTitlename, syncDataType) {
    this.SeoNameDataUrl = seonameDataUrl;
    this.EditUrl = editUrl;
    this.SearchText = searchText;
    this.TitleName = titleName;
    this.SeoTitleName = seoTitlename;
    this.SyncDataType = syncDataType;
    this.queryParams = { "name": "" };

    //数据绑定格式
    this.columnsConfig = [
       [
           { field: 'ck', checkbox: true },
           { field: 'Id', title: 'ID', align: 'center', width: fixWidth(0.1) },
           { field: 'Name', align: 'center', title: this.TitleName, width: fixWidth(0.3) },
           {
               field: 'SeoName',
               title: this.SeoTitleName,
               align: 'center',
               width: fixWidth(0.3),
               formatter: function (value, row, index) {
                   //var innerHtml = '<input type="text" class="" disabled="true" value="' + (row.SeoName == null ? "" : row.SeoName) + '" id ="seoName' + row.Id + '" />';
                   //return innerHtml;
                   return '<div id="seoValue' + row.Id + '">' + (row.SeoName == null ? "" : row.SeoName) + '</div>';
               }
           },
           {
               field: 'action',
               title: '操作',
               align: 'center',
               width: fixWidth(0.3),
               formatter: function (value, row, index) {
                   var innerHtml = [];
                   innerHtml.push('<input type="button" id="editseo' + row.Id + '" class="an_small  m_r an_margin" value="编辑" seoId = "' + row.Id + '" />');
                   innerHtml.push('<input type="button" id="saveseo' + row.Id + '" class="an_small  m_r an_margin" value="保存" disabled="disabled" style="color:gray" seoId = "' + row.Id + '" />');
                   return innerHtml.join("");
               }
           }
       ]
    ];

    //加载数据的方法
    this.RenderDate = function (columnsConfig) {
        var posturl = this.EditUrl;
        $("#t_seoName").datagrid({
            rownumbers: true,
            pageSize: 20,
            title: "车型列表",
            pagination: true,
            scrollbarSize: 0,
            nowrap: false,
            url: this.SeoNameDataUrl,
            method: 'GET',
            columns: columnsConfig,
            fitColumns: true,
            onLoadSuccess: function () {
                function bindRowsEvent() {
                    var panel = $('#t_seoName').datagrid('getPanel');
                    var rows = panel.find('tr[datagrid-row-index]');
                    rows.unbind('click').bind('click', function (e) {
                        return false;
                    });
                    rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function (e) {
                        var index = $(this).parent().parent().parent().attr('datagrid-row-index');
                        if ($(this).prop('checked')) {
                            $('#t_seoName').datagrid('selectRow', index);
                        } else {
                            $('#t_seoName').datagrid('unselectRow', index);
                        }
                        e.stopPropagation();
                    });
                }
                // 绑定编辑和保存按钮的事件
                function bindEditEvent() {
                    $("input[value='编辑']").each(function (index, element) {
                        $(this).click(function () {
                            var thisTag = $(this);
                            var id = thisTag.attr("seoId");
                            var seoDivTag = $("#seoValue" + id);
                            var inputTag = $("#seoName" + id);
                            var saveseoTag = $("#saveseo" + id);
                            if (inputTag == undefined || inputTag.length == 0) {
                                var seoNameStr = seoDivTag.text();
                                seoDivTag.attr("oldValue", seoNameStr);
                                seoDivTag.html('<input type="text" id="seoName' + id + '" value="' + seoNameStr + '" />');
                                thisTag.val("取消");
                                saveseoTag.removeAttr("disabled");
                                saveseoTag.css("color", "#4351a9");
                            } else {
                                var seoNameStr = seoDivTag.attr("oldValue");
                                seoDivTag.html("");
                                seoDivTag.text(seoNameStr);
                                $(this).val("编辑");
                                saveseoTag.attr("disabled", "disabled");
                                saveseoTag.css("color", "gray");
                            }
                            return;

                            var inputTag = $("#seoName" + id);
                            var saveseoTag = $("#saveseo" + id);
                            if (inputTag.attr("disabled") == "disabled") {
                                inputTag.attr("olddata", inputTag.val());
                                inputTag.removeAttr("disabled");
                                $(this).val("取消");
                                saveseoTag.removeAttr("disabled");
                                saveseoTag.css("color", "#4351a9");
                            } else {
                                inputTag.text(inputTag.attr("olddata"));
                                inputTag.attr("disabled", "disabled");
                                $(this).val("编辑");
                                saveseoTag.attr("disabled", "disabled");
                                saveseoTag.css("color", "gray");
                            }
                        });
                    });
                    $("input[value='保存']").each(function (index, element) {
                        $(this).click(function () {
                            var id = $(this).attr("seoId");
                            var seoTag = $("#seoName" + id);
                            if (seoTag.attr("disabled") == "disabled") {
                                $.messager.alert("提示", "请先修改SEO名称", 'info');
                                return;
                            }
                            var name = seoTag.val().trim();
                            //if (name == "") {
                            //$.messager.alert("提示", "SEO名称不能为空", 'info');
                            //return;
                            //}
                            $.messager.confirm("提示", "确定要保存吗？", function (res) {
                                if (res) {
                                    $.ajax({
                                        type: "POST",
                                        url: posturl,
                                        data: { id: id, name: name },
                                        success: function (data) {
                                            if (data) {
                                                $.messager.alert("提示", "保存成功", 'info');
                                                $("#editseo" + id).val("编辑");
                                                var seoDivTag = $("#seoValue" + id);
                                                seoDivTag.html("");
                                                seoDivTag.text(name);
                                                var saveseoTag = $("#saveseo" + id);
                                                saveseoTag.attr("disabled", "disabled");
                                                saveseoTag.css("color", "gray");
                                            } else {
                                                $.messager.alert("提示", "保存失败", 'info');
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    });
                }

                setTimeout(function () {
                    bindRowsEvent();
                    bindEditEvent();
                }, 10);

            }
        });
    }

    this.GetCheckedDatas = function () {
        var selected = $("#t_seoName").datagrid("getSelections");
        var ids = new Array();
        for (var i = 0; i < selected.length; i++) {
            ids[i] = selected[i].Id;
        }
        var ids2 = ids.join(',');
        return ids2;
    }

    this.Init = function () {
        this.RenderDate(this.columnsConfig);
        /*搜索框得到焦点绑定事件*/
        var SearchName = this.SearchText;
        $("#txtName").on("focus", function () {
            $(this).css("color", "#1a161a");
            var styleName = $("#txtName").val();
            if (styleName == SearchName) {
                $("#txtName").val("");
            }
        });
        //搜索框失去焦点绑定事件
        $("#txtName").on("blur", function () {
            var styleName = $("#txtName").val();
            if ($.trim(styleName) == "") {
                $(this).css("color", "#CCCCCC");
                $("#txtName").val(SearchName);
            }
        });
        //绑定检索事件
        var queryParams = this.queryParams;
        $("#btnSearch").click(function () {
            queryParams.name = $("#txtName").val();
            $("#t_seoName").datagrid("load", queryParams);
        });
        //绑定同步按钮事件
        var GetCheckedDatas = this.GetCheckedDatas;
        $("#btn_SyncData").click(function () {
            var datas = GetCheckedDatas(); //要同步的数据
            if (datas.length <= 0) {
                alert("请选择要同步的数据");
                return;
            }
            $.messager.confirm("提示", "确定要同步吗？", function (res) {
                if (res) {
                    $.ajax({
                        type: "POST",
                        url: "/SyncDataReceiver/SyncData",
                        data: { datas: datas, datasType: syncDataType },
                        success: function () {
                            $.messager.alert("提示", "同步数据成功", 'info');
                        }
                    });
                }
            });
        });

        // 左侧菜单样式
        /*
        $("#left ul li[class='li_two_on']").attr("class", "li_two");
        var left = $("#left ul li[class='li_two']");
        left.each(function () { 
            var tagA = $(this).children("a");
            if (tagA.attr("href").indexOf(syncDataType + "/EditSeoName") > -1) {
                $(this).attr("class", "li_two_on");
            }
        })
        */
    }
}
