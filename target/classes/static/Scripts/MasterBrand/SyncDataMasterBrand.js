//获取选定的数据,返回string字符串
function GetCheckedDatas() {
    var selected = $("#t_masterBrand").datagrid("getSelections");
    var ids = new Array();
    for (var i = 0; i < selected.length; i++) {
        ids[i] = selected[i].Id;
    }
    var ids2 = ids.join(',');
    return ids2;
}
$(document).ready(function () {
    //点击  开始同步数据
    $("#btn_SyncData").click(function () {
        var datas = GetCheckedDatas(); //要同步的数据
        if (datas.length <= 0) {
            alert("请选择要同步的数据");
            return;
        }
        $.messager.confirm("提示", "确定要同步吗？", function (res) {
            if (res) {
                var datasType = "MasterBrand";
                $.ajax({
                    type: "POST",
                    url: "/SyncDataReceiver/SyncData",
                    data: { datas: datas, datasType: datasType },
                    success: function () {
                        $.messager.alert("提示", "同步数据成功", 'info');
                    }
                });
            }
        });

    });
});