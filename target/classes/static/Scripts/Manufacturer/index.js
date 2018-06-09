var manufacturer = new Manufacturer("t_manufacturer");
$(document).ready(function () {
      
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
        { field: 'Name', title: '厂商名称', width: fixWidth(0.1) },
        {
            field: 'MakeList',
            title: '旗下品牌',
            width: fixWidth(0.3),
            formatter: function(value, row, index) {
                var a = new Array();
                //var s = '<input type="button" class="an_small s_l m_t" onclick=addMake(' + row.Id + ',' + row.IsEnabled + ') value="增加" />';
                //a.push(s);
                a.push("<ul class=ul_pp>");
                for (var i = 0; i < row.MakeList.length; i++) {
                    if (row.MakeList[i].CountryName != null) {
                        var d = '<li><img width="16" height="11" title="' + row.MakeList[i].CountryName + '" alt="国家图片" ' + (row.MakeList[i].NationalFlag == null ? "" : ("src=\"" + row.MakeList[i].NationalFlag + "\"")) + ' />';
                        a.push(d);
                    }
                    var k = '<a href=javascript:void(0) onclick=editMake(' + row.MakeList[i].MakeId + ')>' + row.MakeList[i].Name + '</a></li>';
                    if (row.MakeList[i].Name.length > 5) {
                        k = '<a href=javascript:void(0) onclick=editMake(' + row.MakeList[i].MakeId + ') title=' + row.MakeList[i].Name + ' >' + row.MakeList[i].Name.substring(0, 5) + '</a></li>';
                    }
                    a.push(k);
                }
                a.push("</ul>");
                a.push("<br/ class=clear>");
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
                htmlArray.push('<input type="button" class="an_big s_l m_r" onclick=addMake(' + row.Id + ',' + row.IsEnabled + ') value="添加品牌" />');
                htmlArray.push('<input type="button"  class="an_small s_l m_r" onclick=editManufacture(' + row.Id + ') value="编辑" />');
                htmlArray.push('<input type="button"  class="an_small s_l m_r" onclick=removeManufacturer(' + row.Id + ',' + row.MakeList.length + ') value="删除"/>');
                htmlArray.push('<input type="button"  class="an_small s_l m_r" onclick=preview(' + row.Id + ') value="预览"/>');
                if (row.IsEnabled) {
                    htmlArray.push('<select class="sec" id="manufactureStatus" _id="1" name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select>');
                } else {
                    htmlArray.push('<select class="sec" id="manufactureStatus" _id="1" name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select>');
                }
                return htmlArray.join("");
            }
        }
    ]];
    /**添加*/
    $("#btn_add").bind("click", function (res) {
        manufacturer.Add();
    });
    /**加载表单*/
    manufacturer.RenderDate("t_manufacturer", "", 1, columnsConfig);
});




function addMake(id, isEnabled) {
    manufacturer.AddMake(id, isEnabled);
}

function editMake(id) {
    manufacturer.EditMake(id);
}

function editManufacture(id) {
    manufacturer.Edit(id);
}

function removeManufacturer(id, makesCount) {
    manufacturer.Remove(id, makesCount);
}

function preview(id) {
    manufacturer.Preview(id);
}

/*common函数*/

function fixWidth(percent) {
    return $("#right").width() * percent;
}
//计算选中数量
function getChecked() {
    var selected = $("#t_manufacturer").datagrid("getSelections");
    return selected.length;
}
 