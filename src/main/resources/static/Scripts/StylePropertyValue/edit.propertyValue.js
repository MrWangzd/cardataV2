$(function () {

    XuanPeiPriceReadOnly();

    $("form").submit(handleForm);
    $("form").submit(biTianData);

    
});

function YeJingPingClear(source) {
    var pidRadios = $(source).closest("td").find("input[name^='Pid_']");
    var pidOptions = $(source).closest("td").find("input[name^='Opt_']");
    $(pidRadios).each(function () {
        $(this).prop("checked", false);
    });
    $(pidOptions).each(function () {
        if ($(this).attr("type") == "radio") {
            $(this).prop("checked", false);
        }
        if ($(this).attr("type") == "text") {
            $(this).val("");
            $(this).prop("readonly", true);
        }
    });
}
//统一对选配价格控件展示状态的处理
//1.包含在这几种特殊情况中的选配价格处理逻辑是：价格前的控件被选中 则价格只读   未选中 则价格可写 如果写了价格 控件只读
//2.有、无、选配这种形式 选配价格前的选配被选中价格才可填写 未选中选配 价格不可填写
function XuanPeiPriceReadOnly() {
    $("[name^=Opt_]").each(function () {

            if ($(this).prev().prop("checked")) {
                $(this).prop("readonly", false);//可写
            } else {
                $(this).prop("readonly", true);//只读
            }

    });
}




//提交表单前需处理的一些事情

function handleForm() {    
    var json655 = { "4x2": 5, "6x2": 6, "8x2": 7, "10x2": 8, "12x2": 9, "14x2": 10, "16x2": 11, "4x4": 12, "6x4": 13, "8x4": 14, "10x4": 15, "12x4": 16, "14x4": 17, "16x4": 18 };
    //驱动方式处理
    if ($("#displayType").val() == "卡车") {
        var quDongFangShiTds = $("#tr655").children("td:gt(0)");
        $(quDongFangShiTds).each(function () {
            var selectTags = $(this).find("select");
            var sel1 = selectTags.eq(0).val();
            var sel2 = selectTags.eq(1).val();
            if (!sel1 && !sel2) {
                $(this).children(":hidden").eq(0).val("");
                return false;
            }
            var key = sel1 + "x" + sel2;            
            $(this).children(":hidden").eq(0).val(json655[key]);
        });
    }
    //保修政策
    var baoXiuZhengCeTds = $("#tr398").children("td:gt(0)");
    $(baoXiuZhengCeTds).each(function () {
        var baoXiuZhengCeValue = [];
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        if (!sel1 && !sel2) {
            $(this).children(":hidden").eq(0).val("");
            return false;
        }
        baoXiuZhengCeValue.push(sel1);
        baoXiuZhengCeValue.push(sel2);
        $(this).children(":hidden").eq(0).val(baoXiuZhengCeValue.join("或"));
    });
    //最大扭矩
    var zuiDaNiuJuTds = $("#tr432").children("td:gt(0)");
    $(zuiDaNiuJuTds).each(function () {
        var zuiDaNiuJuValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var sel1 = inputTexts.eq(1).val();
        var sel2 = inputTexts.eq(2).val();
        if (sel1) {
            zuiDaNiuJuValue.push(sel1);
        }
        if (sel2) {
            zuiDaNiuJuValue.push(sel2);
        }
        $(this).children(":hidden").eq(0).val(zuiDaNiuJuValue.join("-"));
    });
    //最大功率
    var zuiDaGongLvTds = $("#tr433").children("td:gt(0)");
    $(zuiDaGongLvTds).each(function () {
        var zuiDaGongLvValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var sel1 = inputTexts.eq(2).val();
        var sel2 = inputTexts.eq(3).val();
        if (sel1) {
            zuiDaGongLvValue.push(sel1);
        }
        if (sel2) {
            zuiDaGongLvValue.push(sel2);
        }
        $(this).children(":hidden").eq(0).val(zuiDaGongLvValue.join("-"));
    });
    //电池组质保
    var dianChiZuTds = $("#tr1006").children("td:gt(0)");
    $(dianChiZuTds).each(function () {
        var dianChiZuValue = [];
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
		if (!sel1 && !sel2) {
            $(this).children(":hidden").eq(0).val("");
            return false;
        }
        dianChiZuValue.push(sel1);
        dianChiZuValue.push(sel2);

        $(this).children(":hidden").eq(0).val(dianChiZuValue.join(" "));
    });
    //前轮胎规格
    var qianLunTaiGuiGeTds = $("#tr729").children("td:gt(0)");
    $(qianLunTaiGuiGeTds).each(function () {
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        var sel3 = childrenTd.eq(2).val();
        var sel4 = childrenTd.eq(3).val();
		if (!sel1 && !sel2 && !sel3 && !sel4) {
            $(this).children(":hidden").eq(0).val("");
            return false;
        }
        var strResult = sel1 + "/" + sel2 + " " + sel3 + sel4;
        $(this).children(":hidden").eq(0).val(strResult);
    });
    //后轮胎规格
    var houLunTaiGuiGeTds = $("#tr721").children("td:gt(0)");
    $(houLunTaiGuiGeTds).each(function () {
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        var sel3 = childrenTd.eq(2).val();
        var sel4 = childrenTd.eq(3).val();
		if (!sel1 && !sel2 && !sel3 && !sel4) {
            $(this).children(":hidden").eq(0).val("");
            return false;
        }
        var strResult = sel1 + "/" + sel2 + " " + sel3 + sel4;
        $(this).children(":hidden").eq(0).val(strResult);
    });
    //快充 慢充
    var chongDianShiJianTds = $("#tr878").children("td:gt(0)");
    $(chongDianShiJianTds).each(function () {
        var kuaiChongValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var input1 = inputTexts.eq(0).val();
        var input2 = inputTexts.eq(1).val();
        if (input1) {
            kuaiChongValue.push(input1);
        }
        if (input2) {
            kuaiChongValue.push(input2);
        }
        $(this).children(":hidden").eq(0).val(kuaiChongValue.join("-"));
        
        var manChongValue = [];
        var input3 = inputTexts.eq(2).val();
        var input4 = inputTexts.eq(3).val();
        if (input3) {
            manChongValue.push(input3);
        }
        if (input4) {
            manChongValue.push(input4);
        }
        $(this).children(":hidden").eq(1).val(manChongValue.join("-"));
    });
}
//点击有或者无 选配价格变为只读（控件摆放是有、无、选配）
function PriceNotEnable(source) {
    $(source).parent().find("input[type=text]").prop("readonly", true);
    $(source).parent().find("input[type=text]").eq(0).val("");
}
//点击radio的无
function RadioWu(source) {
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
}
//点击选配 选配价格变为可写（控件摆放是有、无、选配）
function PriceEnable(source) {
    $(source).parent().find("input[type=text]").prop("readonly", false);
}

function CheckBoxChange(source) {
    if ($(source).prop("checked")) {
        //$(source).parent().find("input[type=checkbox]").prop("disabled", true);
    } else {
        $(source).parent().find("input[type=checkbox]").prop("disabled", false);
    }
}

//点击radio 后面的选配价格变为只读 值清空 其他的选配价格变为可写
function PriceNotEnableOnly(source) {
    //其他的选配价格变为可写
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
    //当前的选配价格变为只读
    $(source).next().prop("readonly", true);
    $(source).next().val("");
}
//点击radio 后面的选配价格变为只读 值清空 下一个radio变为不选中
function DingSuBiaoPeiRadClick(source) {
    //当前的选配价格变为只读
    $(source).closest("p").find("input[type=text]").prop("readonly", true).val("");
    //选配变为不选中
    $(source).next().prop("checked", false);
}
function DingSuXuanPeiRadClick(source) {    
    //当前的选配价格变为可写
    $(source).closest("p").find("input[type=text]").prop("readonly", false);
    //标配变为不选中
    $(source).prev().prop("checked", false);
}
//点击checkbox 后面的选配价格变为只读 值清空 其他的选配价格如果前边的checkbox未选中 则变为可写
function PriceNotEnableOnlyChk(source) {
    $(source).closest("td").find("input[type=text]").each(function () {
        if ($(this).prev().prop("checked")) {
            $(this).prop("readonly", true);
            $(this).val("");
        } else {
            $(this).prop("readonly", false);
        }
    });
}
//点击radio无的时候 价格框变为可写
//demo: 1块屏 价格 2块屏 价格 无
function MultiPriceEnabled(source) {
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
}
//点击checkbox无
function XunHangMoShiWu(source) {
    if ($(source).prop("checked")) {
        $(source).parent().children().eq(0).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(0).prop("checked", false);//chk选中取消
        $(source).parent().children().eq(2).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(2).prop("checked", false);//chk选中取消
    } else {
        $(source).parent().children().eq(0).prop("disabled", false);//chk禁用取消
        $(source).parent().children().eq(2).prop("disabled", false);//chk禁用取消
    }
    $(source).parent().children().eq(1).prop("readonly", false);//text可写
    $(source).parent().children().eq(3).prop("readonly", false);//text可写
}
//点击checkbox无
function XunHangMoShiWuNew(source) {
    var otherChbs = $(source).closest("td").find("input[type=checkbox]");
    if ($(source).prop("checked")) {
        //减一 去掉最后一个无
        for (var i = 0; i < otherChbs.length-1; i++) {
            $(otherChbs[i]).prop("disabled", true).prop("checked", false);//chk禁用 chk选中取消            
        }
    } else {
        //减一 去掉最后一个无
        for (var m = 0; m < otherChbs.length - 1; m++) {
            $(otherChbs[m]).prop("disabled", false);//chk禁用取消
        }
    }    
}
//点击checkbox无
function chaSuSuoWu(source) {
    if ($(source).prop("checked")) {
        $(source).parent().children().eq(0).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(0).prop("checked", false);//chk选中取消
        $(source).parent().children().eq(1).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(1).prop("checked", false);//chk选中取消
        $(source).parent().children().eq(2).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(2).prop("checked", false);//chk选中取消
    } else {
        $(source).parent().children().eq(0).prop("disabled", false);//chk禁用取消
        $(source).parent().children().eq(1).prop("disabled", false);//chk禁用取消
        $(source).parent().children().eq(2).prop("disabled", false);//chk禁用取消
    }
}
//点击checkbox无
function DaoCheYingXiangWu(source) {
    if ($(source).prop("checked")) {
        $(source).parent().children().eq(0).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(0).prop("checked", false);//chk选中取消
        $(source).parent().children().eq(1).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(1).prop("checked", false);//chk选中取消
    } else {
        $(source).parent().children().eq(0).prop("disabled", false);//chk禁用取消
        $(source).parent().children().eq(1).prop("disabled", false);//chk禁用取消
    }
}
//点击checkbox无
function ZiDongDaDengWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
        inputs.eq(6).prop("disabled", true);//chk禁用
        inputs.eq(6).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
        inputs.eq(6).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
    inputs.eq(7).prop("readonly", false);//text可写
}
//点击checkbox无
function YuanChengYaoKongWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
}
//点击checkbox无
function DiErPaiZuoWeiTJFSWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
        inputs.eq(6).prop("disabled", true);//chk禁用
        inputs.eq(6).prop("checked", false);//chk选中取消
        inputs.eq(8).prop("disabled", true);//chk禁用
        inputs.eq(8).prop("checked", false);//chk选中取消
        inputs.eq(10).prop("disabled", true);//chk禁用
        inputs.eq(10).prop("checked", false);//chk选中取消
        inputs.eq(12).prop("disabled", true);//chk禁用
        inputs.eq(12).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
        inputs.eq(6).prop("disabled", false);//chk禁用取消
        inputs.eq(8).prop("disabled", false);//chk禁用取消
        inputs.eq(10).prop("disabled", false);//chk禁用取消
        inputs.eq(12).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
    inputs.eq(7).prop("readonly", false);//text可写
    inputs.eq(9).prop("readonly", false);//text可写
    inputs.eq(11).prop("readonly", false);//text可写
    inputs.eq(13).prop("readonly", false);//text可写
}



//方向盘调节HTML类似结构无选项操作
function DisabledWu(source){
    if ($(source).prop("checked")) {
        $(source).parent().siblings().find("input:checkbox").prop("checked", false);//chk选中取消
        $(source).parent().siblings().find("input:checkbox").prop("disabled", true);//chk禁用
    } else {
        $(source).parent().siblings().find("input:checkbox").prop("disabled", false);//chk禁用取消
    }
    $(source).closest("td").find("input:text").prop("readonly", false);//text可写
}

function paiLiangJiSuan(source) {
    var value423 = $(source).val() / 1000;
    var result = value423.toFixed(1);
    $(source).next().val(result);
}

function zuiDaGongLvJiSuan(source) {
    var value791 = $(source).val();
    if (!value791) {
        return;
    }
    value791 = value791 * 1.36;
    var result = Math.round(value791);
    $(source).parent().next().val(result);

}


//验证是否有未填项
function biTianData() {
    $('#win_data').html("");
    //正式发布保存参与验证    
    if ($("#ReleaseModule").val() == "1") {
        switch ($("#displayType").val()) {
            case "卡车":
                
                var kaCheArray = $("#kaCheStr").val().split(',');
                for (var kaCheIndex = 0; kaCheIndex < kaCheArray.length; kaCheIndex++) {
                    var pidTag = $("[name^=Pid_" + kaCheArray[kaCheIndex] + "]");
                    var spKaCheValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (kaCheArray[kaCheIndex] == 414 || kaCheArray[kaCheIndex] == 465 || kaCheArray[kaCheIndex] == 466
                        || kaCheArray[kaCheIndex] == 1000 || kaCheArray[kaCheIndex] == 663 || kaCheArray[kaCheIndex] == 650 || kaCheArray[kaCheIndex] == 581 || kaCheArray[kaCheIndex] == 591
                        || kaCheArray[kaCheIndex] == 890 || kaCheArray[kaCheIndex] == 662 || kaCheArray[kaCheIndex] == 589 || kaCheArray[kaCheIndex] == 1039 || kaCheArray[kaCheIndex] == 1042) {
                        spKaCheValue = "不参与验证的项";
                    }
                        //如果是保修政策和驱动形式 需要取隐藏表单域中的值
                    else if (kaCheArray[kaCheIndex] == 398 || kaCheArray[kaCheIndex] == 655) {
                        spKaCheValue = $("#hid" + kaCheArray[kaCheIndex] + "").val();
                    }
                    else {

                        var tagName = $(pidTag)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(pidTag)[0].type == "radio" || $(pidTag)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTag).length; i++) {
                                    if ($(pidTag).eq(i).prop("checked")) {
                                        spKaCheValue = $(pidTag).eq(i).val();
                                        break;
                                    }
                                }

                            }
                            else if ($(pidTag)[0].type == "text") {
                                spKaCheValue = $(pidTag).val();

                            }
                        }
                        else if (tagName == "SELECT") {
                            spKaCheValue = $(pidTag).val();
                        }
                    }
                    //最终
                    if (!spKaCheValue) {
                        var spKaCheName = $("[name^=Pid_" + kaCheArray[kaCheIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spKaCheName + "<br>");
                    }
                }
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("[name=Pid_791_4]").next().val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("[name=Pid_429_4]").next().val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("最大扭矩第一个文本框不许为空<br>");
                }
                break;
            case "客车":
                
                var keCheArray = $("#keCheStr").val().split(',');
                for (var keCheIndex = 0; keCheIndex < keCheArray.length; keCheIndex++) {
                    var pidTagKeChe = $("[name^=Pid_" + keCheArray[keCheIndex] + "]");
                    var spKeCheValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (keCheArray[keCheIndex] == 414 || keCheArray[keCheIndex] == 465 || keCheArray[keCheIndex] == 466 || keCheArray[keCheIndex] == 1000 || keCheArray[keCheIndex] == 663
                        || keCheArray[keCheIndex] == 650 || keCheArray[keCheIndex] == 581 || keCheArray[keCheIndex] == 591
                        || keCheArray[keCheIndex] == 890 || keCheArray[keCheIndex] == 662 || keCheArray[keCheIndex] == 589 || keCheArray[keCheIndex] == 1039 || keCheArray[keCheIndex] == 1042) {
                        spKeCheValue = "不参与验证的项";
                    }
                        //如果是保修政策需要取隐藏表单域中的值
                    else if (keCheArray[keCheIndex] == 398) {
                        spKeCheValue = $("#hid" + keCheArray[keCheIndex] + "").val();
                    }
                    else {
                        //如果是input的radio
                        var tagNameKeChe = $(pidTagKeChe)[0].tagName;
                        if (tagNameKeChe == "INPUT") {
                            if ($(pidTagKeChe)[0].type == "radio" || $(pidTagKeChe)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTagKeChe).length; i++) {
                                    if ($(pidTagKeChe).eq(i).prop("checked")) {
                                        spKeCheValue = $(pidTagKeChe).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(pidTagKeChe)[0].type == "text") {
                                spKeCheValue = $(pidTagKeChe).val();

                            }
                        } else if (tagNameKeChe == "SELECT") {
                            spKeCheValue = $(pidTagKeChe).val();
                        }
                    }
                    //最终
                    if (!spKeCheValue) {
                        var spKeCheName = $("[name^=Pid_" + keCheArray[keCheIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spKeCheName + "<br>");
                    }
                }
                break;
            case "插电混动":
                
                var chaDianArray = $("#chaDianHunDongStr").val().split(',');
                for (var chaDianIndex = 0; chaDianIndex < chaDianArray.length; chaDianIndex++) {
                    var pidTagChaDian = $("[name^=Pid_" + chaDianArray[chaDianIndex] + "]");
                    var spChaDianValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (chaDianArray[chaDianIndex] == 414 || chaDianArray[chaDianIndex] == 1008 || chaDianArray[chaDianIndex] == 1009
                        || chaDianArray[chaDianIndex] == 1002 || chaDianArray[chaDianIndex] == 1003 || chaDianArray[chaDianIndex] == 1004 || chaDianArray[chaDianIndex] == 1005 || chaDianArray[chaDianIndex] == 876
                        || chaDianArray[chaDianIndex] == 465 || chaDianArray[chaDianIndex] == 466 || chaDianArray[chaDianIndex] == 1000 || chaDianArray[chaDianIndex] == 663 || chaDianArray[chaDianIndex] == 870
                        || chaDianArray[chaDianIndex] == 650 || chaDianArray[chaDianIndex] == 581 || chaDianArray[chaDianIndex] == 591 || chaDianArray[chaDianIndex] == 872 || chaDianArray[chaDianIndex] == 1006
                        || chaDianArray[chaDianIndex] == 890 || chaDianArray[chaDianIndex] == 662 || chaDianArray[chaDianIndex] == 589 || chaDianArray[chaDianIndex] == 1039 || chaDianArray[chaDianIndex] == 1042) {
                        spChaDianValue = "不参与验证的项";
                    }
                        //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保需要取隐藏表单域中的值
                    else if (chaDianArray[chaDianIndex] == 398 || chaDianArray[chaDianIndex] == 729 || chaDianArray[chaDianIndex] == 721
                        || chaDianArray[chaDianIndex] == 1006 || chaDianArray[chaDianIndex] == 878 || chaDianArray[chaDianIndex] == 879) {
                        spChaDianValue = $("#hid" + chaDianArray[chaDianIndex] + "").val();
                    } else {
                        //如果是input的radio
                        var tagNameChaDian = $(pidTagChaDian)[0].tagName;
                        if (tagNameChaDian == "INPUT") {
                            if ($(pidTagChaDian)[0].type == "radio" || $(pidTagChaDian)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTagChaDian).length; i++) {
                                    if ($(pidTagChaDian).eq(i).prop("checked")) {
                                        spChaDianValue = $(pidTagChaDian).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(pidTagChaDian)[0].type == "text") {
                                spChaDianValue = $(pidTagChaDian).val();

                            }
                        } else if (tagNameChaDian == "SELECT") {
                            spChaDianValue = $(pidTagChaDian).val();
                        }
                    }
                    //最终
                    if (!spChaDianValue) {
                        var spChaDianName = $("[name^=Pid_" + chaDianArray[chaDianIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spChaDianName + "<br>");
                    }
                }
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("[name=Pid_791_4]").next().val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("[name=Pid_429_4]").next().val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("最大扭矩第一个文本框不许为空<br>");
                }
                break;
            case "纯电":
                
                var cunDianArray = $("#chunDianStr").val().split(',');
                for (var cunDianIndex = 0; cunDianIndex < cunDianArray.length; cunDianIndex++) {
                    var pidTagCunDian = $("[name^=Pid_" + cunDianArray[cunDianIndex] + "]");
                    var spCunDianValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (cunDianArray[cunDianIndex] == 414
                        || cunDianArray[cunDianIndex] == 1002 || cunDianArray[cunDianIndex] == 1003 || cunDianArray[cunDianIndex] == 1004 || cunDianArray[cunDianIndex] == 1005
                        || cunDianArray[cunDianIndex] == 465 || cunDianArray[cunDianIndex] == 466 || cunDianArray[cunDianIndex] == 1000 || cunDianArray[cunDianIndex] == 663 || cunDianArray[cunDianIndex] == 650
                        || cunDianArray[cunDianIndex] == 581 || cunDianArray[cunDianIndex] == 591 || cunDianArray[cunDianIndex] == 1006 || cunDianArray[cunDianIndex] == 876 || cunDianArray[cunDianIndex] == 870
                        || cunDianArray[cunDianIndex] == 890 || cunDianArray[cunDianIndex] == 662 || cunDianArray[cunDianIndex] == 589 || cunDianArray[cunDianIndex] == 872
                        || cunDianArray[cunDianIndex] == 1039 || cunDianArray[cunDianIndex] == 1042) {
                        spCunDianValue = "不参与验证的项";
                    }
                        //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保、快充、慢充需要取隐藏表单域中的值
                    else if (cunDianArray[cunDianIndex] == 398 || cunDianArray[cunDianIndex] == 729 || cunDianArray[cunDianIndex] == 721
                     || cunDianArray[cunDianIndex] == 878 || cunDianArray[cunDianIndex] == 879) {
                        spCunDianValue = $("#hid" + cunDianArray[cunDianIndex] + "").val();
                    }
                    else {
                        //如果是input的radio
                        var tagNameCunDian = $(pidTagCunDian)[0].tagName;
                        if (tagNameCunDian == "INPUT") {
                            if ($(pidTagCunDian)[0].type == "radio" || $(pidTagCunDian)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTagCunDian).length; i++) {
                                    if ($(pidTagCunDian).eq(i).prop("checked")) {
                                        spCunDianValue = $(pidTagCunDian).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(pidTagCunDian)[0].type == "text") {
                                spCunDianValue = $(pidTagCunDian).val();
                            }
                        } else if (tagNameCunDian == "SELECT") {
                            spCunDianValue = $(pidTagCunDian).val();
                        }
                    }
                    //最终
                    if (!spCunDianValue) {
                        var spCunDianName = $("[name^=Pid_" + cunDianArray[cunDianIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spCunDianName + "<br>");
                    }
                }
                break;
            case "汽油柴油天然气":
                
                var qiYouArray = $("#qiChaiYouStr").val().split(',');
                for (var qiChaiYouIndex = 0; qiChaiYouIndex < qiYouArray.length; qiChaiYouIndex++) {
                    var pidTagQiChaiYou = $("[name^=Pid_" + qiYouArray[qiChaiYouIndex] + "]");
                    var spQiChaiYouValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (qiYouArray[qiChaiYouIndex] == 414
                        || qiYouArray[qiChaiYouIndex] == 465 || qiYouArray[qiChaiYouIndex] == 466 || qiYouArray[qiChaiYouIndex] == 1000 || qiYouArray[qiChaiYouIndex] == 663
                        || qiYouArray[qiChaiYouIndex] == 650 || qiYouArray[qiChaiYouIndex] == 581 || qiYouArray[qiChaiYouIndex] == 591
                        || qiYouArray[qiChaiYouIndex] == 890 || qiYouArray[qiChaiYouIndex] == 662 || qiYouArray[qiChaiYouIndex] == 589 || qiYouArray[qiChaiYouIndex] == 1039 || qiYouArray[qiChaiYouIndex] == 1042) {
                        spQiChaiYouValue = "不参与验证的项";
                    }
                        //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                    else if (qiYouArray[qiChaiYouIndex] == 398 || qiYouArray[qiChaiYouIndex] == 729 || qiYouArray[qiChaiYouIndex] == 721) {
                        spQiChaiYouValue = $("#hid" + qiYouArray[qiChaiYouIndex] + "").val();
                    } else {
                        //如果是input的radio
                        var tagNameQiChaiYou = $(pidTagQiChaiYou)[0].tagName;
                        if (tagNameQiChaiYou == "INPUT") {
                            if ($(pidTagQiChaiYou)[0].type == "radio" || $(pidTagQiChaiYou)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTagQiChaiYou).length; i++) {
                                    if ($(pidTagQiChaiYou).eq(i).prop("checked")) {
                                        spQiChaiYouValue = $(pidTagQiChaiYou).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(pidTagQiChaiYou)[0].type == "text") {
                                spQiChaiYouValue = $(pidTagQiChaiYou).val();
                            }
                        } else if (tagNameQiChaiYou == "SELECT") {
                            spQiChaiYouValue = $(pidTagQiChaiYou).val();
                        }
                    }
                    //最终
                    if (!spQiChaiYouValue) {
                        var spQiChaiYouName = $("[name^=Pid_" + qiYouArray[qiChaiYouIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spQiChaiYouName + "<br>");
                    }
                }
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("[name=Pid_791_4]").next().val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("[name=Pid_429_4]").next().val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("最大扭矩第一个文本框不许为空<br>");
                }
                break;
            case "油电混动":
                var youDianArray = $("#youDianHunDongStr").val().split(',');
                for (var youDianIndex = 0; youDianIndex < youDianArray.length; youDianIndex++) {
                    var pidTagYouDian = $("[name^=Pid_" + youDianArray[youDianIndex] + "]");
                    var spYouDianValue = '';
                    //这些参配是非必填项 默认赋值即可(注：快充、慢充在油电混合类型中为非必填项)
                    if (youDianArray[youDianIndex] == 414 || youDianArray[youDianIndex] == 870 || youDianArray[youDianIndex] == 872 || youDianArray[youDianIndex] == 876
                        || youDianArray[youDianIndex] == 465 || youDianArray[youDianIndex] == 466 || youDianArray[youDianIndex] == 1000 || youDianArray[youDianIndex] == 663
                        || youDianArray[youDianIndex] == 650 || youDianArray[youDianIndex] == 581 || youDianArray[youDianIndex] == 591 || youDianArray[youDianIndex] == 1008 || youDianArray[youDianIndex] == 1009
                        || youDianArray[youDianIndex] == 890 || youDianArray[youDianIndex] == 662 || youDianArray[youDianIndex] == 589 || youDianArray[youDianIndex] == 1039 || youDianArray[youDianIndex] == 1042
                        || youDianArray[youDianIndex] == 878 || youDianArray[youDianIndex] == 879) {
                        spYouDianValue = "不参与验证的项";
                    }
                        //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                    else if (youDianArray[youDianIndex] == 398 || youDianArray[youDianIndex] == 729 || youDianArray[youDianIndex] == 721) {
                        spYouDianValue = $("#hid" + youDianArray[youDianIndex] + "").val();
                    }
                    else {
                        //如果是input的radio
                        var tagNameYouDian = $(pidTagYouDian)[0].tagName;
                        if (tagNameYouDian == "INPUT") {
                            if ($(pidTagYouDian)[0].type == "radio" || $(pidTagYouDian)[0].type == "checkbox") {

                                for (var i = 0; i < $(pidTagYouDian).length; i++) {
                                    if ($(pidTagYouDian).eq(i).prop("checked")) {
                                        spYouDianValue = $(pidTagYouDian).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(pidTagYouDian)[0].type == "text") {
                                spYouDianValue = $(pidTagYouDian).val();
                            }
                        } else if (tagNameYouDian == "SELECT") {
                            spYouDianValue = $(pidTagYouDian).val();
                        }
                    }

                    //最终
                    if (!spYouDianValue) {
                        var spYouDianName = $("[name^=Pid_" + youDianArray[youDianIndex] + "]").closest("tr").children().eq(0).text();
                        $('#win_data').append(spYouDianName + "<br>");
                    }
                }
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("[name=Pid_791_4]").next().val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("[name=Pid_429_4]").next().val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("最大扭矩第一个文本框不许为空<br>");
                }
                break;
        }
    }
    
    
    //验证输入框数据
	//1.长
    if ($("[name=Pid_588_4]").length > 0) {
        var value588 = $("[name=Pid_588_4]").val();
        if (value588) {
            if (!isNumber(value588)) {
                $('#win_data').append("长的值必须为整数<br>");
            }
        }

    }
    //2.宽
	if($("[name=Pid_593_4]").length>0)
	{
	    var value593 = $("[name=Pid_593_4]").val();
	    if (value593) {
	        if (!isNumber(value593)) {
	            $('#win_data').append("宽的值必须为整数<br>");
	        }
	    }
	    
	}
	//3.高
	if($("[name=Pid_586_4]").length>0)
	{
	    var value586 = $("[name=Pid_586_4]").val();
	    if (value586) {
	        if (!isNumber(value586)) {
	            $('#win_data').append("高的值必须为整数<br>");
	        }
	    }
	    
	}
	//4.轴距
	if($("[name=Pid_592_4]").length>0)
	{
	    var value592 = $("[name=Pid_592_4]").val();
	    if (value592) {
	        if (!isNumber(value592)) {
	            $('#win_data').append("轴距的值必须为整数<br>");
	        }
	    }
	    
	}
	//5.整备质量
	if($("[name=Pid_669_4]").length>0)
	{
	    var value669 = $("[name=Pid_669_4]").val();
	    if (value669) {
	        if (!isNumber(value669)) {
	            $('#win_data').append("整备质量的值必须为整数<br>");
	        }
	    }
	    
	}
	//6.行李厢容积
	if($("[name=Pid_465_4]").length>0)
	{
	    var value465 = $("[name=Pid_465_4]").val();
	    if (value465) {
	        if (!isNumber(value465)) {
	            $('#win_data').append("行李厢容积的值必须为整数<br>");
	        }
	    }
	    
	}
	//7.行李厢拓展容积[L]
	if($("[name=Pid_466_4]").length>0)
	{
	    var value466 = $("[name=Pid_466_4]").val();
	    if (value466) {
	        if (!isNumber(value466)) {
	            $('#win_data').append("行李厢拓展容积的值必须为整数<br>");
	        }
	    }
	    
	}
	//8.行李厢最大拓展容积[L]
	if($("[name=Pid_1000_4]").length>0)
	{
	    var value1000 = $("[name=Pid_1000_4]").val();
	    if (value1000) {
	        if (!isNumber(value1000)) {
	            $('#win_data').append("行李厢最大拓展容积的值必须为整数<br>");
	        }
	    }
	    
	}
	//9.油箱容积
	if($("[name=Pid_576_4]").length>0)
	{
	    var value576 = $("[name=Pid_576_4]").val();
	    if (value576) {
	        if (!isNumber(value576)) {
	            $('#win_data').append("油箱容积的值必须为整数<br>");
	        }
	    }
	    
	}
	//10.载重质量
	if($("[name=Pid_974_4]").length>0)
	{
	    var value974 = $("[name=Pid_974_4]").val();
	    if (value974) {
	        if (!isNumber(value974)) {
	            $('#win_data').append("载重质量的值必须为整数<br>");
	        }
	    }
	    
	}
	//11.满载质量
	if($("[name=Pid_668_4]").length>0)
	{
	    var value668 = $("[name=Pid_668_4]").val();
	    if (value668) {
	        if (!isNumber(value668)) {
	            $('#win_data').append("满载质量的值必须为整数<br>");
	        }
	    }
	    
	}
	//12.货箱长
	if($("[name=Pid_966_4]").length>0)
	{
	    var value966 = $("[name=Pid_966_4]").val();
	    if (value966) {
	        if (!isNumber(value966)) {
	            $('#win_data').append("货箱长的值必须为整数<br>");
	        }
	    }
	    
	}
	//13.货箱宽
	if($("[name=Pid_969_4]").length>0)
	{
	    var value969 = $("[name=Pid_969_4]").val();
	    if (value969) {
	        if (!isNumber(value969)) {
	            $('#win_data').append("货箱宽的值必须为整数<br>");
	        }
	    }
	    
	}
	//14.货箱高
	if($("[name=Pid_970_4]").length>0)
	{
	    var value970 = $("[name=Pid_970_4]").val();
	    if (value970) {
	        if (!isNumber(value970)) {
	            $('#win_data').append("货箱高的值必须为整数<br>");
	        }
	    }
	    
	}
	//15.最小转弯直径
	if($("[name=Pid_1039_4]").length>0)
	{	    
		var value1039 = $("[name=Pid_1039_4]").val();
	    if (value1039) {
	        var patt = /^[0-9]+\.[0-9]$/;
	        var result = patt.test(value1039);
	        if (!result) {
	            $('#win_data').append("最小转弯直径只能填小数点一位<br>");
	        }
	    }		
	}
	//16.最小离地间隙
	if($("[name=Pid_589_4]").length>0)
	{
	    var value589 = $("[name=Pid_589_4]").val();
	    if (value589) {
	        if (!isNumber(value589)) {
	            $('#win_data').append("最小离地间隙的值必须为整数<br>");
	        }
	    }
	    
	}
	//17.排气量ml
	if ($("[name=Pid_423_4]").length > 0) {
	    var value423 = $("[name=Pid_423_4]").val();
	    if (value423) {
	        if (!isNumber(value423)) {
	            $('#win_data').append("排气量必须为整数<br>");
	        }
	    }
	    
	}
	
	//18.最大功率
	if ($("[name=Pid_430_4]").length > 0) {
	    var value430 = $("[name=Pid_430_4]").val();
	    if (value430) {
	        if (!isNumber(value430)) {
	            $('#win_data').append("最大功率必须为整数<br>");
	        }
	    }
	    
	}
	
	//19.最大功率转速1
	if ($("#rpm1").length > 0) {
	    var rpm1Value = $("#rpm1").val();
	    if (rpm1Value) {
	        if (!isNumber(rpm1Value)) {
	            $('#win_data').append("最大功率转速必须为整数<br>");
	        }
	    }
	    
	}
	
	//20.最大功率转速2
	if ($("#rpm2").length > 0) {
	    var rpm2Value = $("#rpm2").val();
	    if (rpm2Value) {
	        if (!isNumber(rpm2Value)) {
	            $('#win_data').append("最大功率转速必须为整数<br>");
	        }
	    }
	    
	}
	
	
	
	//21.最大扭矩
	if ($("[name=Pid_429_4]").length > 0) {
	    var value429 = $("[name=Pid_429_4]").val();
	    if (value429) {
	        if (!isNumber(value429)) {
	            $('#win_data').append("最大扭矩必须为整数<br>");
	        }
	    }
	    
	}
	
	
	//22.最大扭矩转速1
	if ($("#niuJu1").length > 0) {
	    var niuJu1Value = $("#niuJu1").val();
	    if (niuJu1Value) {
	        if (!isNumber(niuJu1Value)) {
	            $('#win_data').append("最大扭矩转速必须为整数<br>");
	        }
	    }
	    
	}
	
	//23.最大扭矩转速2
	if ($("#niuJu2").length > 0) {
	    var niuJu2Value = $("#niuJu2").val();
	    if (niuJu2Value) {
	        if (!isNumber(niuJu2Value)) {
	            $('#win_data').append("最大扭矩转速必须为整数<br>");
	        }
	    }
	    
	}
	
	
    //24.压缩比
	if ($("[name=Pid_414_4]").length > 0) {
	    var value414 = $("[name=Pid_414_4]").val();
	    if (value414) {
	        var patt = /^[0-9]+\.[0-9]$/;
	        var result = patt.test(value414);
	        if (!result) {
	            $('#win_data').append("压缩比精确到小数点后一位<br>");
	        }
	    }
	    
	}
	//25.最高车速
	if ($("[name=Pid_663_4]").length > 0) {
	    var value663 = $("[name=Pid_663_4]").val();
	    if (value663) {
	        if (!isNumber(value663)) {
	            $('#win_data').append("最高车速必须为整数<br>");
	        }
	    }
	    
	}
	//26.0-100公里加速时间
	if ($("[name=Pid_650_4]").length > 0) {
	    var value650 = $("[name=Pid_650_4]").val();
	    if (value650) {
	        var patt = /^[0-9]+\.[0-9]$/;
	        var result = patt.test(value650);
	        if (!result) {
	            $('#win_data').append("0-100公里加速时间精确到小数点后一位<br>");
	        }
	    }
	    
	}
	
	
	//27.混合工况油耗
	if ($("[name=Pid_782_4]").length > 0) {
	    var value782 = $("[name=Pid_782_4]").val();
	    if (value782) {
	        var patt = /^[0-9]+\.[0-9]$/;
	        var result = patt.test(value782);
	        if (!result) {
	            $('#win_data').append("混合工况油耗精确到小数点后一位<br>");
	        }
	    }
	    
	}
	
	
    //28.电动机总功率
	if($("[name=Pid_870_4]").length>0)
	{
	    var value870 = $("[name=Pid_870_4]").val();
	    if (value870) {
	        if (!isNumber(value870)) {
	            $('#win_data').append("电动机总功率值必须为整数<br>");
	        }
	    }
	}
	//29.电动机总扭矩
	if($("[name=Pid_872_4]").length>0)
	{
	    var value872 = $("[name=Pid_872_4]").val();
	    if (value872) {
	        if (!isNumber(value872)) {
	            $('#win_data').append("电动机总扭矩值必须为整数<br>");
	        }
	    }
	}
	//30.前电动机最大功率
	if($("[name=Pid_1002_4]").length>0)
	{
	    var value1002 = $("[name=Pid_1002_4]").val();
	    if (value1002) {
	        if (!isNumber(value1002)) {
	            $('#win_data').append("前电动机最大功率必须为整数<br>");
	        }
	    }
	}
	//31.前电动机最大扭矩
	if($("[name=Pid_1004_4]").length>0)
	{
	    var value1004 = $("[name=Pid_1004_4]").val();
	    if (value1004) {
	        if (!isNumber(value1004)) {
	            $('#win_data').append("前电动机最大扭矩必须为整数<br>");
	        }
	    }
	}
	//32.后电动机最大功率
	if($("[name=Pid_1003_4]").length>0)
	{
	    var value1003 = $("[name=Pid_1003_4]").val();
	    if (value1003) {
	        if (!isNumber(value1003)) {
	            $('#win_data').append("后电动机最大功率必须为整数<br>");
	        }
	    }
	}
	//33.后电动机最大扭矩
	if($("[name=Pid_1005_4]").length>0)
	{
	    var value1005 = $("[name=Pid_1005_4]").val();
	    if (value1005) {
	        if (!isNumber(value1005)) {
	            $('#win_data').append("后电动机最大扭矩必须为整数<br>");
	        }
	    }
	}
	//34.电池容量
	if($("[name=Pid_876_4]").length>0)
	{
		var value876 = $("[name=Pid_876_4]").val();
		if (value876) {
		    if (!isNumber(value876)) {
		        $('#win_data').append("电池容量精确到整数<br>");
		    }	        
	    }
	}
	//35.电池充电时间快充（4.0-6.0）
	if($("[name=Pid_878_4]").length>0)
	{
	    var value878 = $("[name=Pid_878_4]").val();	    
	    if (value878) {
	        var value878Array = value878.split('-');
		    var patt = /^[0-9]+\.[0-9]$/;
		    var result = patt.test(value878Array[0]);
	        if (!result) {
	            $('#win_data').append("电池充电时间快充精确到小数点后一位<br>");
	        } else {
	            if (value878Array[1]) {
	                var resultSecond = patt.test(value878Array[1]);
	                if (!resultSecond) {
	                    $('#win_data').append("电池充电时间快充精确到小数点后一位<br>");
	                }
	            }
	        }
	    }
	}
	//36.电池充电时间慢充
	if($("[name=Pid_879_4]").length>0)
	{
	    var value879 = $("[name=Pid_879_4]").val();	    
	    if (value879) {
	        var value879Array = value879.split('-');
		    var patt = /^[0-9]+\.[0-9]$/;
		    var result = patt.test(value879Array[0]);
	        if (!result) {
	            $('#win_data').append("电池充电时间慢充精确到小数点后一位<br>");
	        } else {
	            if (value879Array[1]) {
	                var resultSecond = patt.test(value879Array[1]);
	                if (!resultSecond) {
	                    $('#win_data').append("电池充电时间慢充精确到小数点后一位<br>");
	                }
	            }
	        }
	    }
	}
	//37.耗电量
	if($("[name=Pid_868_4]").length>0)
	{
	    var value868 = $("[name=Pid_868_4]").val();	    
		if (value868) {
	        var patt = /^[0-9]+(\.[1-9])?$/;
	        var result = patt.test(value868);
	        if (!result) {
	            $('#win_data').append("耗电量精确到整数或小数点后一位<br>");
	        }
	    }
	}
	//38.最大续航里程
	if($("[name=Pid_883_4]").length>0)
	{
	    var value883 = $("[name=Pid_883_4]").val();
	    if (value883) {
	        if (!isNumber(value883)) {
	            $('#win_data').append("最大续航里程必须为整数<br>");
	        }
	    }
	    
	}
	
	//39.系统综合功率
	if($("[name=Pid_1008_4]").length>0)
	{
	    var value1008 = $("[name=Pid_1008_4]").val();
	    if (value1008) {
	        if (!isNumber(value1008)) {
	            $('#win_data').append("系统综合功率必须为整数<br>");
	        }
	    }
	    
	}
	//40.系统综合扭矩
	if($("[name=Pid_1009_4]").length>0)
	{
	    var value1009 = $("[name=Pid_1009_4]").val();
	    if (value1009) {
	        if (!isNumber(value1009)) {
	            $('#win_data').append("系统综合扭矩必须为整数<br>");
	        }
	    }
	    
	}
	//41.前桥允许载荷
	if($("[name=Pid_1015_4]").length>0)
	{
	    var value1015 = $("[name=Pid_1015_4]").val();
	    if (value1015) {
	        if (!isNumber(value1015)) {
	            $('#win_data').append("前桥允许载荷必须为整数<br>");
	        }
	    }
	    
	}
	//42.后桥允许载荷
	if($("[name=Pid_1016_4]").length>0)
	{
	    var value1016 = $("[name=Pid_1016_4]").val();
	    if (value1016) {
	        if (!isNumber(value1016)) {
	            $('#win_data').append("后桥允许载荷必须为整数<br>");
	        }
	    }
	    
	}
	//43.接近角
	if($("[name=Pid_591_4]").length>0)
	{
	    var value591 = $("[name=Pid_591_4]").val();	    
		if (value591) {
		    if (!isNumber(value591)) {
		        $('#win_data').append("接近角精确到整数<br>");
		    }
	    }
	}
	//44.离去角
	if($("[name=Pid_581_4]").length>0)
	{
	    var value581 = $("[name=Pid_581_4]").val();	    
		if (value581) {
		    if (!isNumber(value581)) {
		        $('#win_data').append("离去角精确到整数<br>");
		    }
	    }
	}
	//45.通过角
	if($("[name=Pid_890_4]").length>0)
	{
	    var value890 = $("[name=Pid_890_4]").val();	    
	    if (value890) {
	        if (!isNumber(value890)) {
	            $('#win_data').append("通过角精确到整数<br>");
	        }
	    }
	}
    //46.最大涉水深度
	if($("[name=Pid_662_4]").length>0)
	{
	    var value662 = $("[name=Pid_662_4]").val();
	    if (value662) {
	        if (!isNumber(value662)) {
	            $('#win_data').append("最大涉水深度必须为整数<br>");
	        }
	    }
	    
	}
	//47.新能源国家补贴
	if($("[name=Pid_997_4]").length>0)
	{
	    var value997 = $("[name=Pid_997_4]").val();	    
	    if (value997) {
	        if (value997 != 0) {
	            var patt = /^[0-9]+\.[0-9][0-9]?$/;
	            var result = patt.test(value997);
	            if (!result) {
	                $('#win_data').append("新能源汽车国家补贴精确到小数点后一位或两位，也可填0<br>");
	            }
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

function isNumber(s) {
    //var regu = "^[0-9]*$";
    //var re = new RegExp(regu);
    var re = /^[0-9]*$/;
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}

function btnSave() {
    $("#ReleaseModule").val("0");
}
function btnSubmit() {
    $("#ReleaseModule").val("1");
}