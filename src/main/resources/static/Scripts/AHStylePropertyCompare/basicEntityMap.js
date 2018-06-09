
//选择竟品的车款后点击保存响应函数。
function saveBasicEntityMap(companyid) {
    var basicStyleId = 0;
    switch (companyid) {
        case 1:
            basicStyleId = $("#ddlPcStyle").val();
            break;
        case 2:
            basicStyleId = $("#ddlQqStyle").val();
            break;
        case 3:
            basicStyleId = $("#ddlShStyle").val();
            break;
        case 4:
            basicStyleId = $("#ddlXcStyle").val();
            break;
        case 5:
            basicStyleId = $("#ddlAhStyle").val();
            break;
        default:
            basicStyleId = $("#ddlPcStyle").val();
            break;
    }
    if (basicStyleId==-1||basicStyleId=="") {
        $.messager.alert("提示", "请选择车型", 'info', function () {
        });
        return;
    }
    var bitStyleId = $("#style_id").val();
    $.ajax(
        {
            url: "/AHEntityMap/SaveBasicStyleMap",
            data: { companyId: companyid, basicStyleId: basicStyleId, bitStyleId: bitStyleId },
            type: "POST",
            success: function (data) {
                location.reload();
            }
        }
    );
}

// 删除竟品车款
function deleteBasicEntityMap(companyid) {
    var bitStyleId = $("#style_id").val();
    $.ajax(
        {
            url: "/AHEntityMap/DeleteBasicStyleMap",
            data: { companyId: companyid, bitStyleId: bitStyleId },
            type: "POST",
            success: function (data) {
                location.reload();
            }
        }
    );
}



