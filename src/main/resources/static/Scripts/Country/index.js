$(document).ready(function () {
    //添加
    $("#btn_add").on("click", function () {
        window.location.href = "/Country/Add";
    });
    //编辑
    $("[name=btn_edit]").on("click", function () {
        var countryId = $(this).closest("tr").find("td:first").text();
        window.location.href = '/Country/Edit/' + countryId;
    });
    //删除
    $("[name=btn_delete]").on("click", function () {
        var me = this;
        $.messager.confirm("提示", "确定要删除该国家吗？", function (res) {
            if (res) {
                var countryId = $(me).closest("tr").find("td:first").text();
                var countryName = $(me).parent().prev().text();
                var url = "/Country/DeleteCountry";
                $.ajax({
                    url: url,
                    type: "POST",
                    data: { "id": countryId, "countryName": countryName },
                    success: function (data) {
                        if (data.result) {
                            $.messager.alert("提示", "操作成功", 'info', function () {
                                window.location.href = "/Country/Index";
                            });
                        } else {
                            $.messager.alert("提示", data.mes, 'error', function () {
                                return false;
                            });
                        }
                    }
                });
            }
        });
    });
});
