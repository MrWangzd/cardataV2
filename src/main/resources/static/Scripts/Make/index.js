var make = new Make("t_make");
$(function () {
    var columnsConfig = [[
        { field: 'Id', title: 'ID', width: fixWidth(0.06) },
        {
            field: 'Logo',
            title: 'LOGO',
            width: fixWidth(0.08),
            formatter: function(value, row, index) {
                return '<img alt="Logo" src=' + (row.Logo == null ? '/Content/Images/default.jpg' : row.Logo) + ' width="55" height="55" class="img"/>';
            }
        },
        { field: 'Name', title: '品牌名称', width: fixWidth(0.15) },
        { field: 'SaleSatus', title: '销售状态', width: fixWidth(0.1) },
        {
            field: 'Models',
            title: '<span class="s_l" style="margin-top:6px; margin-left:8px;">旗下停用车系<br/></span>',
            width: fixWidth(0.2),
            formatter: function(value, row, index) {
                var a = new Array();
                //var s = '<p style="text-align:left"><input type="button" class="an_small m_b m_t m_r" onclick=addModel(' + row.Id + ',' + row.IsEnabled + ',' + row.MasterBrandId + ') value="增加" /></p>';
                //a.push(s);
                a.push('<div class="sortMvpModel">');
                for (var i = 0; i < row.ModelList.length; i++) {
                    var k = '<div class="drag"><input id="makeIdHidden" type="hidden" value="' + row.Id + '"/><input id="modelIdHidden" type="hidden" value="' + row.ModelList[i].Id + '"/><a _id=2 _value=' + row.ModelList[i].Id + ' href=javascript:void(0) >' + row.ModelList[i].Name + '</a></div>';
                    if (row.ModelList[i].Name.length > 5) {
                        k = '<div class="drag"><input id="makeIdHidden" type="hidden" value="' + row.Id + '"/><input id="modelIdHidden" type="hidden" value="' + row.ModelList[i].Id + '"/><a _id=2 _value=' + row.ModelList[i].Id + ' href=javascript:void(0) title=' + row.ModelList[i].Name + ' >' + row.ModelList[i].Name.substring(0, 5) + '</a></div>';
                    }
                    a.push(k);
                }
                a.push('</div>');
                var m = '';
                $.each(a, function(i, v) {
                    m += v;
                });
                return m;
            }
        },
        {
            field: 'action',
            title: '操作',
            width: fixWidth(0.4),
            formatter: function (value, row, index) {
                var htmlArray = [];
                htmlArray.push('<input type="button" class="an_big s_l m_r" onclick=addModel(' + row.Id + ',' + row.IsEnabled + ',' + row.MasterBrandId + ') value="添加车系" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=editMake(' + row.Id + ') value="编辑" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=removeMake(' + row.Id + ',' + row.ModelList.length + ') value="删除" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=preview(' + row.Id + ') value="预览" />');
                
                if (row.IsEnabled) {
                    htmlArray.push('<select class="sec" id="manufactureStatus" _id="1" name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select>');
                } else {
                    htmlArray.push('<select class="sec" id="manufactureStatus" _id="1" name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select>');
                }
                return htmlArray.join("");

                
            }
        }
    ]];
    
    $("#btn_add").bind("click", function (res) {
        make.Add();
    });
    var pagination = $("#PageType").val() == "List" ? true : false;
    make.RenderDate("t_make", "", 1, columnsConfig, pagination);
});

function addModel(id, isEnabled, masterBrandId) {
    make.AddModel(id, isEnabled, masterBrandId);
}

function editModel(id) {
    make.EditModel(id);
}

function editMake(id) {
    make.Edit(id);
}

function removeMake(id, modelsCount) {
    make.Remove(id, modelsCount);
}

function preview(id) {
    make.Preview(id);
}

function SortModel(o) {
        var a = o.innerHTML;
        switch (a) {
            case "车系排序":
                $("#sortModel").html("取消车系排序");
                $(".sortMvpModel").sortable("enable");

                $('a[_id=2]').each(function (index, domEle) {
                    $(domEle).unbind("click");
                });

                $("#hidDragSort").val("1");
                break;
            case "取消车系排序":
                $("#sortModel").html("车系排序");
                $("#hidDragSort").val("-1");
                $(".sortMvpModel").sortable("disable");

                $('a[_id=2]').each(function (index, domEle) {
                    $(domEle).bind("click", function () {
                        var id = $(domEle).attr("_value");
                        editModel(id);
                    });
                });
                break;
            default:
        }
    }

    //获得品牌和车系的 下来列表框数据
    function GetMakes() {
        var jQuerytargetId = $("#ddlMasterBrand").val();
        queryParams.masterBrandId = jQuerytargetId;
        make.GetMakeList();
    }

//计算选中数量
function getChecked() {
    var selected = $("#t_make").datagrid("getSelections");
    return selected.length;
}

function fixWidth(percent) {
    return $("#right").width() * percent;
}

/**
 * 为javascript对象扩展一些方法
*/
String.toInt = String.prototype.toInt = function () {
    try {
        var value = parseInt(this);

        return isNaN(value) ? 0 : value;
    } catch (e) {
        return 0;
    }
};


