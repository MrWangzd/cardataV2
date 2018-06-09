var masterBrand = new MasterBrand("t_masterBrand");
$(document).ready(function () {
    var columnsConfig = [[
        { field: 'Id', title: 'ID', width: fixWidth(0.06),align:'center' },
        {
            field: 'Logo',
            title: 'LOGO',
            width: fixWidth(0.08),
            formatter: function (value, row, index) {
                return '<img alt="Logo" src=' + (row.Logo == null ? '/Content/Images/default.jpg' : row.Logo) + ' width="55" height="55" class="img"/>';
            }
        },
        {
            field: 'Name',
            title: '主品牌名称',
            width: fixWidth(0.2),
            align:'center',
            formatter: function(value, row, index) {
                var coun = '<img width="16" height="11" src=' + row.NationalFlag + ' title="' + row.CountryName + '"  class="img juzhong"/>';
                return coun + ' ' + row.Name;
            }
        },
        {
            field: 'action',
            title: '操作',
            width: fixWidth(0.3),
            formatter: function (value, row, index) {
                var htmlArray = [];
                htmlArray.push('<input type="button" class="an_big s_l m_r" onclick=addMake(' + row.Id + ','+ row.IsEnabled +') value="添加品牌" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=editMasterBrand(' + row.Id + ') value="编辑" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=removeMasterBrand(' + row.Id + ') value="删除" />');
                htmlArray.push('<input type="button" class="an_small s_l m_r" onclick=preview(' + row.Id + ') value="预览" />');
                if (row.IsEnabled) {
                    htmlArray.push('<select class="sec" id="masterBrandStatus" _id="1" name=' + row.Id + '><option value="true" selected="selected">启用</option><option value="false">停用</option></select>');
                } else {
                    htmlArray.push('<select class="sec" id="masterBrandStatus" _id="1" name=' + row.Id + '><option value="true">启用</option><option value="false" selected="selected">停用</option></select>');
                }
                return htmlArray.join("");
            }
        }
    ]];
    /**添加*/
    $("#btn_add").click(function () {
        masterBrand.Add();
    });
    var pagination = $("#PageType").val() == "List" ? true : false;
    masterBrand.RenderDate("t_masterBrand", "", 1, columnsConfig, pagination);
});
function addMake(id, isEnabled) {
    masterBrand.AddMake(id, isEnabled);
}

function editMake(id) {
    masterBrand.EditMake(id);
}

function editMasterBrand(id) {
    masterBrand.Edit(id);
}

function addMasterBrand() {
    masterBrand.Add();
}

function removeMasterBrand(id, makesCount) {
    masterBrand.Remove(id, makesCount);
}

function preview(id) {
    masterBrand.Preview(id);
}

function fixWidth(percent) {
    return $("#right").width() * percent;
}

//计算选中数量
function getChecked() {
    var selected = $("#t_masterBrand").datagrid("getSelections");
    return selected.length;
}

