$(function () {
    $("#hidIds").val(getQueryString("ids"));
    //退出按钮
    $("#btn_exit").live("click", function () {
        window.close();
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#table_top").show();
        } else {
            $("#table_top").hide();
        }
        if ($("#main").width() > screen.width) {
            var sLeft = $(this).scrollLeft();
            $("#table_top").css("left", -sLeft);
        }
    });
});

//给array 添加contains 方法
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

//提交表单前需处理的一些事情
function handleForm() {
    //给车身颜色和内饰颜色赋值
    var cheShenYanSeTds = $("#trCheShen").children("td:gt(0)");
    $(cheShenYanSeTds).each(function () {
        var cheShenArray = [];
        $(this).find("input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                cheShenArray.push($(this).val());
            }
        });
        //给隐藏表单域赋值
        $(this).children(":hidden").eq(0).val(cheShenArray.join(","));
    });
    var neiShiYanSeTds = $("#trNeiShi").children("td:gt(0)");
    $(neiShiYanSeTds).each(function () {
        var neiShiArray = [];
        $(this).find("input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                neiShiArray.push($(this).val());
            }
        });
        //给隐藏表单域赋值
        $(this).children(":hidden").eq(0).val(neiShiArray.join(","));
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function RanLiaoChange(oldValue,source) {
    var newValue = $(source).val();
    if (oldValue != newValue) {
        $(source).attr("value-changed", "true");
    } else {
        $(source).attr("value-changed", "false");
    }
}

function RanLiaoNotify() {
    var biTianResult = biTianData(); //true是通过验证

    var sel578Tags = $("#tr578").find("select[value-changed=true]");
    var styleIdArray = [];
    if ($(sel578Tags).length > 0) {
        $(sel578Tags).each(function(index) {
            var styleId = $(this).attr("name").split("_")[1];
            styleIdArray.push(styleId);
        });
    }
    if (biTianResult) {
        if (styleIdArray.length > 0) {
            $.messager.defaults = { ok: "仍然保存", cancel: "取消" };
            $.messager.confirm('提示', styleIdArray.join(",") + "燃料类型一旦更改，参配表可能会发生变化 数据不可恢复！", function(r) {
                if (r) {
                    $("form").submit();
                }
            });
            return false;
        } else {
            return true;
        }

    } else {
        return false;
    }
}


//验证是否有未填项
function biTianData() {
    $('#win_data').html("");
    var styleIdsArray = $("#hidIds").val().split('-');
    for (var i = 0; i < styleIdsArray.length; i++) {
        //车型名称验证
        var styleNameTag = $("#txt_name_" + styleIdsArray[i]);
        var styleNameValue = styleNameTag.val();
        if (!styleNameValue) {
            $('#win_data').append("车型" + styleIdsArray[i] + "名称不许为空<br>");
        }
        //年款验证
        var yearTag = $("#txt_year_" + styleIdsArray[i]);
        var yearValue = yearTag.val();
        if (!yearValue) {
            $('#win_data').append("车型" + styleIdsArray[i] + "年款不许为空<br>");
        }
        //指导价验证
        var nowMsrp = $("#txt_nowMsrp_" + styleIdsArray[i]).val();
        if (nowMsrp) {
            var patt = /^\d+(\.\d+)?$/;
            var result = patt.test(nowMsrp);
            if (!result) {
                $('#win_data').append("车款" + styleIdsArray[i] + "指导价输入有误<br>");
            }
        }
        //车型标签验证
        var styleTag = $("input:radio[name=txt_styleTag_" + styleIdsArray[i] + "]:checked");
        var styleTagValue = styleTag.val();
        if (!styleTagValue) {
            $('#win_data').append("车型" + styleIdsArray[i] + "车型标签不许为空<br>");
        }
        //销售状态是在产在销的时候上市时间和价格是必填项
        if ($("#txt_SaleStatus_" + styleIdsArray[i] + "").val() == "1") {
            if (!$("#txt_time_" + styleIdsArray[i] + "").val()) {
                $('#win_data').append("车款" + styleIdsArray[i] + "销售状态为在产在销，上市时间是必填项<br>");
            }
            if (!$("#txt_nowMsrp_" + styleIdsArray[i] + "").val()) {
                $('#win_data').append("车款" + styleIdsArray[i] + "销售状态为在产在销，厂商指导价是必填项<br>");
            }
        }
    }
    
    if ($('#win_data').children().length > 0) {
        $("#frontPropertyDialog").panel("move", { top: $(document).scrollTop() + ($(window).height() - 300) * 0.5 });
        $("#frontPropertyDialog").panel("move", { left: ($(window).width() - 500) * 0.5 });
        $('#frontPropertyDialog .dialog-content').show();
        $('#frontPropertyDialog').window('open');
        return false;
    }
    return true;
}

var s_l = '<span class="yidong s_l s_no"><b><a href="javascript:void(null)"><<</a></b></span>';
var s_r = '<span class="yidong s_r s_no"><b><a href="javascript:void(null)">>></a></b></span>';

$("span.s_l").live("click", function () {
    var me = $(this);
    var td = $(this).closest("td");
    var table = $(".table_dbpx");
    var styleCount = $("#hidStyleCount").val();
    if (styleCount < 0) {
        styleCount = 5;
    }
    var index = td.index();
    table.each(function () {
        var prevTd;
        if (index == 2) {
            prevTd = $(this).find("td:eq(1)"); //td.prev();
            prevTd.find(".p_an").prepend(me.clone(true));
            $(this).find("td:eq(2) .p_an span:first").remove();
        }
        if (index == styleCount) {
            $(this).find("td").eq(index).find(".p_an").append(s_r);
            prevTd = $(this).find("td").eq(index - 1);
            prevTd.find(".s_r").remove();
        }
        switchCol(index, index - 1, $(this));
    });
});

$("span.s_r").live("click", function () {
    var td = $(this).closest("td");
    var table = $(".table_dbpx");//2个table
    var index = td.index();
    var styleCount = $("#hidStyleCount").val();
    if (styleCount < 0) {
        styleCount = 5;
    }
    table.each(function () {
        if (index == 1) {
            $(this).find("td:eq(1) .p_an").prepend(s_l);
            $(this).find("td:eq(2) .p_an span:first").remove();
        }
        if (index == styleCount - 1) {
            $(this).find("td:eq(" + (index + 1) + ") .p_an").append(s_r);
            $(this).find("td:eq(" + index + ") .p_an span:last").remove();
        }
        switchCol(index, index + 1, $(this));
    });

});

function switchCol(source, target, objTable) {
    objTable.find("tr").each(function () {
        if (source > target) {
            $('td:eq(' + target + ')', this).before($('td:eq(' + source + ')', this));
        }
        else {
            $('td:eq(' + target + ')', this).after($('td:eq(' + source + ')', this));
        }
    });
}

function loadWdatePicker(source,modelId, styleId, year) {
    WdatePicker({
        dateFmt: "yyyy",
        readOnly: true,
        onpicked: function(dp) {
            yearChange(source,modelId, styleId, dp.cal.date.y, year);

        },
        onclearing: function(dp) {
            
        }
    });
}

function yearChange(source,modelId, styleId, currentYear, year) {
    $.ajax({
        url: "/Style/GetYearColorNew",
        type: "POST",
        data: { "modelId": modelId, "styleId": styleId, "modifyYear": currentYear, "year": year },
        success: function (data) {
            var cheShenColorTd = $("#tdCheShen_" + styleId);
            var neiShiColorTd = $("#neishiColor_" + styleId);
            if (data) {
                var neishiArray = [];
                var cheShenArray = [];
                for (var i = 0; i < data.totalColors.length; i++) {
                    var color = data.totalColors[i];
                    if (color.ColorType == 1) {
                        //当前年款下有选中的颜色
                        if (data.checkedColors && data.checkedColors.contains(color.ColorId)) {
                            neishiArray.push("<input id='" + styleId + "ckb" + color.ColorId + "' style='margin-left: 10px;' name='styleColor_" + styleId + "' type='checkbox' checked='checked'  value='" + color.ColorId + "'/>");
                        } else {
                            neishiArray.push("<input id='" + styleId + "ckb" + color.ColorId + "' style='margin-left: 10px;' name='styleColor_" + styleId + "' type='checkbox' value='" + color.ColorId + "'/>");
                        }
                        neishiArray.push("<label for='" + styleId + "ckb" + color.ColorId + "'>" + color.Name + "</label><br />");
                        //var neishiValueArray = color.Value.split(",");
                        //for (var j = 0; j < neishiValueArray.length; j++) {
                        //    neishiArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + neishiValueArray[j] + "'></div><br>");
                        //}
                    } else {
                        //当前年款下有选中的颜色
                        if (data.checkedColors && data.checkedColors.contains(color.ColorId)) {
                            cheShenArray.push("<input id='" + styleId + "ckb" + color.ColorId + "' style='margin-left: 10px;' name='styleColor_" + styleId + "' type='checkbox' checked='checked' value='" + color.ColorId + "'/>");
                        } else {
                            cheShenArray.push("<input id='" + styleId + "ckb" + color.ColorId + "' style='margin-left: 10px;' name='styleColor_" + styleId + "' type='checkbox'  value='" + color.ColorId + "'/>");
                        }
                        cheShenArray.push("<label for='" + styleId + "ckb" + color.ColorId + "'>" + color.Name + "</label><br />");
                        //cheShenArray.push("<div style='display: inline-block; vertical-align:middle; margin-left:2px; margin-right:10px; *display: inline!important; zoom: 1; width: 13px;height: 13px; background-color:" + color.Value + "'></div><br>");
                    }
                }

                $(cheShenColorTd).html(cheShenArray.join(""));
                $(neiShiColorTd).html(neishiArray.join(""));
            } else {
                $(cheShenColorTd).html("");
                $(neiShiColorTd).html("");
            }
            //选配包
            var xuanPeiBaoTd = $("#xpb_" + styleId);
            $.ajax({
                url: "/Style/GetModelPackageNew",
                type: "POST",
                data: { "modelId": modelId, "styleId": styleId, "modifyYear": currentYear, "year": year },
                success: function (dataPackage) {
                    if (dataPackage) {
                        var modelPackageArray = [];
                        for (var pIndex = 0; pIndex < dataPackage.totalPackages.length; pIndex++) {
                            var modelPackage = dataPackage.totalPackages[pIndex];
                            //当前年款下有选中的颜色
                            if (dataPackage.checkedPackages && dataPackage.checkedPackages.contains(modelPackage.Id)) {
                                modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"package_"+ styleId +"\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  checked='checked'/>");
                            } else {
                                modelPackageArray.push("<input id='ckbXuanPeiBao" + modelPackage.Id + "'  style=\"margin-right: 3px;vertical-align:middle;\" name=\"package_" + styleId + "\" type=\"checkbox\" value=\"" + modelPackage.Id + "\"  />");
                            }
                            
                            modelPackageArray.push("<label for='ckbXuanPeiBao" + modelPackage.Id + "'>" + modelPackage.Name + "</label><br />");
                        }
                        $(xuanPeiBaoTd).html(modelPackageArray.join(""));
                    } else {
                        $(xuanPeiBaoTd).html("");
                    }
                }
            });

        }
    });
    //如果修改了年款后 所有车型年款相同 显示横向引用按钮
    var distinctYearArray = [];
    var styleIdsArray = $("#hidIds").val().split('-');
    for (var i = 0; i < styleIdsArray.length; i++) {
        var styleYearTag = $("#txt_year_" + styleIdsArray[i]);
        var styleYearValue = styleYearTag.val();
        if (!distinctYearArray.contains(styleYearValue)) {
            distinctYearArray.push(styleYearValue);
        }
    }
    if (distinctYearArray.length == 1) {
        $("#cheShenColorCopy").show();
        $("#neiShiColorCopy").show();
        $("#xuanPeiBaoCopy").show();
    } else {
        $("#cheShenColorCopy").hide();
        $("#neiShiColorCopy").hide();
        $("#xuanPeiBaoCopy").hide();
    }
}

function HorizontalApplicationInner(source) {
    if ($(source).length == 0) {
        return;
    }
    var currentTr = $(source).closest("tr");
    //取第一列的html标签类型
    var firstColumnTag = currentTr.children("td").eq(1).children().eq(0);
    var firstColumnValue;
    var radioValue;
    var checkBoxValue = [];
    if (firstColumnTag[0].tagName == "INPUT") {
        if (firstColumnTag[0].type == "text") {
            firstColumnValue = firstColumnTag.val();
        }
        else if (firstColumnTag[0].type == "radio") {
            currentTr.children("td").eq(1).find("input[type=radio]").each(function () {
                if ($(this).prop("checked")) {
                    radioValue = $(this).val();
                }
            });
        }
        else if (firstColumnTag[0].type == "checkbox") {
            currentTr.children("td").eq(1).find("input[type=checkbox]").each(function () {
                if ($(this).prop("checked")) {
                    checkBoxValue.push($(this).val());
                }
            });
        }
    }
    else if (firstColumnTag[0].tagName == "SELECT") {

        firstColumnValue = firstColumnTag.val();
    }


    //给其他列的同行标签赋值
    currentTr.children("td:gt(1)").each(function (index) {
        var targetTag = $(this).children().eq(0);
        if (targetTag.length > 0) {
            if (firstColumnTag[0].tagName == "INPUT") {
                if (firstColumnTag[0].type == "text") {
                    $(this).children().eq(0).val(firstColumnValue);
                }
                else if (firstColumnTag[0].type == "radio") {
                    $(this).find("input[type=radio]").each(function () {
                        if ($(this).val() == radioValue) {
                            $(this).prop("checked", true);
                        } else if (typeof(radioValue)==="undefined") {
                            $(this).prop("checked", false);
                        }
                    });
                }
                else if (firstColumnTag[0].type == "checkbox") {
                    $(this).find("input[type=checkbox]").each(function () {
                        if (checkBoxValue.contains($(this).val())) {
                            $(this).prop("checked", true);
                        } else {
                            $(this).prop("checked", false);
                        }
                    });
                }
            } else if (firstColumnTag[0].tagName == "SELECT") {
                $(this).find("option[value=" + firstColumnValue + "]").prop("selected", true);
            }

        }
    });
}


function YearHorizontalApplication(source) {    
    var currentTr = $(source).closest("tr");
    //取第一列的html标签类型
    var firstColumnTag = currentTr.children("td").eq(1).children().eq(0);
    var firstColumnValue;
    if (firstColumnTag[0].tagName == "INPUT") {
        if (firstColumnTag[0].type == "text") {
            firstColumnValue = firstColumnTag.val();
        }        
    }
    
    //给其他列的同行标签赋值
    currentTr.children("td:gt(1)").each(function (index) {
        var targetTag = $(this).children().eq(0);
        if (targetTag.length > 0) {
            if (firstColumnTag[0].tagName == "INPUT") {
                if (firstColumnTag[0].type == "text") {
                    var yearTag = $(this).children().eq(0);
                    $(yearTag).val(firstColumnValue);
                    var modelId = $(yearTag).next().val();
                    var orginYear = $(yearTag).next().next().val();
                    var styleId = $(yearTag).next().next().next().val();
                    yearChange(yearTag, modelId, styleId, firstColumnValue, orginYear);
                }                
            }
        }
    });
}
